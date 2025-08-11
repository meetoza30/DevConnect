import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import { RouterProvider, createHashRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import Hero from './components/Hero';
import Signup from './components/Signup';
import SkillsPage from './components/SkillsPage';
import DeveloperProfile from './components/ProfilePage';
import Feed from './components/Feed';
import Profile from './components/Profile';
import UserReqCard from './components/UserReqCard.jsx';
import Reqs from './components/ShowReqs.jsx';
import Convos from './components/Convos.jsx';
import ShowConnections from './components/ShowConnections.jsx';
import ForgotPassword from './components/ForgotPassword.jsx';
import ResetPassword from './components/ResetPassword.jsx';
import { FilterSidebar } from './components/FilterSidebar.jsx';


const router = createHashRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <Hero />,
      },
      {
        path : '/signin',
        element : <Signup />
      },
      {
        path : '/forgot-password',
        element : <ForgotPassword />
      },
      {
        path : '/reset-password/:id/:token',
        element : <ResetPassword />
      },
      {
        path : '/reqs/review',
        element : <Reqs />
      },
      {
        path : '/convos/:receiverId',
        element : <Convos />
      },
      {
        path : '/convos',
        element : <Convos />
      },
      {
        path : '/feed',
        element : <Feed />
      },
      {
        path: '/profile',
        element: <DeveloperProfile />
      },
      {
        path: '/profile/user/:userId',
        element: <Profile />
      },
      {
        path: '/connections',
        element: <ShowConnections />
      },
      {
        path: '/test',
        element: <FilterSidebar />
      },
      {
        path: '/usercard',
        element: <UserReqCard />
      },
      {
        path: '/profile/update/skills',
        element: <SkillsPage />
      },
    ],
  },
  
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}>
    <App />
    </RouterProvider>
  </StrictMode>
);
