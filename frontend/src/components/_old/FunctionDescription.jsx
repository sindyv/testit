import React from 'react'
import Card from '../UI/Card'
// import styles from '..//ProjectDashboard.module.css'
import ThreeDotsDropdown from '../UI/ThreeDotsDropdown'
import { Link } from 'react-router-dom'

function FunctionDescription() {
	return (
		<Card className={'flex-fill'} title={'Funksjonsbeskrivelser'}>
			<table className='table'>
				<thead>
					<tr>
						<th
							scope='col'
							// className={`${styles['table-td-min-width']}`}
						>
							System
						</th>
						<th scope='col'>Status</th>
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
						<td>
							<div className='my-2 d-flex justify-content-between'>
								<span className='me-3'>
									<span className='badge text-bg-warning fw-medium'>
										Ikke godkjent
									</span>
								</span>
								<span>
									<ThreeDotsDropdown />
								</span>
							</div>
						</td>
					</tr>

					<tr>
						<td>
							<div>+C=360.002</div>
							<div className='fs-7 fw-normal'>
								Ventilasjon 2.etg
							</div>
						</td>
						<td>
							<div className='my-2 d-flex justify-content-between'>
								<span className='me-3'>
									<span className='badge text-bg-success fw-medium'>
										Godkjent
									</span>
								</span>
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
				<Link to={'function-descriptions'}>
					<button className='btn btn-outline-primary'>
						Oversikt
					</button>
				</Link>
			</div>
		</Card>
	)
}

export default FunctionDescription
