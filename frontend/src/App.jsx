import { createBrowserRouter } from 'react-router-dom'
import { RouterProvider } from 'react-router-dom'
import ProtectedRoute from './routes/ProtectedRoute.jsx'
import Root from './routes/Root.jsx'
import ErrorPage from './routes/ErrorPage.jsx'
import LoginRoute from './routes/LoginRoute.jsx'
import SignupRoute from './routes/SignupRoute.jsx'
import TablesRoute from './routes/TablesRoute.jsx'

const router = createBrowserRouter([
	{
		path: '/',
		element: <Root />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: '/login',
				element: <LoginRoute />,
			},
			{
				path: '/signup',
				element: <SignupRoute />,
			},
			{
				path: '/tables',
				element: (
					<ProtectedRoute>
						<TablesRoute />
					</ProtectedRoute>
				),
			},
		],
	},
])

function App() {
	return (
		<>
			<RouterProvider router={router} />
		</>
	)
}

export default App
