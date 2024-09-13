import Card from '../../../UI/Card'
import ThreeDotsDropdown from '../../../UI/ThreeDotsDropdown'
import NewProjectDescription from './NewProjectDescription'

function ProjectFunctionDescription() {
	return (
		<div className='d-flex flex-row gap-3'>
			<div className='' style={{ maxWidth: 500 }}>
				<Card title={'Legg til'} className={'mt-3'}>
					<NewProjectDescription />
				</Card>
			</div>
			<div className='' style={{ maxWidth: 500 }}>
				<Card title={'Funksjonsbeskrivelser'} className={'mt-3'}>
					<table className='table'>
						<thead>
							<tr>
								<th scope='col' className={`minw-300`}>
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
				</Card>
			</div>
		</div>
	)
}

export default ProjectFunctionDescription
