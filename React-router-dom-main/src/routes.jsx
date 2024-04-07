import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from './pages/Home'
import NewItem from './pages/NewItem'
import Card from './pages/postLists'

const Router = () => {

    // jsx way of defining routes

    // plain object way of defining routes
    const router = createBrowserRouter([
        {
            path: '/',
            element: <Home />,
            children: [
                {
                    path: '/',
                    element: <Card />,
                    children: [
                        {
                            path: '/add-new-item',
                            element: <NewItem />

                        },
                    ]
                },

            ],
        }
    ])

    return (
        <RouterProvider router={router} />
    )
}

export default Router
