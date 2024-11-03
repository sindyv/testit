const API_URL = import.meta.env.VITE_DATABASE_URL
const user = JSON.parse(localStorage.getItem("user"))
const OPTIONS = {
	headers: {
		Authorization: "Bearer " + user?.token,
		// "Content-Type": "application/json",
	},
}
export default {
	// Update a single company based on a ID
	uploadFile: async (fileObject) => {
		if (!fileObject) {
			throw Error("Bedrift-objekt ikke tilgjengelig")
		}
		try {
			const endpoint = `${API_URL}/files/upload`
			console.log(endpoint)
			const response = await fetch(endpoint, {
				method: "POST",
				...OPTIONS,
				body: fileObject,
			})

			const json = await response.json()
			if (!response.ok) {
				throw Error(json?.message ?? "Feil ved oppretting av data")
			}
			console.log(json)
			return json
		} catch (error) {
			// forward the error to Tanstack Query
			throw error
		}
	},
	fetchFiles: async ({ queryKey }) => {
		const [_key, { query }] = queryKey
		let queryString = "?"
		Object.entries(query).forEach(([key, value]) => {
			queryString = queryString + `${key}=${value}&`
		})

		try {
			const endpoint = `${API_URL}/files${queryString}`
			const response = await fetch(endpoint, OPTIONS)
			const json = await response.json()
			if (!response.ok) throw Error(json?.message ?? "Feil ved lasting av data")
			return json
		} catch (error) {
			// forward the error to Tanstack Query
			throw error
		}
	},
	downloadFile: async (companyId, fileId) => {
		try {
			const endpoint = `${API_URL}/files/${companyId}/${fileId}`
			const response = await fetch(endpoint, OPTIONS)
			if (!response.ok) throw Error(json?.message ?? "Feil ved lasting av data")
			const blob = await response.blob()
			const filename = response.headers.get("content-disposition").split('"')[1]
			const url = window.URL.createObjectURL(blob)
			const link = document.createElement("a")
			link.href = url
			link.setAttribute("download", filename) // Specify filename
			document.body.appendChild(link)
			link.click()
			link.parentNode.removeChild(link) // Clean up
			return { message: "Success" }
		} catch (error) {
			// forward the error to Tanstack Query
			throw error
		}
	},
	updateFile: async (file) => {
		try {
			const endpoint = `${API_URL}/files/${file.company}/${file._id}`
			const response = await fetch(endpoint, {
				...OPTIONS,
				method: "PUT",
				body: JSON.stringify({ file }),
			})
			const json = await response.json()
			if (!response.ok) throw Error(json?.message ?? "Feil ved lasting av data")
			console.log(json)
			return json
		} catch (error) {
			// forward the error to Tanstack Query
			throw error
		}
	},
}
