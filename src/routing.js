import React from "react";
import {
    createBrowserRouter,
} from "react-router-dom";
import App from "./App";
import Popular from "./components/Popular";

import Upcoming from "./components/Upcoming";
import Search from "./components/Search";
import Toprated from "./components/Toprated";
import Movie from "./components/Movie";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Popular />
            },
            {
                path: "/top_rated",
                element: <Toprated />
            },
            {
                path: "upcoming",
                element: <Upcoming />
            },
            {
                path: "search",
                element: <Search />
            },
            {
                path: "/movie",
                element: <Movie />
            }
        ]
    },
]);

export default router;