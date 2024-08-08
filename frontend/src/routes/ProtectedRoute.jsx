import { Navigate } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'

function ProtectedRoute({ children }) {
	const { user } = useAuthContext()

	if (!user) {
		return <Navigate to="/login" />
	}

	return children
}

export default ProtectedRoute
