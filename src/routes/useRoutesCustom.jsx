import React from 'react'
import { useRoutes } from 'react-router-dom'
import HomePage from '../pages/HomePage/HomePage';
import DetailPage from '../pages/DetailPage/DetailPage';
import SignIn from '../pages/SignIn/SignIn';
import UserTemPlate from '../template/UserTemplate/UserTemPlate';
import AdminTemlate from '../template/AdminTemplate/AdminTemlate';
import MovieManager from '../pages/MovieManager/MovieManager';
import AddMovie from '../pages/AddMovie/AddMovie';
import SignUp from '../pages/SignUp/SignUp';
import EditMovie from '../pages/EditMovie/EditMovie';
import RequireAuth from '../utils/guard/index';
import { ROLE } from "../utils/constants";
import TicketBookingPage from "../pages/TicketBookingPage";
import ShowTime from '../pages/ShowTime/ShowTime';
import UserManager from '../pages/UserManager/UserManager';

const useRoutesCustom = () => {
  const routes = useRoutes([
    {
      path: "/",
      element: <UserTemPlate />,
      children: [
        {
          path: "/",
          element: <HomePage />
        },
        {
          path: "/sign-in",
          element: <SignIn />
        },
        {
          path: "/sign-up",
          element: <SignUp />
        }
      ]
    },
    {
      path: "/admin",
      element: <AdminTemlate />,
      children: [
        {
          path: "quan-li-phim",
          element: <MovieManager />,
        },
        // {
        //   // path: "them-phim",
        //   element: <AddMovie />,
        //   index: "true",
        // },
        {
          path: "them-phim",
          element: <AddMovie />,
        },
        {
          path: "edit-phim/:id",
          element: <EditMovie />,
        },
        {
          path: "show-time/:id",
          element: <ShowTime />
        },
        {
          path: "quan-li-user",
          element: <UserManager />
        }
      ],
    },
    {
      path: "/detail/:id",
      element: <DetailPage />
    },
    {
      path: "ticket-booking/:scheduleId",
      element: (
        // <RequireAuth roles={[ROLE.ADMIN, ROLE.CLIENT]}>
        <TicketBookingPage />
        // </RequireAuth>
      ),
    },

  ]);
  return routes;
}

export default useRoutesCustom