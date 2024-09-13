import Card from '../../../UI/Card'
import ThreeDotsDropdown from '../../../UI/ThreeDotsDropdown'
import styles from '../Components/ProjectDashboard.module.css'

function ProjectUserList() {
	return (
		<Card title={'Brukere i prosjekt'} className={'mt-3'}>
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
		</Card>
	)
}

export default ProjectUserList
