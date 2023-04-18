import { BASE_URL } from "./contants/routerInfo";
import Router from "./router";
import { navigate } from "./utils/navigate";
import { $ } from "./utils/querySelector";

function App($container) {
  this.$container = $container;

  const init = () => {
    $(".footer").addEventListener("click", (e) => {
      const target = e.target.closest("button");

      //`http://localhost:3000/post/1234`  -> `/post/1234`
      //앞의 BASE_URL 부분을 잘라내고 navigate의 인자로 전달
      const targetURL = target.dataset.url.replace(BASE_URL, "");

      navigate(targetURL);
    });

    new Router($container);
  };

  init();
}

export default App;
