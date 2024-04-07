
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import NewPost from './Pages/NewPost';
import { postAction } from './Pages/NewPost';
import './App.css';
import RootLayout from './Pages/RootLayout';
import {PostList}  from './Pages/PostList';
import { postsLoader } from './Pages/PostList';
import ErrorPage from './Pages/ErrorPage';


// plain way
const router = createBrowserRouter([
     {
       path: "/",
       element: <RootLayout/>,
       children: [
        {
          path: "/",
          element: <PostList />,
          loader: postsLoader,
          errorElement: <ErrorPage />,
          children: [
            {
              path: "/create-post",
              element: <NewPost />,
              action: postAction,
            }
          ]
        },   
       ]
      },
   ]);


const App = () => {
  return <RouterProvider router={router}/> 
}

export default App;


