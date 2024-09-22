import TableRow from './Components/TableRow'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuthContext } from '../../../hooks/useAuthContext'
import userAPI from '../../../resources/userAPI'
function AddNewUser() {
	const { user } = useAuthContext()
	// Access the client
	const queryClient = useQueryClient()

	// Queries
	const { isPending, isError, data, error } = useQuery({
		queryKey: [
			'unapprovedUsers',
			{
				query: {
					company: user.company,
					enabled: false,
				},
			},
		],
		queryFn: userAPI.fetchUserFromCompany,
		staleTime: 10000,
	})

	// Mutations
	const mutation = useMutation({
		mutationFn: async (user) => userAPI.updateUser(user),
		onSuccess: () => {
			// Invalidate and refetch
			queryClient.invalidateQueries()
		},
	})

	return (
		<div className={`card mt-5 rounded-4 shadow `}>
			<div className='card-body'>
				<h3>Legg til bruker</h3>
				<p className='fw-light'>
					Brukere som registrerer seg under din bedrift legges til
					her. Her kan du velge å godjkenne eller underkjenne. Ved
					underkjennelse vil brukeren få beskjed om at forespørselen
					om å bli med i bedriften, ikke er godkjent.
				</p>
				{isPending && <p>Loading...</p>}
				{!isError && !isPending && (
					<div>
						<div className='d-flex flex-row'>
							<table className='table'>
								<thead>
									<tr>
										<th scope='col'>Navn</th>
										<th scope='col'>E-post</th>
										<th scope='col'>Rolle</th>
										<th scope='col'></th>
									</tr>
								</thead>
								<tbody>
									{data.users.map((user) => (
										<TableRow
											key={user._id}
											user={user}
											mutation={mutation}
										/>
									))}
								</tbody>
							</table>
						</div>
					</div>
				)}
			</div>
		</div>
	)
}

export default AddNewUser
