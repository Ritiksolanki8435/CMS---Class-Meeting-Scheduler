
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './store'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import Overview from './components/Overview/Overview'
import 'bootstrap/dist/css/bootstrap.min.css'
import './styles.css'

const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/overview', element: <Overview /> }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
)
