import { Link } from 'react-router-dom'
import { Outlet } from 'react-router-dom'

function SelectedProjectRoute() {
	return (
		<>
			<h1 className='fw-normal'>Lærdal Gjenværende</h1>
			<p className='fw-light'>Tanke Svilandsgate 30</p>
			<div className='d-flex flex-row gap-2'>
				<Link to='./'>
					<button className='btn btn-primary'>Dashboard</button>
				</Link>
				<Link to='systems'>
					<button className='btn btn-primary'>Systemoversikt</button>
				</Link>
				<Link to='function-descriptions'>
					<button className='btn btn-primary'>
						Funksjonsbeskrivelser
					</button>
				</Link>
				<Link to='users'>
					<button className='btn btn-primary'>Brukere</button>
				</Link>
			</div>
			<Outlet />
		</>
	)
}

export default SelectedProjectRoute
