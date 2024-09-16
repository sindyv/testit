import { Form, redirect, useLoaderData } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import API from '../../resources/userAPI'
import InputField from '../UI/InputField'
import useGetUser from '../../hooks/useGetUser'
import SuccessToast from '../UI/SuccessToast'
import ErrorToast from '../UI/ErrorToast'
import { useState } from 'react'
import NewProjectInputs from './Components/NewProjectInputs'

// const user = JSON.parse(localStorage.getItem('user'))

function ProjectNew() {
	const [selectedUser, setSelectedUser] = useState([])
	const user = useGetUser()
	// Access the client
	const queryClient = useQueryClient()

	const { isSuccess, isPending, isError, data, error } = useQuery({
		queryKey: ['companyUsers', { companyId: user.company }],
		queryFn: API.fetchUserFromCompany,
	})

	// Mutations
	const mutation = useMutation({
		mutationFn: async () => API.updateCompany(company),
		onSuccess: () => {
			// Invalidate and refetch
			queryClient.invalidateQueries({ queryKey: ['company'] })
		},
	})

	return (
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
					<NewProjectInputs
						data={data}
						selectedUser={selectedUser}
						setSelectedUser={setSelectedUser}
					/>
				)}
			</div>
		</div>
	)
}

export default ProjectNew
