import { jwtDecode } from 'jwt-decode'
import { createContext, useReducer, useEffect } from 'react'

export const AuthContext = createContext()

export const authReducer = (state, action) => {
	switch (action.type) {
		case 'LOGIN':
			return { user: action.payload }
		case 'LOGOUT':
			return { user: null }
		default:
			return state
	}
}

export const AuthContextProvider = ({ children }) => {
	const [state, dispatchState] = useReducer(authReducer, {
		user: JSON.parse(localStorage.getItem('user')),
	})

	useEffect(() => {
		const user = JSON.parse(localStorage.getItem('user'))

		if (user) {
			const decodedToken = jwtDecode(user.token)
			const currentTime = Date.now() / 1000

			if (decodedToken.exp > currentTime) {
				dispatchState({ type: 'LOGIN', payload: user })
				console.log(decodedToken.exp)
			} else {
				dispatchState({ type: 'LOGOUT', payload: user })
			}
		}
	}, [])

	return (
		<AuthContext.Provider value={{ ...state, dispatchState }}>
			{children}
		</AuthContext.Provider>
	)
}
