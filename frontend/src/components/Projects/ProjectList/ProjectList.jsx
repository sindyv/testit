import { useAuthContext } from '../../../hooks/useAuthContext'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import projectsAPI from '../../../resources/projectsAPI'
import ProjectListTableLine from './Components/ProjectListTableLine'
import Toast from '../../UI/Toast'
import { useState } from 'react'
import FilterButton from './Components/FilterButton'
function ProjectList() {
	const { user } = useAuthContext()
	const [filters, setFilters] = useState({
		filters: { company: user.company },
		button: 'aktive',
	})
	// Access the client
	const queryClient = useQueryClient()

	// Queries
	const { isPending, isError, data, error } = useQuery({
		queryKey: [
			'projects',
			{
				query: filters.filters,
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
		setFilters((prev) => ({
			filters: { company: user.company, ...filter.filters },
			button: filter.button,
		}))
	}

	return (
		<div className='card shadow rounded-4 mt-5'>
			<div className='card-body'>
				<h3>Prosjekter</h3>
				<div className='d-flex gap-1'>
					<FilterButton
						onClick={() => {
							handleSetFilters({
								filters: { deactivated: false },
								button: 'active',
							})
						}}
						filter={filters}
						buttonActiveText={'active'}
						buttonText={'Aktive'}
					/>
					<FilterButton
						onClick={() => {
							handleSetFilters({
								filters: { deactivated: true },
								button: 'inactive',
							})
						}}
						filter={filters}
						buttonActiveText={'inactive'}
						buttonText={'Deaktiverte'}
					/>
					<FilterButton
						onClick={() => {
							handleSetFilters({
								filters: { started: false },
								button: 'not started',
							})
						}}
						filter={filters}
						buttonActiveText={'not started'}
						buttonText={'Ikke påbegynt'}
					/>
					<FilterButton
						onClick={() => {
							handleSetFilters({
								filters: { started: true, completed: false },
								button: 'started',
							})
						}}
						filter={filters}
						buttonActiveText={'started'}
						buttonText={'Pågår'}
					/>
					<FilterButton
						onClick={() => {
							handleSetFilters({
								filters: { completed: true },
								button: 'completed',
							})
						}}
						filter={filters}
						buttonActiveText={'completed'}
						buttonText={'Ferdige'}
					/>
					<FilterButton
						onClick={() => {
							handleSetFilters({
								filters: {},
								button: 'all',
							})
						}}
						filter={filters}
						buttonActiveText={'all'}
						buttonText={'Alle'}
					/>

					{/* <button
						className={`btn badge ${
							filterButtons === 'inactive'
								? 'text-bg-primary'
								: 'text-bg-secondary'
						}  p-2`}
						onClick={() => {
							handleSetFilters({ deactivated: true })
							setFilterButtons('inactive')
						}}
					>
						Inaktive
					</button>
					<button
						className={`btn badge ${
							filterButtons === 'not started'
								? 'text-bg-primary'
								: 'text-bg-secondary'
						}  p-2`}
						onClick={() => {
							handleSetFilters({ started: false })
							setFilterButtons('not started')
						}}
					>
						Ikke påbegynt
					</button>
					<button
						className={`btn badge ${
							filterButtons === 'started'
								? 'text-bg-primary'
								: 'text-bg-secondary'
						}  p-2`}
						onClick={() => {
							handleSetFilters({
								started: true,
								completed: false,
							})
							setFilterButtons('started')
						}}
					>
						Pågår
					</button>
					<button
						className={`btn badge ${
							filterButtons === 'completed'
								? 'text-bg-primary'
								: 'text-bg-secondary'
						}  p-2`}
						onClick={() => {
							handleSetFilters({ completed: true })
							setFilterButtons('completed')
						}}
					>
						Ferdigstilt
					</button>
					<button
						className={`btn badge ${
							filterButtons === 'all'
								? 'text-bg-primary'
								: 'text-bg-secondary'
						}  p-2`}
						onClick={() => {
							handleSetFilters({})
							setFilterButtons('all')
						}}
					>
						Alle
					</button> */}
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
