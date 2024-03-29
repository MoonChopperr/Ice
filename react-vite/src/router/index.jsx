import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import GameDetails from '../components/GameDetails/GameDetails';
import Layout from './Layout';
import CreateGame from '../components/CreateGame/CreateGame';
import UpdatedGame from '../components/UpdateGame/UpdateGame';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <h1>Welcome!</h1>,
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path:"/game/:gameId",
        element: <GameDetails />,
      },
      {
        path:"/game/create",
        element: <CreateGame/>,
      },
      {
        path:"/game/:gameId/update",
        element: <UpdatedGame/>,
      },
    ],
  },
]);
