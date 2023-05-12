import { ROUTE_LIST } from "./contants/routerInfo";
import Error404 from "./pages/error404";

function Router($container) {
  this.$container = $container;
  let currentPage = undefined;

  const findMatchedRoute = () =>
    ROUTE_LIST.find((route) => route.path === location.pathname);

  //url에 맞게 컴포넌트를 #app 하위에 렌더링하는 역할
  const route = () => {
    currentPage = null;
    const TargetPage = findMatchedRoute()?.element || Error404;
    currentPage = new TargetPage(this.$container);
  };

  //url을 바꿔주는 역할
  const init = () => {
    //historychange 이벤트가 발생했다는 건 페이지의 이동을 요청했다는 것이다. (navigate 함수 호출)
    window.addEventListener("historychange", ({ detail }) => {
      //to: 이동하게 될 URL (detail.to = '/calendar' )
      //isReplace : push인지 그냥 replace인지
      const { to, isReplace } = detail;

      //만약 replace이거나 이동하려는 url이 현재 url과 같으면 뒤로가기 활성화하지 않고 replace만!
      if (isReplace || to === location.pathname)
        history.replaceState(null, "", to);
      else history.pushState(null, "", to);

      route();
    });

    //popstate : pushState와 replaceState로 주소를 바꾼 후, 뒤로가기나 앞으로가기를 했을 때 발생
    //history.pushState() 또는 history.replaceState()는 popstate 이벤트를 발생시키지 않음
    //뒤로가기나 앞으로가기를 했을 때만 발생함
    window.addEventListener("popstate", () => {
      route();
    });
  };

  init();
  route();
}
export default Router;
