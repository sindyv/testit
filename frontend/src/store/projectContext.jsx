import { createContext, useContext } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import projectsAPI from '../resources/projectsAPI'
import { toast } from 'react-toastify'

export const ProjectContext = createContext()

export function useProjectContext() {
	const context = useContext(ProjectContext)

	if (!context) {
		throw Error('Hooken kan brukes inn under context-provideren')
	}

	return context
}

const ProjectContextProvider = ({ children }) => {
	const { projectId } = useParams()
	const { user } = useAuthContext()
	const queryClient = useQueryClient()
	// Queries
	const { isPending, isError, data, error } = useQuery({
		queryKey: [
			'projects',
			{
				query: {
					_id: projectId,
				},
			},
		],
		queryFn: projectsAPI.fetchProjects,
	})

	const mutation = useMutation({
		mutationFn: async (data) => {
			await projectsAPI.createSystem({
				data,
				projectId,
				userId: user.id,
			})
		},
		onSuccess: () => {},
	})

	let project = {}
	if (!isPending && !isError) {
		project = { ...data.projects[0] }
	}

	if (!isPending && isError) {
		toast.error(error)
	}

	const value = {
		project,
		isPending,
		isError,
	}

	return (
		<ProjectContext.Provider value={value}>
			{children}
		</ProjectContext.Provider>
	)
}

export default ProjectContextProvider
