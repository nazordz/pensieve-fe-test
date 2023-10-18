import { useRoutes } from "react-router-dom";
import LoginRouters from "./LoginRouters";
import MainRouters from "./MainRouters";

export default function ThemeRoutes() {
  return useRoutes([LoginRouters, MainRouters]);
}