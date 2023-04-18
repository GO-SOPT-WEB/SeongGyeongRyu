import App from "./App";

//DOMContentLoaded : 브라우저가 HTML을 전부 읽고 DOM 트리를 완성하는 즉시 발생한다.
window.addEventListener("DOMContentLoaded", () => {
  new App(document.querySelector("#app"));
});
