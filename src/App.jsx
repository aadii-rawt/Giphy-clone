import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './Layout/Layout.jsx'
import Home from './Pages/Home.jsx'
import Category from './Pages/Category.jsx'
import Search from './Pages/Search.jsx'
import Gif from './Pages/SingleGif.jsx'
import Favourite from './Pages/Favourite.jsx'
import DataProvider from './Context/DataContext.jsx'

// routes
const router = createBrowserRouter([
  {
    path: '',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/:category',
        element: <Category />
      },
      {
        path: '/search/:query',
        element: <Search />
      },
      {
        path: '/:type/:slug',
        element: <Gif />
      },
      {
        path: '/favorites',
        element: <Favourite />
      }
    ]
  }
])

function App() {
  return (
    <DataProvider>
      <RouterProvider router={router} />
    </DataProvider>
  )
}

export default App
