import React from 'react'
import { useAuthContext } from '../../../hooks/useAuthContext'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import TableRow from './Components/TableRow'
import userAPI from '../../../resources/userAPI'
function UsersTable() {
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
			queryClient.invalidateQueries({
				queryKey: ['unapprovedUsers'],
			})
		},
	})

	return (
		<div className='card shadow rounded-4 mt-5'>
			<div className='card-body'>
				<h3>Brukere</h3>
				{!isPending && !isError && (
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
							{data?.users.map((user) => (
								<TableRow
									key={user._id}
									user={user}
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

export default UsersTable
