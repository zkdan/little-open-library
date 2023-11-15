import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import bookImg from './assets/book_generated.png'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import BookDetails from './BookDetails.jsx';
import ErrorBoundary from './ErrorBoundary';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/works/:identifier",
        element: <BookDetails />,
        id:"details",
        errorElement:<ErrorBoundary name={'detail'} />,
        loader: async ({params})=>{
          const fetchResponse ={};
          const resp = await fetch(`https://openlibrary.org/works/${params.identifier}.json`).then(res => {
            if (res.status === 404) {
              throw new Response("Not Found", { status: 404 });
            }
            return res.json();
          })
          .then(res => {
            if(res.status === 200){
              res.imgUrl = res.covers ? `https://covers.openlibrary.org/b/id/${res.covers[0]}-L.jpg` : bookImg;
            }
            return res
          })
          return resp
        },

      },
    ],
  }
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>,
)
