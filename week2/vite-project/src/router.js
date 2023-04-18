import MainPage from "./pages/main";
import MyCategory from "./pages/myCategory";
import Calendar from "./pages/calendar";

export const ROUTE_LIST = [
  { path: "/", element: MainPage },
  { path: "/calendar", element: Calendar },
  { path: "/my", element: MyCategory },
];
