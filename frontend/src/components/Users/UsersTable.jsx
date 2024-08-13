import React from 'react'
import ThreeDotsDropdown from '../UI/ThreeDotsDropdown'

function UsersTable() {
	return (
		<div className='card shadow rounded-4 mt-5'>
			<div className='card-body'>
				<h3>Brukere</h3>
				<table className='table'>
					<thead>
						<tr>
							<th scope='col'>Navn</th>
							<th scope='col'>Rolle</th>
							<th scope='col'>Aktive prosjekter</th>
							<th scope='col'>Status</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>Sindre Dyvik</td>
							<td>Administrator</td>
							<td className='ps-5'>
								<span className='badge text-bg-light'>3</span>
							</td>
							<td className='d-flex justify-content-between'>
								<span className='badge text-bg-success'>
									Aktiv
								</span>
								<span>
									<ThreeDotsDropdown />
								</span>
							</td>
						</tr>
						<tr>
							<td>Ole Kristensen</td>
							<td>Administrator</td>
							<td className='ps-5'>
								<span className='badge text-bg-light'>5</span>
							</td>
							<td className='d-flex justify-content-between'>
								<span className='badge text-bg-success'>
									Aktiv
								</span>
								<span>
									<ThreeDotsDropdown />
								</span>
							</td>
						</tr>
						<tr>
							<td>Jakob Østebø</td>
							<td>Bruker</td>
							<td className='ps-5'>
								<span className='badge text-bg-light'>1</span>
							</td>
							<td className='d-flex justify-content-between'>
								<span className='badge text-bg-warning'>
									Deaktivert
								</span>
								<span>
									<ThreeDotsDropdown />
								</span>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	)
}

export default UsersTable
