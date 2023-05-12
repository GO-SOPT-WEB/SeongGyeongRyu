export const navigate = (to, isReplace = false) => {
  //CustomEvent : 새로운 이벤트를 생성하는 생성자
  //첫번째 객체 - historychange라는 새로운 이벤트를 만들어준다.
  //두번째 객체 - 이벤트 객체에 포함할 세부 정보를 나타내는 값을 설정한다. 기본값은 null로 설정됨

  //CustomEvent 인터페이스의 detail 읽기 전용 속성은 이벤트를 초기화할 때 제공한 데이터를 반환합니다.
  //왜 navigate에서 바로 처리를 안하고 customEvent를 만들어준걸까? ->navigate 함수가 호출되었을 때 History가 변경될 것임을 이벤트를 통해 알려주기 위해

  const historyChangeEvent = new CustomEvent("historychange", {
    detail: {
      to,
      isReplace,
    },
  });

  //커스텀 이벤트 객체를 생성했다고 해당 이벤트를 바로 사용할 수 없기 때문에, dispatchEvent로 이벤트를 전달해준다.
  dispatchEvent(historyChangeEvent);
};

//naviagte를 실행하면 historychange라는 커스텀 이벤트가 발생할 것이며
//historychange 이벤트가 발생했을 때 우리가 원하는 동작을 하도록 이벤트 핸들러를 등록해주면 된다
//여기서 우리가 원하는 동작 - 사용자가 이동하고자 하는 URL에서 나타나야 할 페이지를 #app 하위에 렌더링
