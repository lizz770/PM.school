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
import "./styles/App.scss";
import { useTheme } from "./context/ThemeProvider";
import StudentHome from "./pages/student/Home";
import TutorHome from "./pages/tutor/Home";
import StudentInformation from "./pages/student/Information";
import TutorInformation from "./pages/tutor/Information";
import Settings from "./pages/student/Settings/";

import TutorPrescriptions from "./pages/tutor/Prescriptions";

import Measurement from "./pages/student/Measurements";
import NotFound from "./pages/404";
import Requests from "./pages/requests/Requests";
import GlobalSpinner from "./components/globalSpinner";
import TrustedUsers from "./pages/trustedUsers/TrustedUsers";
import { useWhoami } from "./queries/authQueries";

function App() {
  const { mode } = useTheme();
  const { data, isLoading, isError, error } = useWhoami();
  const [isOpened, setIsOpened] = useState(false);

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
          ) : data && data?.authed === "false" ? (
            <Navigate to='/login' />
          ) : (
            <Layout
              navbar={<Navbar role={data?.user?.userRole} />}
              mobileNavbar={<MobileNavbar role={data?.user?.userRole} />}
            >
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
          element: data?.user?.userRole === "STUDENT" && <Measurement />,
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
              <div>Студент FeedBack</div>
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
