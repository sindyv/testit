import { useEffect, useState } from 'react'

const useFetch = (endpoint, token) => {
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState('')
	const [data, setData] = useState(null)

	useEffect(() => {
		const fetchData = async () => {
			setError('')
			setIsLoading(true)

			const response = await fetch(
				`${import.meta.env.VITE_DATABASE_URL}/${endpoint}`,
				{
					headers: {
						Authorization: 'Bearer ' + token,
					},
				}
			)

			if (!response.ok) {
				setError('There was an error fetching your data')
			}

			if (response.ok) {
				const json = await response.json()

				setData(json)
			}

			setIsLoading(false)
		}
		if (token) {
			fetchData()
		}
	}, [endpoint])

	return { data, isLoading, error }
}

export default useFetch
