import { AddSystemContext } from '../store/addSystemContext'
import { useContext } from 'react'

export const useAddSystemContext = () => {
	const context = useContext(AddSystemContext)

	if (!context) {
		throw Error('Please only use hook within context provider')
	}

	return context
}
