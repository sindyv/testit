import styles from './Company.module.css'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

import API from '../../resources/companyAPI'
import { useAuthContext } from '../../hooks/useAuthContext'
import ErrorToast from '../UI/ErrorToast'
import SuccessToast from '../UI/SuccessToast'
import CompanyInputs from './Components/CompanyInputs'
import Toast from '../UI/Toast'

function Company() {
	const { user } = useAuthContext()

	// Access the client
	const queryClient = useQueryClient()

	// Queries
	const { isPending, isError, data, error } = useQuery({
		queryKey: ['company', { companyId: user.company }],
		queryFn: API.fetchCompany,
	})

	// Mutations
	const mutation = useMutation({
		mutationFn: async (company) => API.updateCompany(company),
		onSuccess: () => {
			// Invalidate and refetch
			queryClient.invalidateQueries({ queryKey: ['company'] })
		},
	})

	const company = data?.company ?? {}

	return (
		<>
			<div
				className={`card mt-5 rounded-4 shadow ${styles['max-width-500']}`}
			>
				<div className='card-body'>
					{isError && <ErrorToast>{error.message}</ErrorToast>}
					<Toast message={error?.message} show={isError} />
					{mutation.isError && (
						<ErrorToast>{mutation.error.message}</ErrorToast>
					)}
					{mutation.isSuccess && (
						<SuccessToast>Data oppdatert</SuccessToast>
					)}
					{isPending ? (
						<p>Loading ...</p>
					) : !isError ? (
						<CompanyInputs company={company} mutation={mutation} />
					) : null}
				</div>
			</div>
		</>
	)
}

export default Company
