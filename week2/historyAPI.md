SPA : 하나의 html 안에서 컴포넌트를 갈아끼우는 방식 - 원칙적으로 url이 바뀌지 않는다

이러한 단점을 보완하기 위해서 원래 사용하던 방법은 해쉬뱅
www.zerocho.com/#!/category/javascript
와 같이 #!(해쉬뱅) 뒤에 하위주소를 붙이는 방법

#### 단점

- 서버가 # 뒷부분을 주소라고 인식하지 못함
- #!에 특별한 의미가 없음

해쉬뱅을 대신해서 "브라우저에서 제공하는 주소 API를 이용해 주소를 바꾸는" History API를 사용하게 되었다.

---

SPA에서 라우터가 작동하는 방식은, 주소 내역이 하나의 목록으로 되어있어 해당 목록 안에서 앞으로가기, 뒤로가기를 하는 것이다. 즉, 목록에 새로운 주소가 추가되면 페이지를 이동한 셈이 된다.

이를 위한 메소드가

- history.pushState(state, unused, url); : 뒤로 가기를 활성화하면서 주소를 바꿈

  - 첫번째 인자 state : 바뀐 주소와 함께 저장할 데이터 객체
  - 두번째 인자 unused : 브라우저의 제목
  - 세번쨰 인자 url : 바뀔 주소 - /blahblah로 넣어주면 절대 경로, blahblah로 넣어주면 상대경로로 localhost:63342/home/blahblah 와 같이 연결된다

- history.replaceState(); : 뒤로 가기를 활성화하지 않으면서 주소를 바꿈 (이전 주소를 없애고 바꿀 주소를 넣음)

---

#### 라우팅 과정

1. index.js에서 new App으로 #app DOM을 인자로 app 객체를 하나 만든다.

2. app 객체에서는 버튼이 클릭되었을 때 해당 버튼에 data-url로 전달되어있는 url에서 앞의 base_url 부분을 잘라내고 하위 주소 부분만 navigate 함수의 인자로 전달한다.
   -navigate 함수는 navigate 함수가 호출되었을 때 History가 변경될 것임을 알리고 원하는 동작을 실행하도록 하기 위해 historychange라는 커스텀 이벤트를 만들고 등록한다.
   등록할 때 들어온 인자인 targetURL을 to(이동할 url)로, isReplace를 false로 이벤트 안에 데이터를 넣어준다.
3. #app DOM을 인자로 라우터 객체를 생성한다. (App.js)
   - 라우터 객체는 호출되면 전역 객체에 historychange 이벤트를 추가하고,detail을 통해 초기화한 데이터가 들어온 to, isReplace에 따라 url을 바꿔준다.(init) init 함수 호출이 완료되면, url에 맞게 컴포넌트를 #app 하단에 렌더링해주는 route 함수를 실행해서 우리가 원하는 화면을 볼 수 있다.
