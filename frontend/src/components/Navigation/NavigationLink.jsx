import useLogout from '../../hooks/useLogout'
import styles from './Navigation.module.css'
import { NavLink } from 'react-router-dom'

function NavigationLink({ url, svg = null, linkTitle }) {
	return (
		<li className='nav-item'>
			<NavLink className={`nav-link text-dark m-2`} to={`/${url}`}>
				<div className='d-flex gap-2 align-items-center'>
					{svg ? svg : null}
					<span>{linkTitle}</span>
				</div>
			</NavLink>
		</li>
	)
}

export default NavigationLink
