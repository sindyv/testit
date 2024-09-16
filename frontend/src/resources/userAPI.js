const API_URL = import.meta.env.VITE_DATABASE_URL
const user = JSON.parse(localStorage.getItem('user'))
const OPTIONS = {
	headers: {
		Authorization: 'Bearer ' + user.token,
		'Content-Type': 'application/json',
	},
}
export default {
	fetchUserFromCompany: async ({ queryKey }) => {
		const { companyId } = queryKey[1]
		try {
			const endpoint = `${API_URL}/users/${companyId}`
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
}
