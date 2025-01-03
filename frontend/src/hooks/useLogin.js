import { useState } from "react"
import { useAuthContext } from "./useAuthContext"
import { jwtDecode } from "jwt-decode"

function useLogin() {
	const [error, setError] = useState(null)
	const [loading, setLoading] = useState(null)
	const { dispatchState, user } = useAuthContext()

	async function login(email, password) {
		setLoading(true)
		setError(null)
		const response = await fetch(
			import.meta.env.VITE_DATABASE_URL + "/users/login",
			{
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email, password }),
			}
		)

		const json = await response.json()
		console.log(json)
		if (!response.ok) {
			setLoading(false)
			setError(json || { error: { message: "En uventet feil oppstod" } })
			return null
		}
		if (response.ok) {
			// decode the token to add the "enabled"-feature to the user object
			const decodedToken = jwtDecode(json.user.token)
			json.user.enabled = decodedToken.enabled
			json.user.role = decodedToken.role
			// update the auth context
			dispatchState({ type: "LOGIN", payload: json.user })
			setLoading(false)
			return json.user
		}
	}
	return { login, loading, error }
}

export default useLogin
