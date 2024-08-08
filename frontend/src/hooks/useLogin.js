import { useState } from 'react'
import { useAuthContext } from './useAuthContext'

function useLogin() {
	const [error, setError] = useState(null)
	const [loading, setLoading] = useState(null)
	const { dispatchState } = useAuthContext()

	async function login(email, password) {
		setLoading(true)
		setError(null)

		const response = await fetch(
			import.meta.env.VITE_DATABASE_URL + '/users/login',
			{
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email, password }),
			}
		)

		const json = await response.json()

		if (!response.ok) {
			setLoading(false)
			setError(json.error)
		}

		if (response.ok) {
			// save the user to local storage
			localStorage.setItem('user', JSON.stringify(json))

			// update the auth context
			dispatchState({ type: 'LOGIN', payload: json })
			setLoading(false)
		}
	}
	return { login, loading, error }
}

export default useLogin
