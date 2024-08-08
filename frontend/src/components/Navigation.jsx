import useLogout from '../hooks/useLogout'
import styles from './Navigation.module.css'
import { Link } from 'react-router-dom'

function Navigation() {
	const { logout } = useLogout()
	const handleLogout = () => {
		logout()
	}
	return (
		<div
			className={`border-end rounded-4 border-2 min-vh-100 d-flex flex-align-center d-flex flex-column ${styles.sidebar} `}
		>
			<ul className="nav">
				<li className="nav-item">
					<Link className="nav-link text-dark" to={'/login'}>
						<div className="d-flex gap-2 align-items-center">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								fill="currentColor"
								class="bi bi-columns-gap"
								viewBox="0 0 16 16"
							>
								<path d="M6 1v3H1V1zM1 0a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1zm14 12v3h-5v-3zm-5-1a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1zM6 8v7H1V8zM1 7a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1zm14-6v7h-5V1zm-5-1a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1z" />
							</svg>
							<span>Dashboard</span>
						</div>
					</Link>
				</li>
			</ul>
		</div>
		// <nav className="navbar">
		// 	<ul>
		// 		<li className="nav-item">
		// 			<Link to={'/login'}>Login</Link>
		// 		</li>
		// 		<li>
		// 			<Link to={'/signup'}>Sign up</Link>
		// 		</li>
		// 		<li>
		// 			<Link to={'/tables'}>The tables</Link>
		// 		</li>
		// 		<li>
		// 			<button className="btn btn-primary" onClick={handleLogout}>
		// 				Logout
		// 			</button>
		// 		</li>
		// 	</ul>
		// </nav>
	)
}

export default Navigation
