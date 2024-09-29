const API_URL = import.meta.env.VITE_DATABASE_URL
const user = JSON.parse(localStorage.getItem("user"))
import axios from "axios"

const OPTIONS = {
	headers: {
		Authorization: "Bearer " + user?.token,
		"Content-Type": "application/json",
	},
}
export default {
	// Update a single company based on a ID
	createProject: async ({ projectObject }) => {
		if (!projectObject) {
			throw Error("Bedrift-objekt ikke tilgjengelig")
		}
		try {
			const endpoint = `${API_URL}/projects`
			const response = await fetch(endpoint, {
				method: "POST",
				...OPTIONS,
				body: JSON.stringify({ projectObject }),
			})

			const json = await response.json()
			if (!response.ok)
				throw Error(json?.message ?? "Feil ved oppretting av data")

			return json
		} catch (error) {
			// forward the error to Tanstack Query
			throw error
		}
	},
	fetchProjects: async ({ queryKey }) => {
		const [_key, { query }] = queryKey
		let queryString = "?"
		Object.entries(query).forEach(([key, value]) => {
			queryString = queryString + `${key}=${value}&`
		})

		try {
			const endpoint = `${API_URL}/projects${queryString}`
			const response = await fetch(endpoint, OPTIONS)
			const json = await response.json()
			if (!response.ok) throw Error(json?.message ?? "Feil ved lasting av data")

			return json
		} catch (error) {
			// forward the error to Tanstack Query
			throw error
		}
	},
	updateProject: async (project) => {
		try {
			const endpoint = `${API_URL}/projects/${project._id}`
			const response = await fetch(endpoint, {
				...OPTIONS,
				method: "PUT",
				body: JSON.stringify({ project }),
			})
			const json = await response.json()
			if (!response.ok) throw Error(json?.message ?? "Feil ved lasting av data")

			return json
		} catch (error) {
			// forward the error to Tanstack Query
			throw error
		}
	},
	// Update a single company based on a ID
	createSystemLocation: async ({ data, projectId }) => {
		if (!FormDataEvent) {
			throw Error("Lokasjons-objekt ikke tilgjengelig")
		}
		try {
			const endpoint = `${API_URL}/projects/${projectId}/systems/locations`
			console.log(endpoint)
			const response = await fetch(endpoint, {
				method: "POST",
				...OPTIONS,
				body: JSON.stringify({ systemLocation: { ...data } }),
			})

			const json = await response.json()
			if (!response.ok) {
				console.log(json?.message)
				throw Error(json?.message ?? "Feil ved oppretting av data")
			}
			return json
		} catch (error) {
			// forward the error to Tanstack Query
			throw error
		}
	},
}
