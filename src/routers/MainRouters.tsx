import { RouteObject } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import MainLayout from "@/layouts/MainLayout";
import Loadable from "@/components/Loadable";
import { lazy } from "react";

const GpsPage = Loadable(lazy(() => import("@/pages/GpsPage")))

const MainRouters: RouteObject = {
  path: '/',
  element: (
    <ProtectedRoute>
      <MainLayout />
    </ProtectedRoute>
  ),
  children: [
    {
      path: '/',
      element: <GpsPage />
    },
    
  ]
}

export default MainRouters;