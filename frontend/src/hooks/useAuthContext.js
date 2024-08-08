import { AuthContext } from '../store/authContext'
import { useContext } from 'react'

export const useAuthContext = () => {
    const context = useContext(AuthContext)

    if (!context) {
        throw Error("Please only use hook within context provider")
    }

    return context
}