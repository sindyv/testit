import { createContext, useReducer, useState } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import projectsAPI from "../resources/projectsAPI"
import { useForm } from "react-hook-form"
import { useAuthContext } from "../hooks/useAuthContext"
import Toast from "../components/UI/Toast"
export const AddSystemContext = createContext()

function AddSystemContextProvider({ children }) {
	// Hooks
	const { projectId } = useParams()
	const { user } = useAuthContext()
	// Find query client
	const queryClient = useQueryClient()

	// Queries
	const { isPending, isError, data, error } = useQuery({
		queryKey: [
			"projects",
			{
				projectId,
			},
		],
		queryFn: projectsAPI.getSystemCodesAndLocations,
	})

	const mutation = useMutation({
		mutationFn: async (data) => {
			try {
				await projectsAPI.createSystem({ data, projectId, userId: user.id })
			} catch (error) {
				console.log(error)
			}
		},
		onSuccess: () => {
			// Reset form
			reset()
			console.log("Success!")
			// Invalidate and refetch
			queryClient.invalidateQueries({
				queryKey: ["projects"],
			})
		},
	})

	// Make a arrays for system locations and system codes
	let systemCodes = []
	let systemLocations = []

	if (!isPending && !isError) {
		data?.systemCodes.map((systemCode) =>
			systemCodes.push({ value: systemCode.name, id: systemCode._id })
		)
		data?.systemLocations.map((systemLocation) =>
			systemLocations.push({
				value: systemLocation.name,
				id: systemLocation._id,
			})
		)
	}

	systemLocations.sort((a, b) => {
		const valueA = a.value.toUpperCase()
		const valueB = b.value.toUpperCase()

		if (valueA < valueB) {
			return -1
		} else if (valueA > valueB) {
			return 1
		} else {
			return 0
		}
	})

	systemCodes.sort((a, b) => a.value - b.value)

	// Form input handeling
	const { register, handleSubmit } = useForm({})

	const onSubmit = (data) => {
		mutation.mutate(data)
		console.log(data)
	}

	// Make a contxt object
	const context = {
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
