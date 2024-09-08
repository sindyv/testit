import React from 'react'
import ThreeDotsDropdown from '../../../UI/ThreeDotsDropdown'
import Card from '../../../UI/Card'
import { Link } from 'react-router-dom'
function Deviations() {
	return (
		<Card className={'flex-fill'} title={'Avvik'}>
			<table className='table'>
				<thead>
					<tr>
						<th scope='col' className={``}>
							System
						</th>
						<th scope='col'>Beskrivelse</th>
						<th scope='col'>Registrert</th>
						<th scope='col'>Frist</th>
						<th scope='col'>Ansvar</th>
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
						<td className='py-3'>Føler montert på fei...</td>
						<td className='py-3'>2024-06-25</td>
						<td className='py-3'>
							<span className='me-3'>
								<span className='badge text-bg-danger fw-medium'>
									2024-08-01
								</span>
							</span>
						</td>
						<td className='py-3'>Sig. Halvorsen</td>
					</tr>
					<tr>
						<td>
							<div>+C=320.001</div>
							<div className='fs-7 fw-normal'>
								Hovedvarmekrets
							</div>
						</td>
						<td className='py-3'>Lekkasje på ventil regis...</td>
						<td className='py-3'>2024-07-25</td>
						<td className='py-3'>
							<span className='me-3'>
								<span className='badge text-bg-warning fw-medium'>
									2024-10-01
								</span>
							</span>
						</td>
						<td className='py-3'>Sig. Halvorsen</td>
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

export default Deviations
