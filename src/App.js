import { useEffect, useState } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Main } from "./pages/Main/Main";

import "./App.sass";
import { Country } from "./pages/Country/Country";

const url = "https://restcountries.com/v3.1/all";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      Component() {
        return <Main />;
      },
    },
    {
      path: "/country/:name",
      Component() {
        return <Country />;
      },
    },
  ]);

  return (
    <div className="app">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
