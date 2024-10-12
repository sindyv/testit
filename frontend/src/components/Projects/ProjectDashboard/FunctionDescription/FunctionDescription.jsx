import { useAuthContext } from '../../../../hooks/useAuthContext'
import { useProjectContext } from '../../../../store/projectContext'
import Card from '../../../UI/Card'
import NewProjectDescription from './NewProjectDescription'
import { useQuery, useMutation } from '@tanstack/react-query'
import filesAPI from '../../../../resources/filesAPI'
import FunctionDescriptionRow from './Components/FunctionDescriptionRow'

function ProjectFunctionDescription() {
	const context = useProjectContext()
	const { project } = useProjectContext()
	const { user } = useAuthContext()
	// Mutations
	const mutation = useMutation({
		mutationFn: async (file) => await filesAPI.updateFile(file),
		onSuccess: () => {
			// Invalidate and refetch
			queryClient.invalidateQueries({
				queryKey: ['files'],
			})
		},
	})

	// query
	const { isSuccess, isPending, isError, data, error } = useQuery({
		queryKey: [
			'files',
			{
				query: {
					company: user.company,
					project: project._id,
				},
			},
		],
		queryFn: filesAPI.fetchFiles,
	})

	if (context.isPending) {
		return <p>Laster...</p>
	}

	return (
		<div className='d-flex flex-row gap-3'>
			<div className='' style={{ maxWidth: 500 }}>
				<Card title={'Legg til'} className={'mt-3'}>
					<NewProjectDescription project={project} />
				</Card>
			</div>
			<div className='' style={{ maxWidth: 500 }}>
				<Card title={'Funksjonsbeskrivelser'} className={'mt-3'}>
					{!isPending ? (
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
								{data.files.length > 0 &&
									data.files.map((file) => {
										return (
											<FunctionDescriptionRow
												file={file}
												key={file._id}
												mutation={mutation}
											/>
										)
									})}
							</tbody>
						</table>
					) : (
						<p>Laster...</p>
					)}
				</Card>
			</div>
		</div>
	)
}

export default ProjectFunctionDescription
