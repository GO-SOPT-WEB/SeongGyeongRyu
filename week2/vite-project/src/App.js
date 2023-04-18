import { ROUTE_LIST } from "./router";

const BASE_URL = "http://localhost:5174";

function App($container) {
  this.$container = $container; //#app에 해당하는 DOM -> <main id="app"></main>
  let currentPage = undefined;

  const init = () => {
    //location :  URL 정보를 가져오는 객체
    const findMatchedRoute = () =>
      ROUTE_LIST.find((route) => route.path === location.pathname);
    console.log(location);

    const route = () => {
      currentPage = null;
      const TargetPage = findMatchedRoute()?.element || Error;
      currentPage = new TargetPage(this.$container);
    };

    route();
  };
  init();
}
export default App;
