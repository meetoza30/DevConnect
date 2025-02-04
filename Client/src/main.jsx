import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import { RouterProvider, createHashRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import Hero from './components/Hero';
import Signup from './components/Signup';
import SkillsPage from './components/SkillsPage';
import DeveloperProfile from './components/ProfilePage';

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
        path: '/profile',
        element: <DeveloperProfile />
      },
      {
        path: '/profile/update/skills',
        element: <SkillsPage />
      }
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
