import { useAuthContext } from '../../../hooks/useAuthContext'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import projectsAPI from '../../../resources/projectsAPI'
import ProjectListTableLine from './Components/ProjectListTableLine'
import Toast from '../../UI/Toast'
import { useState } from 'react'
function ProjectList() {
	const { user } = useAuthContext()
	const [filters, setFilters] = useState({ company: user.company })
	// Access the client
	const queryClient = useQueryClient()

	// Queries
	const { isPending, isError, data, error } = useQuery({
		queryKey: [
			'projects',
			{
				query: filters,
			},
		],
		queryFn: projectsAPI.fetchProjects,
	})

	// Mutations
	const mutation = useMutation({
		mutationFn: async (project) => projectsAPI.updateProject(project),
		onSuccess: () => {
			// Invalidate and refetch
			queryClient.invalidateQueries({
				queryKey: ['projects'],
			})
		},
	})

	const handleSetFilters = (filter) => {
		setFilters((prev) => ({ company: user.company, ...filter }))
	}

	return (
		<div className='card shadow rounded-4 mt-5'>
			<div className='card-body'>
				<h3>Prosjekter</h3>
				<div className='d-flex gap-1'>
					<button
						className={`btn badge ${
							filters?.deactivated
								? 'text-bg-primary'
								: 'text-bg-secondary'
						}  p-2`}
						onClick={() => {
							handleSetFilters({ deactivated: false })
						}}
					>
						Aktive
					</button>
					<button
						className={`btn badge ${
							!filters?.deactivated
								? 'text-bg-primary'
								: 'text-bg-secondary'
						}  p-2`}
						onClick={() => {
							handleSetFilters({ deactivated: true })
						}}
					>
						Inaktive
					</button>
					<button
						className={`btn badge ${
							filters?.started
								? 'text-bg-primary'
								: 'text-bg-secondary'
						}  p-2`}
						onClick={() => {
							handleSetFilters({ started: false })
						}}
					>
						Ikke påbegynt
					</button>
					<button
						className={`btn badge ${
							!filters?.started
								? 'text-bg-primary'
								: 'text-bg-secondary'
						}  p-2`}
						onClick={() => {
							handleSetFilters({
								started: true,
								completed: false,
							})
						}}
					>
						Pågår
					</button>
					<button
						className={`btn badge ${
							filters?.completed
								? 'text-bg-primary'
								: 'text-bg-secondary'
						}  p-2`}
						onClick={() => {
							handleSetFilters({ completed: true })
						}}
					>
						Ferdigstilt
					</button>
					<button
						className={`btn badge ${
							filters?.deactivated
								? 'text-bg-primary'
								: 'text-bg-secondary'
						}  p-2`}
						onClick={() => {
							handleSetFilters({})
						}}
					>
						Alle
					</button>
				</div>
				<Toast message={error?.message} show={isError} />
				{isPending && <p>Loading ...</p>}
				{!isPending && !isError && (
					<table className='table'>
						<thead>
							<tr>
								<th scope='col'>Prosjekt</th>
								<th scope='col'>Sluttdato</th>
								<th scope='col'>Deltakere</th>
								<th scope='col'>Status</th>
								<th scope='col'>Tester</th>
								<th scope='col'>Avvik</th>
							</tr>
						</thead>
						<tbody>
							{data.projects.map((project) => (
								<ProjectListTableLine
									key={project._id}
									project={project}
									mutation={mutation}
								/>
							))}
						</tbody>
					</table>
				)}
			</div>
		</div>
	)
}

export default ProjectList
