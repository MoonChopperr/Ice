import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import GameDetails from '../components/GameDetails/GameDetails';
import Layout from './Layout';
import CreateGame from '../components/CreateGame/CreateGame';
import UpdatedGame from '../components/UpdateGame/UpdateGame';
import DeleteGame from '../components/DeleteGame/DeleteGame';
import LandingPage from '../components/LandingPage/LandingPage';
import CartPage from '../components/CartPage/CartPage';
import CartUpdate from '../components/CartUpdate/CartUpdate';
import WishlistPage from '../components/WishlistPage/Wishlist';
import News from '../components/News/News';
import Support from '../components/Support/Support';
import Library from '../components/Library/Library';
export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <LandingPage/>,
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
      {
        path:"/game/:gameId/delete",
        element: <DeleteGame/>,
      },
      {
        path:"/game/cart",
        element: <CartPage/>,
      },
      {
        path:'/cart/update/:gameId',
        element: <CartUpdate/>,
      },
      {
        path:'/wishlist/',
        element: <WishlistPage/>
      },
      {
        path:'/news',
        element: <News/>
      },
      {
        path:'/support',
        element: <Support/>
      },
      {
        path:'/library',
        element: <Library/>
      }
    ],
  },
]);
