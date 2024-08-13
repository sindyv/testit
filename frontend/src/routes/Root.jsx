import { Outlet } from 'react-router-dom'
import Navigation from '../components/Navigation/Navigation'
import Breadcrumbs from '../components/UI/Breadcrumbs'

function Root() {
	return (
		<div className='d-flex flex-row'>
			<Navigation />
			<div className='d-flex flex-column m-3 container-fluid'>
				<div className=''>
					<Breadcrumbs />
				</div>
				<div className='container-fluid '>
					<Outlet className='' />
				</div>
			</div>
		</div>
	)
}

export default Root
