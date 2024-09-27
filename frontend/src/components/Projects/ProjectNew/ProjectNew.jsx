import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import userAPI from '../../../resources/userAPI'
import projectsAPI from '../../../resources/projectsAPI'
import useGetUser from '../../../hooks/useGetUser'
import SuccessToast from '../../UI/SuccessToast'
import ErrorToast from '../../UI/ErrorToast'
import NewProjectInputs from './Components/NewProjectInputs'

function ProjectNew() {
	const user = useGetUser()
	// Access the client
	const queryClient = useQueryClient()

	const { isSuccess, isPending, isError, data, error } = useQuery({
		queryKey: [
			'companyUsers',
			{
				query: {
					company: user.company,
					enabled: true,
				},
			},
		],
		queryFn: userAPI.fetchUserFromCompany,
	})

	// Mutations
	const mutation = useMutation({
		mutationFn: async (projectObject) =>
			projectsAPI.createProject(projectObject),
		onSuccess: (data) => {},
	})

	return (
		<div className='container-sm'>
			<div className={`card mt-5 rounded-4 shadow `}>
				<div className='card-body'>
					<h3>Opprett prosjekt</h3>
					{isError && <ErrorToast>{error.message}</ErrorToast>}
					{mutation.isError && (
						<ErrorToast>{mutation.error.message}</ErrorToast>
					)}
					{mutation.isSuccess && (
						<SuccessToast>Data oppdatert</SuccessToast>
					)}
					{isSuccess && (
						<NewProjectInputs data={data} mutation={mutation} />
					)}
				</div>
			</div>
		</div>
	)
}

export default ProjectNew
