import { createContext, useReducer, useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import projectsAPI from '../resources/projectsAPI'
import { useForm } from 'react-hook-form'
export const AddSystemContext = createContext()

const addSystemReducer = (state, action) => {
	switch (action.type) {
		case 'asd':
			return
	}
}

function AddSystemContextProvider({ children }) {
	// Hooks
	const [state, dispatchState] = useReducer(addSystemReducer)
	const { projectId } = useParams()
	// Find query client
	const queryClient = useQueryClient()

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

	// Mutations
	const mutation = useMutation({
		mutationFn: async (projectObject) =>
			projectsAPI.createProject(projectObject),
		onSuccess: (data) => {},
	})

	// Make a 'users'-array
	const users = []

	if (!isPending && !isError) {
		data.projects[0].users.map((user) =>
			users.push({
				value: `${user.firstName} ${user.lastName}`,
				id: user._id,
			})
		)
	}

	// Form input handeling
	const { register, handleSubmit } = useForm({})

	// Make a contxt object
	const context = {
		state,
		dispatchState,
		project: data,
		users,
		register,
		handleSubmit,
		query: {
			isPending,
			isError,
			error,
		},
		mutation,
	}

	return (
		<AddSystemContext.Provider value={{ context }}>
			{children}
		</AddSystemContext.Provider>
	)
}

export default AddSystemContextProvider
