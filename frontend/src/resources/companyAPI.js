const API_URL = import.meta.env.VITE_DATABASE_URL
const user = JSON.parse(localStorage.getItem('user'))
import axios from 'axios'

const OPTIONS = {
	headers: {
		Authorization: 'Bearer ' + user.token,
		'Content-Type': 'application/json',
	},
}
const apiFns = {
	// #########################################################
	// ################# Company routes ########################
	// #########################################################

	// Fetch a single company based in ID
	fetchCompany: async ({ queryKey }) => {
		const { companyId } = queryKey[1]
		try {
			const endpoint = `${API_URL}/companies/${companyId}`
			const response = await fetch(endpoint, OPTIONS)

			const json = await response.json()
			if (!response.ok)
				throw Error(json?.message ?? 'Feil ved lasting av data')

			return json
		} catch (error) {
			// forward the error to Tanstack Query
			throw error
		}
	},
	// Update a single company based on a ID
	updateCompany: async ({ company }) => {
		try {
			const endpoint = `${API_URL}/companies/${company._id}`
			const response = await fetch(endpoint, {
				method: 'POST',
				...OPTIONS,
				body: JSON.stringify({ company }),
			})

			const json = await response.json()
			if (!response.ok)
				throw Error(json?.message ?? 'Feil ved oppdatering av data')

			return json
		} catch (error) {
			// forward the error to Tanstack Query
			throw error
		}
	},
}

export default apiFns
