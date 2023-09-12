import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createBrowserRouter, RouterProvider }  from 'react-router-dom';
import Signup from './pages/Signup';
import Page404 from './pages/Page404';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Signup />,
        errorElement: <Page404 />
    },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);
