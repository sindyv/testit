import { createContext, useReducer, useState } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import projectsAPI from "../resources/projectsAPI"
import { useForm } from "react-hook-form"
import useUpdateDataMutation from "../hooks/useUpdateDataMutation"
export const AddSystemContext = createContext()

const addSystemReducer = (state, action) => {
	switch (action.type) {
		case "asd":
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
			"projects",
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
			queryKey: [
				"projects",
				{
					query: {
						_id: projectId,
					},
				},
			],
		})
	}
	const mutateNewLocationCode = async (data) => {
		projectsAPI.createSystemLocation({ data, projectId })
	}

	const mutateNewSystemCode = async (data) => {
		projectsAPI.createSystemCode({ data, projectId })
	}

	const locationCodeMutation = useUpdateDataMutation(
		mutateNewLocationCode,
		invalidateQuery
	)

	const systemCodeMutation = useUpdateDataMutation(
		mutateNewSystemCode,
		invalidateQuery
	)

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
		locationCodeMutation,
		systemCodeMutation,
	}

	return (
		<AddSystemContext.Provider value={{ context }}>
			{children}
		</AddSystemContext.Provider>
	)
}

export default AddSystemContextProvider
