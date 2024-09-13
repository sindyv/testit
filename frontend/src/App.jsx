import { createBrowserRouter, Navigate } from 'react-router-dom'
import { RouterProvider } from 'react-router-dom'
import ProtectedRoute from './routes/ProtectedRoute.jsx'
import Root from './routes/Root.jsx'
import ErrorPage from './routes/ErrorPage.jsx'
import LoginRoute from './routes/LoginRoute.jsx'
import SignupRoute from './routes/SignupRoute.jsx'
import { useAuthContext } from './hooks/useAuthContext.js'
import DashboardRoute from './routes/DashboardRoute.jsx'
import ProjectNewRoute from './routes/Project/ProjectNewRoute.jsx'
import UsersRoute from './routes/UsersRoute.jsx'
import CompanyRoute from './routes/Company/CompanyRoute.jsx'

import {
	action as newProjectAction,
	loader as newProjectLoader,
} from './components/Projects/ProjectNew.jsx'
import Company from './components/Company/Company.jsx'
import UsersAddRoute from './routes/UsersAddRoute.jsx'
import SignupNewCompany from './components/Unprotected/Signup/SignupNewCompany.jsx'
import UserIsRegistered from './components/Unprotected/Signup/UserIsRegistered.jsx'
import ProjectListRoute from './routes/Project/ProjectListRoute.jsx'
import SelectedProjectRoute from './routes/Project/SelectedProjectRoute.jsx'
import ProjectSystemList from './components/Projects/ProjectDashboard/SystemList/SystemList.jsx'
import ProjectFunctionDescription from './components/Projects/ProjectDashboard/FunctionDescription/FunctionDescription.jsx'
import ProjectIntegratedTestList from './components/Projects/ProjectDashboard/IntegratedTestList/IntegratedTestList.jsx'
import ProjectSystemTestList from './components/Projects/ProjectDashboard/SystemTestList/SystemTestList.jsx'
import ProjectUserList from './components/Projects/ProjectDashboard/UserList/ProjectUserList.jsx'
import ProjectDashboard from './components/Projects/ProjectDashboard/ProjectDashboard.jsx'
import System from './components/Projects/ProjectDashboard/System/System.jsx'

function App() {
	const { user } = useAuthContext()
	const router = createBrowserRouter([
		{
			path: '/signup',
			errorElement: <ErrorPage />,
			children: [
				{
					index: true,
					element: <SignupRoute />,
					errorElement: <ErrorPage />,
				},
				{
					path: 'company/new',
					element: <SignupNewCompany />,
					errorElement: <ErrorPage />,
				},
				{
					path: 'success',
					element: <UserIsRegistered />,
					errorElement: <ErrorPage />,
				},
			],
		},
		{
			path: '/',
			element: user ? <Root /> : <Navigate to={'/login'} />,
			errorElement: <ErrorPage />,
			children: [
				{
					index: true,
					element: (
						<ProtectedRoute>
							<DashboardRoute />
						</ProtectedRoute>
					),
					errorElement: <p>An error has occured!</p>,
				},
				{
					path: 'projects',
					handle: {
						crumb: () => {
							return 'Prosjekter'
						},
					},
					children: [
						{
							index: true,
							element: (
								<ProtectedRoute>
									<ProjectListRoute />
								</ProtectedRoute>
							),
							errorElement: <p>An error has occured!</p>,
						},
						{
							path: ':projectId',
							element: (
								<ProtectedRoute>
									<SelectedProjectRoute />
								</ProtectedRoute>
							),
							errorElement: <p>An error has occured!</p>,
							handle: {
								crumb: () => {
									return 'Dashboard'
								},
							},
							children: [
								{
									index: true,
									element: (
										<ProtectedRoute>
											<ProjectDashboard />
										</ProtectedRoute>
									),
									errorElement: <p>An error has occured!</p>,
									handle: {
										crumb: () => {
											return 'Brukere i prosjekt'
										},
									},
								},
								{
									path: 'users',
									element: (
										<ProtectedRoute>
											<ProjectUserList />
										</ProtectedRoute>
									),
									errorElement: <p>An error has occured!</p>,
									handle: {
										crumb: () => {
											return 'Brukere i prosjekt'
										},
									},
								},
								{
									path: 'system-tests',
									element: (
										<ProtectedRoute>
											<ProjectSystemTestList />
										</ProtectedRoute>
									),
									errorElement: <p>An error has occured!</p>,
									handle: {
										crumb: () => 'Systemtester',
									},
								},
								{
									path: 'integrated-tests',
									element: (
										<ProtectedRoute>
											<ProjectIntegratedTestList />
										</ProtectedRoute>
									),
									errorElement: <p>An error has occured!</p>,
									handle: {
										crumb: () => 'Integrerte tester',
									},
								},
								{
									path: 'function-descriptions',
									element: (
										<ProtectedRoute>
											<ProjectFunctionDescription />
										</ProtectedRoute>
									),
									errorElement: <p>An error has occured!</p>,
									handle: {
										crumb: () => 'Funksjonsbeskrivelser',
									},
								},
								{
									path: 'systems',
									errorElement: <ErrorPage />,
									handle: {
										crumb: () => 'Systemliste',
									},
									children: [
										{
											index: true,
											element: (
												<ProtectedRoute>
													<ProjectSystemList />
												</ProtectedRoute>
											),
											errorElement: <ErrorPage />,
										},
										{
											path: ':systemId',
											element: (
												<ProtectedRoute>
													<System />
												</ProtectedRoute>
											),
											errorElement: <ErrorPage />,
										},
									],
								},
							],
						},
						{
							path: 'new',
							element: (
								<ProtectedRoute>
									<ProjectNewRoute />
								</ProtectedRoute>
							),
							action: newProjectAction,
							loader: newProjectLoader,
							errorElement: <ErrorPage />,
							handle: {
								crumb: () => {
									return 'Opprett bruker'
								},
							},
						},
					],
				},

				{
					path: 'users',

					handle: {
						crumb: () => {
							return 'Brukere'
						},
					},
					children: [
						{
							index: true,
							element: (
								<ProtectedRoute>
									<UsersRoute />
								</ProtectedRoute>
							),
							errorElement: <p>An error has occured!</p>,
						},
						{
							path: 'add',
							element: (
								<ProtectedRoute>
									<UsersAddRoute />
								</ProtectedRoute>
							),
							errorElement: <p>An error has occured!</p>,
							handle: {
								crumb: () => {
									return 'Legg til bruker'
								},
							},
						},
					],
				},
				{
					path: 'company',
					element: (
						<ProtectedRoute>
							<CompanyRoute />
						</ProtectedRoute>
					),
					errorElement: <p>An error has occured!</p>,
					handle: {
						crumb: () => {
							return 'Din bedrift'
						},
					},
					children: [
						{
							index: true,
							element: (
								<ProtectedRoute>
									<Company />
								</ProtectedRoute>
							),
							errorElement: <p>An error has occured!</p>,
						},
					],
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
