import { Link, useNavigate } from 'react-router-dom'
import Card from '../../../UI/Card'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import projectsAPI from '../../../../resources/projectsAPI'
import SystemListRow from './Components/SystemListRow'
import { useProjectContext } from '../../../../store/projectContext'
function ProjectSystemList() {
	const navigate = useNavigate()
	const context = useProjectContext()

	let systems = []

	if (Array.isArray(context.project.systems)) {
		systems = [...context.project.systems]
	}

	systems.sort((a, b) => {
		const dataA = a.systemLocation.name
		const dataB = b.systemLocation.name

		if (dataA > dataB) {
			return 1
		} else if (dataA < dataB) {
			return -1
		} else {
			return 0
		}
	})

	return (
		<Card
			title={'Systemoversikt'}
			className={'mt-3'}
			addbutton={() => navigate('add')}
		>
			{context.isPending ? (
				<p>Laster...</p>
			) : (
				<table className='table'>
					<thead>
						<tr>
							<th scope='col' className={``}>
								Systemer
							</th>
							<th scope='col'>
								Deltakere (må hentes fra tester)
							</th>
							<th scope='col'>Status (må hentes fra tester)</th>
							<th scope='col'>Avvik (må hentes fra tester)</th>
						</tr>
					</thead>
					<tbody>
						{systems.map((system) => {
							return (
								<SystemListRow
									system={system}
									key={system._id}
								/>
							)
						})}
					</tbody>
				</table>
			)}
		</Card>
	)
}

export default ProjectSystemList
