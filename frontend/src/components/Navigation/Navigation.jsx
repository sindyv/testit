import useLogout from '../../hooks/useLogout'
import styles from './Navigation.module.css'
import { Link } from 'react-router-dom'

import NavigationLink from './NavigationLink'

import { DashboardIcon } from '../../assets/icons/dashboard.jsx'

import { MainLogo } from '../../assets/svg/MainLogo.jsx'
import UserSvg from '../../assets/svg/UserSvg.jsx'
import CompanySvg from '../../assets/svg/CompanySvg.jsx'
import NavProjectCollapsable from './NavProjectCollapsable.jsx'

function Navigation() {
	const { logout } = useLogout()
	const handleLogout = () => {
		logout()
	}
	return (
		<div
			className={`border-end rounded-end-4 border-2 min-vh-100 d-flex flex-align-center flex-column justify-content-between ${styles.sidebar} `}
		>
			<div id='side-nav'>
				<div className='d-flex justify-content-center mt-3'>
					<MainLogo />
				</div>

				<ul className='nav flex-column'>
					<NavigationLink
						url={'dashboard'}
						linkTitle={'Dashboard'}
						svg={<DashboardIcon />}
					/>
					<NavProjectCollapsable />
					<NavigationLink
						url={'users'}
						linkTitle={'Brukere'}
						svg={<UserSvg />}
					/>
					<NavigationLink
						url={'company'}
						linkTitle={'Firma'}
						svg={<CompanySvg />}
					/>
				</ul>
			</div>
			<button className='btn btn-primary' onClick={handleLogout}>
				Logout
			</button>
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
