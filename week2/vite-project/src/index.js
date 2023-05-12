import App from "./App";

//DOMContentLoaded : 브라우저가 HTML을 전부 읽고 DOM 트리를 완성하는 즉시 발생한다.
//컴포넌트가 갈아 끼워질 때마다 DOM 트리가 새로 만들어지기 때문에
//url이 바뀌면 index.js부터 다시 추적을 시작하는 것!

window.addEventListener("DOMContentLoaded", () => {
  new App(document.querySelector("#app"));
});
