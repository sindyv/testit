import { createContext, useReducer, useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import projectsAPI from '../resources/projectsAPI'
import { useForm } from 'react-hook-form'
export const AddSystemContext = createContext()

function AddSystemContextProvider({ children }) {
	// Hooks

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
	const invalidateQuery = () => {
		queryClient.invalidateQueries({
			queryKey: ['projects'],
		})
	}

	const mutation = useMutation({
		mutationFn: async (data) => {
			try {
				await projectsAPI.createSystem({ data, projectId })
			} catch (error) {
				console.log(error)
			}
		},
		onSuccess: () => {
			// Reset form
			reset()
			console.log('Success!')
			// Invalidate and refetch
			queryClient.invalidateQueries({
				queryKey: ['projects'],
			})
		},
	})

	// Make a 'Projects'-object
	let project = {}
	if (!isPending && !isError) {
		project = { ...data.projects[0] }
	}

	// Make a various -arrays for use in addSystems component
	const users = []
	const systemCodes = []
	const systemLocations = []

	if (!isPending && !isError) {
		project.users.map((user) =>
			users.push({
				value: `${user.firstName} ${user.lastName}`,
				id: user._id,
			})
		)

		project.systemCodes.map((systemCode) => {
			systemCodes.push({
				value: systemCode.name,
				id: systemCode._id,
			})
		})

		project.systemLocations.map((systemLocation) => {
			systemLocations.push({
				value: systemLocation.name,
				id: systemLocation._id,
				description: systemLocation.description,
			})
		})
	}

	// Form input handeling
	const { register, handleSubmit } = useForm({})

	const onSubmit = (data) => {
		mutation.mutate(data)
		console.log(data)
	}

	// Make a contxt object
	const context = {
		project,
		users,
		register,
		handleSubmit,
		onSubmit,
		query: {
			isPending,
			isError,
			error,
		},
		systemCodes,
		systemLocations,
	}

	return (
		<AddSystemContext.Provider value={{ context }}>
			{children}
		</AddSystemContext.Provider>
	)
}

export default AddSystemContextProvider
