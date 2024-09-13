import { useAuthContext } from "./useAuthContext"
import { useState } from "react"

export const useSignup = () => {
	const [error, setError] = useState(null)
	const [loading, setLoading] = useState(null)
	const { dispatchState } = useAuthContext()

	async function signup(user, company) {
		setLoading(true)
		setError(null)

		const response = await fetch(
			import.meta.env.VITE_DATABASE_URL + "/users/signup",
			{
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					email: user.email,
					password: user.password,
					firstName: user.firstName,
					lastName: user.lastName,
					mobile: user.mobile,
					company,
				}),
			}
		)

		const json = await response.json()

		if (!response.ok) {
			setLoading(false)
			setError(json.error)

			return null
		}

		if (response.ok) {
			// save the user to local storage
			localStorage.setItem("user", JSON.stringify(json))

			// update the auth context
			dispatchState({ type: "LOGIN", payload: json })
			setLoading(false)

			return json
		}
	}
	return { signup, loading, error }
}
