import { ROUTE_LIST } from "./contants/routerInfo";
import Error404 from "./pages/error404";

function Router($container) {
  this.$container = $container;
  let currentPage = undefined;

  const findMatchedRoute = () =>
    ROUTE_LIST.find((route) => route.path === location.pathname);

  const route = () => {
    currentPage = null;
    const TargetPage = findMatchedRoute()?.element || Error404;
    currentPage = new TargetPage(this.$container);
  };

  const init = () => {
    window.addEventListener("historychange", ({ detail }) => {
      console.log(detail);

      const { to, isReplace } = detail;

      if (isReplace || to === location.pathname)
        history.replaceState(null, "", to);
      else history.pushState(null, "", to);

      route();
    });

    window.addEventListener("popstate", () => {
      route();
    });
  };

  init();
  route();
}
export default Router;
