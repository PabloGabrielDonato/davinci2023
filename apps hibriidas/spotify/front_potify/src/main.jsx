import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import Error404 from './pages/Error404'
import LoginPage from './pages/LoginPage'
import RoutePrivate from './components/RoutePrivate'
import SongDetailPage from './pages/songs/SongDetailPage'
import SongsListPage from './pages/songs/SongsListPage'
import {
  createBrowserRouter, // crea el contexto de la ruta
  RouterProvider
} from 'react-router-dom'
import PlaylistPage from './pages/playlist/PlaylistPage'
import PlaylistDetailPage from './pages/playlist/PlaylistDetailPage'
import ProfilePage from './pages/ProfilePage'
import RegisterPage from './pages/RegisterPage'
import RecuperarPasswordPage from './pages/RecuperarPasswordPage'

// preparamos el router
const router = createBrowserRouter([
  {
    path: '/', // la url de la pagina
    element:<RoutePrivate>
              <App />
            </RoutePrivate>, // pagina
    errorElement: <Error404 />,
    children: [
      {
        path: 'songs',
        element: <SongsListPage />
      },
      {
        path: 'songs/:idSong',
        element: <SongDetailPage />
      },
      {
        path: '/',
        element: <PlaylistPage />
      },
      {
        path: '/playlist',
        element: <PlaylistPage />
      },
      {
        path: 'playlist/:id',
        element: <PlaylistDetailPage />
      },
      {
        path: 'profile',
        element: <ProfilePage />
      },
      
    ]
  },
  {
    path:'/login',
    element: <LoginPage />
  }, 
  {
    path: '/register',
    element: <RegisterPage />
  },
  {
    path: 'recuperar/password',
    element: <RecuperarPasswordPage />
  }
  
])

// JSX
ReactDOM.createRoot(document.getElementById('root'))

.render(
  <React.StrictMode>
      <RouterProvider router={router}/>
  </React.StrictMode>,
)
