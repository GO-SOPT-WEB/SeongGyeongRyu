import Todo from "../pages/todo";
import MyCalendar from "../pages/calendar";
import MyCategory from "../pages/myCategory";

export const BASE_URL = "http://localhost:5174";

export const ROUTE_LIST = [
  { path: "/", element: Todo },
  { path: "/calendar", element: MyCalendar },
  { path: "/my", element: MyCategory },
];
