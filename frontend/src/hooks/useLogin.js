import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import { jwtDecode } from 'jwt-decode'

function useLogin() {
	const [error, setError] = useState(null)
	const [loading, setLoading] = useState(null)
	const { dispatchState, user } = useAuthContext()

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

		if (!response.ok) {
			setLoading(false)
			setError(json.error)

			return null
		}

		const json = await response.json()

		if (response.ok) {
			// decode the token to add the "enabled"-feature to the user object
			const decodedToken = jwtDecode(json.user.token)
			json.user.enabled = decodedToken.enabled
			// update the auth context
			dispatchState({ type: 'LOGIN', payload: json.user })
			setLoading(false)
			console.log(json.user)
			return json.user
		}
	}
	return { login, loading, error }
}

export default useLogin
