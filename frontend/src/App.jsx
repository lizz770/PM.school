import { Fragment, useState } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  Outlet,
  Navigate,
} from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register/Register";

import Layout from "./components/layout/Layout";

import PageLayout from "./components/pageLayout/PageLayout";

import Navbar from "./components/navbar/Navbar";

import MobileNavbar from "./components/mobileNavbar";

import "./style/App.scss";

import { useTheme } from "./context/ThemeProvider";
import StudentHome from "./pages/Student/Home";
import TutorHome from "./pages/Tutor/Home";
import StudentInformation from "./pages/student/Information";
import TutorInformation from "./pages/Tutor/Information";
import Settings from "./pages/settings";

import TutorPrescriptions from "./pages/Tutor/Prescriptions";
import StudentPrescriptions from "./pages/student/Prescriptions";

import StudentMeasurement from "./pages/student/Measurements";
import TutorMeasurement from "./pages/Tutor/Measurements";
import NotFound from "./pages/404";
import Requests from "./pages/requests/Requests";
import GlobalSpinner from "./components/globalSpinner";
import TrustedUsers from "./pages/TrustedUsers/TrustedUsers";
import Interceptor from "./components/interceptor";
import ForgotPassword from "./pages/ForgotPassword";
import { useWhoami } from "./queries/authQueries";

function App() {
  const { mode } = useTheme();
  const { data, isLoading, isError, error } = useWhoami();

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
      path: "forgotPassword",
      element: (
        <Fragment>
          {!isLoading && data?.user?.id ? (
            <Navigate to='/' />
          ) : isLoading ? (
            <GlobalSpinner />
          ) : (
            <ForgotPassword />
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
              navbar={<Navbar role={data?.user?.userRole} />}
              mobileNavbar={<MobileNavbar role={data?.user?.userRole} />}
            >
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
            data?.user?.userRole === "STUDENT" ? (
              <StudentHome />
            ) : (
              <TutorHome />
            ),
        },
        {
          path: "information",
          element:
            data?.user?.userRole === "STUDENT" ? (
              <StudentInformation />
            ) : (
              <TutorInformation />
            ),
        },
        {
          path: "information/:measurement",
          element:
            data?.user?.userRole === "STUDENT" ? (
              <StudentMeasurement />
            ) : (
              <TutorMeasurement />
            ),
        },
        
        {
          path: data?.user?.userRole === "STUDENT" ? "tutors" : "students",
          element: <TrustedUsers />,
        },
        {
          path: "requests",
          element: <Requests />,
        },
        {
          path: "settings",
          element: <Settings />,
        },
        {
          path: "prescriptions",
          element:
            data?.user?.userRole === "STUDENT" ? (
              <StudentPrescriptions />
            ) : (
              <TutorPrescriptions />
            ),
        },
      ],
    },
  ]);

  return (
    <div className={`App ${mode && "darkMode"} `}>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
