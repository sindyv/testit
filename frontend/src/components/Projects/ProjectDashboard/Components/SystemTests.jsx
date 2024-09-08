import React from 'react'
import ThreeDotsDropdown from '../../../UI/ThreeDotsDropdown'
import Card from '../../../UI/Card'
import { Link } from 'react-router-dom'
function SystemTests() {
	return (
		<Card className={'flex-fill'} title={'Systemtester'}>
			<table className='table'>
				<thead>
					<tr>
						<th scope='col' className={``}>
							System
						</th>
						<th scope='col'>Sluttdato</th>
						<th scope='col'>Deltakere</th>
						<th scope='col'>Status</th>
						<th scope='col'>Utført</th>
						<th scope='col'>Avvik</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>
							<div>+C=360.001</div>
							<div className='fs-7 fw-normal'>
								Ventilasjon 1.etg
							</div>
						</td>
						<td className='py-3'>2024-09-29</td>
						<td className='py-3 d-flex gap-2'>
							<span className='badge text-bg-light fw-medium fs-6'>
								Sindre
							</span>
							<span className='badge text-bg-light fw-medium fs-6'>
								Egil
							</span>
							<span className='badge text-bg-light fw-medium fs-6'>
								Jakob
							</span>
						</td>
						<td className='py-3'>
							<span className='me-3'>
								<span className='badge text-bg-info fw-medium'>
									Ikke startet
								</span>
							</span>
						</td>
						<td className='py-3'>3/16</td>
						<td className='py-3'>
							<div className='d-flex justify-content-between'>
								<span className='mx-3'>1</span>
								<span>
									<ThreeDotsDropdown />
								</span>
							</div>
						</td>
					</tr>
				</tbody>
			</table>

			<div className='d-flex justify-content-end gap-2'>
				<button className='btn btn-primary'>Legg til</button>
				<Link to={'system-tests'}>
					<button className='btn btn-outline-primary'>
						Oversikt
					</button>
				</Link>
			</div>
		</Card>
	)
}

export default SystemTests
