import { jwtDecode } from 'jwt-decode'
import { createContext, useReducer, useEffect } from 'react'

export const AuthContext = createContext()

export const authReducer = (state, action) => {
	switch (action.type) {
		case 'LOGIN':
			// Store the user object in localstorage so that the user does not have to login each time.
			// Remove the 'enabled'-property, so that the user does not have access to this.
			const storageObject = { ...action.payload }
			delete storageObject.role
			delete storageObject.enabled
			localStorage.setItem('user', JSON.stringify(storageObject))
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
		if (state.user) {
			const decodedToken = jwtDecode(state.user.token)
			const currentTime = Date.now() / 1000

			if (decodedToken.exp > currentTime) {
				state.user.enabled = decodedToken.enabled
				state.user.role = decodedToken.role

				dispatchState({ type: 'LOGIN', payload: state.user })
			} else {
				dispatchState({ type: 'LOGOUT', payload: state.user })
			}
		}
	}, [])

	return (
		<AuthContext.Provider value={{ ...state, dispatchState }}>
			{children}
		</AuthContext.Provider>
	)
}
