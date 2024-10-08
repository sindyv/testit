import { Link, useNavigate } from 'react-router-dom'
import Card from '../../../UI/Card'
import ThreeDotsDropdown from '../../../UI/ThreeDotsDropdown'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import projectsAPI from '../../../../resources/projectsAPI'
function ProjectSystemList() {
	const navigate = useNavigate()
	const { projectId } = useParams()

	// Queries
	const { isPending, isError, data, error } = useQuery({
		queryKey: [
			'projects',
			{
				query: {
					_id: projectId,
				},
			},
		],
		queryFn: projectsAPI.fetchProjects,
	})

	console.log(data)
	return (
		<Card
			title={'Systemoversikt'}
			className={'mt-3'}
			addbutton={() => navigate('add')}
		>
			<table className='table'>
				<thead>
					<tr>
						<th scope='col' className={``}>
							Systemer
						</th>
						<th scope='col'>Deltakere</th>
						<th scope='col'>Status</th>
						<th scope='col'>Avvik</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>
							<div>
								<Link to='123'>+C=360.001</Link>
							</div>
							<div className='fs-7 fw-normal'>
								Ventilasjon 1.etg
							</div>
						</td>
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
		</Card>
	)
}

export default ProjectSystemList
