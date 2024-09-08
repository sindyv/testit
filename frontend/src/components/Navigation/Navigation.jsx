import useLogout from '../../hooks/useLogout'
import styles from './Navigation.module.css'
import { Link } from 'react-router-dom'

import NavigationLink from './NavigationLink'

import { DashboardIcon } from '../../assets/icons/dashboard.jsx'

import { MainLogo } from '../../assets/svg/MainLogo.jsx'
import NavProjectCollapsable from './NavProjectCollapsable.jsx'
import { useAuthContext } from '../../hooks/useAuthContext.js'
import ThreeDotsDropdown from '../UI/ThreeDotsDropdown.jsx'
import NavCompaniesCollapsable from './NavCompaniesCollapsable.jsx'
import NavUsersCollapsable from './NavUsersCollapsable.jsx'

function Navigation() {
	const { logout } = useLogout()
	const handleLogout = () => {
		logout()
	}

	const userMenu = [
		{
			title: 'Logg ut',
			function: handleLogout,
		},
	]

	const { user } = useAuthContext()
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
						url={''}
						linkTitle={'Dashboard'}
						svg={<DashboardIcon />}
					/>
					{user.company ? (
						<>
							<NavProjectCollapsable />
							<NavUsersCollapsable />

							<NavCompaniesCollapsable />
						</>
					) : null}
				</ul>
			</div>
			<div className='d-flex justify-content-around'>
				<p
				// onClick={handleLogout}
				>
					{user.name}
				</p>
				<ThreeDotsDropdown menuItems={userMenu} />
			</div>
		</div>
	)
}

export default Navigation
