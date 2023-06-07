import { Fragment, useState } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  Outlet,
  Navigate,
} from "react-router-dom";
import { useTheme } from "./context/ThemeProvider";

import "./style/App.scss";
import GlobalSpinner from "./components/GlobalSpinner/GlobalSpinner";
import Layout from "./components/Layout";
import Interceptor from "./components/Interceptor/Interceptor";
import Login from "./pages/Login";
import Register from "./pages/Register/Register";
import NotFound from "./pages/404/NotFound";

import { useWhoami } from "./queries/authQueries";
import Navbar from "./components/Navbar/Navbar";
import MobileNavbar from "./components/MobileNavbar/MobileNavbar";
import PageLayout from "./components/PageLayout/PageLayout";
import StudentHome from "./pages/Student/Home";
import StudentInformation from "./pages/Student/Information/Information";
import Measurement from "./pages/Student/Measurements/Measurement";
function App() {
  const { data, isLoading } = useWhoami();
  const { mode } = useTheme();

  const router = createBrowserRouter([
    {
      path: "login",
      element: (
        <Fragment>
          {!isLoading && data?.user?.id ? (
            <Navigate to='/' />
          ) : isLoading ? (
            <GlobalSpinner />
          ) : (
            <Login />
          )}
        </Fragment>
      ),
    },
    {
      path: "register",
      element: (
        <Fragment>
          {!isLoading && data?.user?.id ? (
            <Navigate to='/' />
          ) : isLoading ? (
            <GlobalSpinner />
          ) : (
            <Register />
          )}
        </Fragment>
      ),
    },
    {
      path: "/",
      element: (
        <Fragment>
          {isLoading ? (
            <GlobalSpinner />
          ) : data && !data?.authed ? (
            <Navigate to='/login' />
          ) : (
            <Layout 
            navbar={<Navbar role={data?.user?.userRole}/>} 
            mobileNavbar={<MobileNavbar role={data?.user?.userRole}/>} >
              <Interceptor />
              <PageLayout user={data?.user}>
              <Outlet />
              </PageLayout>
            </Layout>
          )}
        </Fragment>
      ),
      children: [
        {
          path: "*",
          element: <NotFound />,
        },
        {
          path: "/",
          element: 
             data?.user?.userRole==="STUDENT" ?(
              <StudentHome/>
             ) : (
             <div>Tutor Home</div>
             ),
        },
        {
          path: "/information",
          element: 
             data?.user?.userRole==="STUDENT" ?(
              <StudentInformation/>
             ) : (
             <div>Tutor Home</div>
             ),
        },
        {
          path:"information/:measurement",
          element:data?.user?.userRole === "STUDENT" && <Measurement/>
        }
      ],
    },
  ]);

  return (
    <div className={`App ${mode && "darkMode"}`}>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
