### 리액트 컴포넌트 패턴

1. **Presentation Component**
   - UI를 표시하는 컴포넌트로, 로직을 포함하지 않는다. 다른 컴포넌트에서 전달받은 props를 사용하여 UI를 렌더링하는 역할을 한다.
   - 어떻게 보여지는 지를 책임진다고 볼 수 있다.
2. **Container Component**
   - Presentational Component를 감싸는 컴포넌트로, 로직을 담당한다.
   - Redux와 같은 상태 관리 라이브러리와 연동하여 상태를 변경하고, Presentational Component에게 props를 전달한다.
   - 어떻게 동작해야하는지를 책임진다고 할 수 있다.

→ presentational and container 방식은 리덕스를 사용하는 프로젝트에서 자주 볼 수 있지만, 현재는 잘 사용하지 않는다고 한다.

→ 리액트의 Hooks를 통해 코드의 재사용성을 높일 수 있고, 유지보수성이 높아졌을 뿐 아니라 presentational and container 방식을 유지하면 프로젝트의 규모가 커지는 경우 컴포넌트의 구조를 복잡하게 만들 수 있기 때문이다.

1. **Custom hook**
   - `Presentation-Container Component`
      패턴에서 로직을 hooks로 관리하는 것이다.
   - hooks로 로직을 관리하면 **UI 재사용, 로직 재사용**
     까지 가능해진다.
2. **Atomic**
   - 디자인 요소를 다섯 가지 계층으로 나누어 구성하는 디자인 방식.
     - Atoms: 가장 작은 단위의 디자인 요소. 버튼, 인풋, 라벨 등
     - Molecules: 여러 개의 Atoms가 모여서 만드는 요소로, 검색 폼, 로그인 폼 등
     - Organisms: Molecules의 집합으로, 페이지의 섹션, 카드 등
     - Templates: 페이지의 전체 레이아웃과 디자인을 결정하는 디자인 요소
     - Pages: Templates를 기반으로 실제 컨텐츠가 채워진 페이지입니다.

- 파일들을 조합하여 최종적인 컴포넌트를 만듦으로써 재사용성이 높고, 디자인 요소의 수정이 쉬운 컴포넌트를 만들 수 있다.
- 이렇게 컴포넌트들을 구성할 경우 UI 재사용성이 뛰어나다는 장점을 가지지만, 디자인 시스템을 구축하기 위한 초기 비용이 많이 들고 로직과 상태를 낮은 단위까지 내려줘야 하기 때문에 props drilling issue가 발생할 수 있다.

### 어떤 방식을 언제 택해야 좋은 것일까?

세 가지 방식 중 우리가 가장 일반적으로 택할 수 있는 방법은 **Custom hook** 이라고 생각한다.

Atomic 방식의 경우 앞서 말한 것처럼 props drilling issue 혹은 초기 비용 부담이 있을 수 있기 때문에, 개발자가 많지 않은 집단 혹은 MVP 단의 프로덕트를 개발하는 팀에서는 적합하지 않을 것 같다.

하지만 이미 프로젝트가 만들어져 조금 더 효율적으로 유지보수를 할 방법을 생각할 때는 Atomic 방식을 고려해봐도 좋을 것 같다.

Custom hook의 경우 저번 앱잼 때 사용을 해보니 컴포넌트의 동작을 컨트롤하는 것이 매우 수월했다.

모달을 띄우는 동작을 컨트롤하기 위해 커스텀 훅을 사용했는데, 모든 컴포넌트에서 재사용하기가 매우 좋았고, 유지보수에도 매우 효율적이었다. 따라서 Custom hook을 기본적으로 생각하되, 상황에 따라 Atomic 방식을 고려해보면 좋을 것 같다.

### 프론트엔드에게 디자인 패턴이란 어떤 존재일까?

우리는 프로덕트를 만들기만 할 것이 아니라 유지보수를 해야하고, 점점 발전시켜 나가야한다.

이러한 점에서 디자인 패턴을 초기에 정하고 그것에 맞게 개발을 해나가는 것은 전체적인 개발 비용을 계산하는 문제와도 같다고 생각한다.

따라서 어떠한 디자인패턴을 사용할 것인지는 협업에서 정말 중요한 이슈가 되어야한다고 느낀다.
