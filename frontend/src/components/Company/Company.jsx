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

	// return (
	// 	<>
	// 		<div
	// 			className={`card mt-5 rounded-4 shadow ${styles['max-width-500']}`}
	// 		>
	// 			<div className='card-body'>
	// 				<h3>{companyName}</h3>
	// 				{isError && <ErrorToast>{error.message}</ErrorToast>}
	// 				{mutation.isError && (
	// 					<ErrorToast>{mutation.error.message}</ErrorToast>
	// 				)}
	// 				{mutation.isSuccess && (
	// 					<SuccessToast>Data oppdatert</SuccessToast>
	// 				)}
	// 				{isPending ? (
	// 					<p>Laster ...</p>
	// 				) : (
	// 					<div>
	// 						<div className='d-flex'>
	// 							<InputFieldControlled
	// 								className={'mb-3 flex-fill m-2'}
	// 								type={'email'}
	// 								id={'email'}
	// 								label={'E-post'}
	// 								data={company.email}
	// 								setData={setCompany}
	// 							/>
	// 							<InputFieldControlled
	// 								className={'mb-3 flex-fill m-2'}
	// 								type={'text'}
	// 								id={'organisationNumber'}
	// 								label={'Organisasjonsnummer'}
	// 								data={company.organisationNumber}
	// 								setData={setCompany}
	// 								disabled={true}
	// 							/>
	// 						</div>
	// 						<div className='d-flex'>
	// 							<InputFieldControlled
	// 								className={'mb-3 flex-fill m-2'}
	// 								type={'text'}
	// 								id={'address'}
	// 								label={'Adresse'}
	// 								data={company.address}
	// 								setData={setCompany}
	// 							/>
	// 						</div>
	// 						<div className='d-flex'>
	// 							<InputFieldControlled
	// 								className={'mb-3 flex-fill m-2'}
	// 								type={'text'}
	// 								id={'postnu'}
	// 								label={'Postnummer'}
	// 								data={company.postnu}
	// 								setData={setCompany}
	// 							/>
	// 							<InputFieldControlled
	// 								className={'mb-3 flex-fill m-2'}
	// 								type={'text'}
	// 								id={'city'}
	// 								label={'By'}
	// 								data={company.city}
	// 								setData={setCompany}
	// 							/>
	// 						</div>
	// 						<div className='m-2'>
	// 							<button
	// 								className='btn btn-primary'
	// 								onClick={handleSubmit}
	// 							>
	// 								{mutation.isPending ? (
	// 									<div
	// 										className='spinner-border spinner-border-sm'
	// 										role='status'
	// 									>
	// 										<span className='visually-hidden'>
	// 											Laster...
	// 										</span>
	// 									</div>
	// 								) : (
	// 									'Lagre'
	// 								)}
	// 							</button>
	// 						</div>
	// 					</div>
	// 				)}
	// 			</div>
	// 		</div>
	// 	</>
	// )
}

export default Company
