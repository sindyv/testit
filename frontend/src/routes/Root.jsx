import { Outlet } from 'react-router-dom'
import Navigation from '../components/Navigation'

function Root() {
	return (
		<div className="">
			<Navigation />
			<Outlet className="" />
		</div>
	)
}

export default Root
