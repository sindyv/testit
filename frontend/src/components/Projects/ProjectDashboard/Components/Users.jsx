import React from 'react'
import ThreeDotsDropdown from '../../../UI/ThreeDotsDropdown'
import styles from './ProjectDashboard.module.css'
import Card from '../../../UI/Card'
import { Link } from 'react-router-dom'

function Users() {
	return (
		<Card className={'flex-fill'} title={'Brukere'}>
			<table className='table'>
				<thead>
					<tr>
						<th
							scope='col'
							className={`${styles['table-td-min-width']}`}
						>
							Bruker
						</th>
						<th scope='col'>Status</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>
							<div>Sindre Dyvik</div>
							<div className='fs-7 fw-normal'>Ansvarlig</div>
						</td>
						<td className=''>
							<div className='my-2 d-flex justify-content-between'>
								<span className='me-3'>
									<span className='badge text-bg-info fw-medium'>
										Aktiv
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
							<div>Magnus Wiksnes</div>
							<div className='fs-7 fw-normal'>Dektaker</div>
						</td>
						<td>
							<div className='my-2 d-flex justify-content-between'>
								<span className='me-3'>
									<span className='badge text-bg-warning fw-medium'>
										Inaktiv
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
				<Link to={'users'}>
					<button className='btn btn-outline-primary'>
						Oversikt
					</button>
				</Link>
			</div>
		</Card>
	)
}

export default Users
