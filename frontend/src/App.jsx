import { createBrowserRouter, Link, Navigate } from 'react-router-dom'
import { RouterProvider } from 'react-router-dom'
import ProtectedRoute from './routes/ProtectedRoute.jsx'
import Root from './routes/Root.jsx'
import ErrorPage from './routes/ErrorPage.jsx'
import LoginRoute from './routes/LoginRoute.jsx'
import SignupRoute from './routes/SignupRoute.jsx'
import TablesRoute from './routes/TablesRoute.jsx'
import { useAuthContext } from './hooks/useAuthContext.js'
import DashboardRoute from './routes/DashboardRoute.jsx'
import ProjectDashboardRoute from './routes/ProjectDashboardRoute.jsx'
import ProjectNewRoute from './routes/ProjectNewRoute.jsx'
import UsersRoute from './routes/UsersRoute.jsx'
import CompanyRoute from './routes/CompanyRoute.jsx'
import UsersNewRoute from './routes/UsersNewRoute.jsx'

import {
	action as newProjectAction,
	loader as newProjectLoader,
} from './components/Projects/ProjectNew.jsx'

function App() {
	const { user } = useAuthContext()
	const router = createBrowserRouter([
		{
			path: '/',
			element: user ? <Root /> : <Navigate to={'/login'} />,
			errorElement: <ErrorPage />,
			children: [
				{
					path: '/dashboard',
					element: (
						<ProtectedRoute>
							<DashboardRoute />
						</ProtectedRoute>
					),
					errorElement: <p>An error has occured!</p>,
				},
				{
					path: '/projects',
					element: (
						<ProtectedRoute>
							<ProjectDashboardRoute />
						</ProtectedRoute>
					),
					errorElement: <p>An error has occured!</p>,
					handle: {
						crumb: () => {
							return (
								<Link
									to={'/projects'}
									className='text-dark nav-link'
								>
									Prosjekter
								</Link>
							)
						},
					},
				},
				{
					path: '/project-new',
					element: (
						<ProtectedRoute>
							<ProjectNewRoute />
						</ProtectedRoute>
					),
					action: newProjectAction,
					loader: newProjectLoader,
					errorElement: <p>An error has occured!</p>,
					handle: {
						crumb: () => {
							return (
								<Link
									to={'/project-new'}
									className='text-dark nav-link'
								>
									Opprett prosjekt
								</Link>
							)
						},
					},
				},
				{
					path: '/users',
					element: (
						<ProtectedRoute>
							<UsersRoute />
						</ProtectedRoute>
					),
					errorElement: <p>An error has occured!</p>,
					handle: {
						crumb: () => {
							return (
								<Link
									to={'/users'}
									className='text-dark nav-link'
								>
									Brukere
								</Link>
							)
						},
					},
				},
				{
					path: '/users/new',
					element: (
						<ProtectedRoute>
							<UsersNewRoute />
						</ProtectedRoute>
					),
					errorElement: <p>An error has occured!</p>,
					handle: {
						crumb: () => {
							return (
								<Link
									to={'/users/new'}
									className='text-dark nav-link'
								>
									Opprett bruker
								</Link>
							)
						},
					},
				},
				{
					path: '/company',
					element: (
						<ProtectedRoute>
							<CompanyRoute />
						</ProtectedRoute>
					),
					errorElement: <p>An error has occured!</p>,
					handle: {
						crumb: () => {
							return (
								<Link
									to={'/company'}
									className='text-dark nav-link'
								>
									Firma
								</Link>
							)
						},
					},
				},
			],
		},
		{
			path: '/login',
			element: <LoginRoute />,
		},
	])
	return (
		<>
			<RouterProvider router={router} />
		</>
	)
}

export default App
