import { useAuthContext } from './useAuthContext'

function useLogout() {
	const { dispatchState } = useAuthContext()

	const logout = () => {
		localStorage.removeItem('user')
		dispatchState({ type: 'LOGOUT' })
	}

	return { logout }
}

export default useLogout
