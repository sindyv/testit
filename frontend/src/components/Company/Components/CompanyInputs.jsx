import { useForm } from 'react-hook-form'
import InputField from '../../UI/InputField'
import useCapitalizeFirstLetter from '../../../hooks/useCapitalizeFirstLetter'

function CompanyInputs({ company, mutation }) {
	const { register, handleSubmit } = useForm({
		defaultValues: { ...company },
	})

	// Capitalize first letter of company name for estetics

	let companyName = []
	companyName = useCapitalizeFirstLetter(company?.companyName)

	const onSubmit = (data) => {
		mutation.mutate({ company: { ...data } })
	}

	return (
		<>
			<h3>{companyName}</h3>
			<div>
				<div className='d-flex'>
					<InputField
						className={'mb-3 flex-fill m-2'}
						register={register}
						label={'E-post'}
						id={'email'}
						type={'email'}
					/>
					<InputField
						className={'mb-3 flex-fill m-2'}
						register={register}
						disabled={true}
						id={'organisationNumber'}
						label={'Organisasjonsnummer'}
						type={'text'}
					/>
				</div>
				<div className='d-flex'>
					<InputField
						className={'mb-3 flex-fill m-2'}
						register={register}
						id={'address'}
						label={'Adresse'}
						type={'text'}
					/>
				</div>
				<div className='d-flex'>
					<InputField
						className={'mb-3 flex-fill m-2'}
						register={register}
						id={'postnu'}
						label={'Postnummer'}
						type={'text'}
					/>
					<InputField
						className={'mb-3 flex-fill m-2'}
						register={register}
						id={'city'}
						label={'By'}
						type={'text'}
					/>
				</div>
				<div className='m-2'>
					<button
						className='btn btn-primary'
						onClick={handleSubmit(onSubmit)}
						type='submit'
					>
						{mutation.isPending ? (
							<div
								className='spinner-border spinner-border-sm'
								role='status'
							>
								<span className='visually-hidden'>
									Laster...
								</span>
							</div>
						) : (
							'Lagre'
						)}
					</button>
				</div>
			</div>
		</>
	)
}

export default CompanyInputs
