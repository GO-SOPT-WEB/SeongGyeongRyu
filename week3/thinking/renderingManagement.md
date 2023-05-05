## React에서 렌더링을 효과적으로 관리하는 방법은 무엇이 있을까?

### 리액트에서 렌더링이란?

크게 보면 함수를 호출하는 것인데, 렌더링이란 App 컴포넌트가 실행이 되고 내부 로직이 실행이 되고, return문을 통해 element가 반환이 되는 과정이다.

### useEffect

우리는 보통 useEffect를 사용해서 의존성 배열에 들어간 state의 값이 변화하는 순간에 행해야할 동작을 정의하고는 한다.
하지만 다음과 같은 예시를 한 번 보자.

```js
function Parent() {
	const [valueForFirstChild, setValueForFirstChild] = useState(null);

  const handleClick = () => {}

  useEffect(()=>{
  	setTimeout(()=>{
    	setValueForFirstChild('changedValue');
    },3000)
  })

  return (
  	<>
    	<FirstChild value={valueOfFirstChild}>
    	<SecondChild onClick={handleClick}>
    </>
  )
}
```

여기서 보면 FirstChild는 props로 가지고 있는 valueOfFirstChild의 값에 변화가 생겼기 때문에 리렌더링되는 것이 이상하지 않지만,

SecondChild의 경우에는 변화한 것이 없는데 ParentChild에 의해 불필요한 리렌더링이 발생한다.

만약 SecondChild 컴포넌트 내부에 100개의 컴포넌트가 존재한다면 어떨까? 100번의 불필요한 렌더링이 발생하는 것이다.

리액트에는 이러한 상황을 막고 렌더링을 똑똑하게 관리하도록 도와주는 도구들이 있다.

#### 1. ** useCallback **

$\rightarrow$ 함수를 메모이제이션 해주는 훅. 메모이제이션이란, 기존에 수행한 연산의 결과값을 어딘가에 저장해두고 필요할 때 재사용하는 것을 말한다.

```javascript
function Parent() {
  const [valueForFirstChild, setValueForFirstChild] = useState(null);

  const handleClick = useCallback(() => {});

  ...
}
```

이렇게 handleClick을 useCallback으로 감싸주면, 의존성 배열의 값에 변화가 생기지 않는 한 handleClick의 참조값이 변하지 않아 SecondChild가 리렌더링되지 않을 것이라고 예상할 수 있다.

위와 같이 handleClick을 useCallback으로 감싸주어도 SecondChild가 계속 리렌더링되는 것을 확인할 수 있는데, 부모컴포넌트를 실행하면 어쩔 수 없이 자식 컴포넌트 엘리먼트가 실행이 되는 것이 리액트의 작동 원리이기 때문이다.

#### 그러면 useCallback은 렌더링 최적화에 아무런 효과가 없는 것인가?

아니다.
렌더링의 단계를 한 번 보자.

1. Render Phase

   - 컴포넌트(함수)를 호출하고, React.createElement로 만들어진 내용을 반환한다.
   - 만약 첫번째 렌더링이 아니라면, 이전 Virtual Dom과 현재 Virtual Dom을 비교하여 실제 Dom에 변경이 필요한 부분을 체크하는 재조정(Reconciliation) 과정도 포함한다.

2. Commit Phase
   - Render Phase에서 확인한 실제 DOM에 변경이 필요한 부분을 반영한다. 변경이 필요한 부분이 없다면, Commit Phase는 skip 된다.

useCallback은 Render Phase는 실행이 되지만 함수의 참조값을 같게 해주어 props에 이전과 같게 해주었기에 SecondChild에서 commit phase가 일어나지 않게 해준다.

따라서 최적화에 효과가 있다고 말할 수 있다.

#### 2. React.memo

그런데 만약 Render Phase까지 확실하게 막아주고 싶으 경우라면 어떨까?

그 경우에는 `React.memo`를 사용하면 된다.

```javascript
function SecondChild({ onClick }) {
  return (
    <div onClick={onClick}>
      {Array.from({ length: 1000 }).map((_, idx) => (
        <GrandChild key={idx} order={idx + 1} />
      ))}
    </div>
  );
}

export default React.memo(SecondChild);
```

SecondChild 컴포넌트가 Render Phase에 들어가기 전에 props로 들어온 onClick의 참조값이 이전과 같은 지 비교하고,

useCallback이 적용되어 있어 참조값이 같다면 메모이제이션 해두었던 컴포넌트를 그대로 사용해 SecondChild의 리렌더링 과정이 생략된다.

(즉, React.memo와 useCallback을 함께 사용하여 리렌더링을 막을 수 있다.)

이에 따라 GrandChild 컴포넌트도 리렌더링 되지 않는다.

### 3. useMemo

만약 props가 함수가 아니라 객체의 형식으로 들어온다면 어떨까?

props가 객체라면 useCallback을 적용할 수도 없기 때문에 매번 같은 객체가 들어오더라도 참조값이 계속 변화할 것이다.

해당 상황에서는 useMemo를 사용하면 좋은데, 함수 자체에 대하여 메모이제이션을 진행하는 useCallback과 달리, useMemo는 값에 대한 메모이제이션을 진행한다.

```javascript
function Parent() {
	const [valueForFirstChild, setValueForFirstChild] = useState(null);

  const item = {
  	name : "React",
    isGood : true
  }

  //처음 마운트 될 때 들어온 그 값을 메모이제이션
  const memoization = useMemo(()=> item, []);

  useEffect(()=>{
  	setTimeout(()=>{
    	setValueForFirstChild('changedValue');
    },3000)
  })

  return (
  	<>
    	<FirstChild value={valueOfFirstChild}>
    	<SecondChild onClick={memoization}>
    </>
  )
}
```

이렇게 되면 SecondChild의 props로 계속 참조값이 같은 인자가 들어가기 때문에, React.memo(SecondChild)가 의도한대로 동작해 SecondChild의 리렌더링을 막아줄 수 있다.

---

## 렌더링을 효과적으로 관리하기 위해서는 어떤 식으로 비즈니스 설계를 진행해야 할까

결국 핵심이라고 생각하는 것은 컴포넌트 구조를 잘 설계해야한다는 것이다.

결국 컴포넌트의 리렌더링은 props와 state가 변경되는 것을 관리하는 것의 문제이기에 어떻게 하면 컴포넌트 안에서 불필요한 state를 사용하지 않으며 상태를 현명하게 관리할 것인가, 또 자식으로 데이터를 넘겨줄 때 props drilling으로 인한 리렌더링이 불필요하게 발생하지는 않는지를 고려하며 컴포넌트 구조를 설계해야한다.

<br/>

### + 렌더링 최적화는 결국 비용이다.

- React.Memo, useCallback, useMemo 모두 내부적으로 특정한 동작을 실행시켜주는 함수이기 때문에 사용하는 것이 모두 비용이다.

  예를 들어 항상 props로 다른 값이 들어가는데 useMemo를 쓴다거나, 리렌더링이 자주 되는 컴포넌트라고 해서 내부 함수를 무조건 useCallback으로 감싸주는 경우도 있을 수 있다.

- 이러한 경우에는 최적화를 사용하기 전보다 최적화를 사용하고 난 후가 더 웹사이트 성능이 안 좋아질 수 있다.

- 따라서 렌더링 최적화든, 전역 상태관리 라이브러리의 사용 유무이든 상황에 맞게 다양한 요소를 고려한 후 결정해야한다.
