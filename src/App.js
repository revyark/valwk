import './App.css';
import Hero from './components/Hero';
import SecondPg from './components/second_pg';
import ThirdPg from './components/thirdpg';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {React} from 'react';
const router=createBrowserRouter([
  {
    path:"/",
    element: <Hero/>
  },
  {
    path:"/second",
    element: <SecondPg/>
  },
  {
    path:"/third",
    element: <ThirdPg/>
  }
]
)
function App() {
    return <RouterProvider router={router} />;
}

export default App;
