import { BASE_URL } from "./contants/routerInfo";
import Router from "./router";
import { navigate } from "./utils/navigate";
import { $ } from "./utils/querySelector";

function App($container) {
  this.$container = $container;

  const init = () => {
    $(".todo__footer").addEventListener("click", (e) => {
      const target = e.target.closest("button");

      const targetURL = target.dataset.url.replace(BASE_URL, "");

      navigate(targetURL);
    });

    new Router($container);
  };

  init();
}

export default App;
