import { useForm } from 'react-hook-form'
import useGetUser from '../../../../hooks/useGetUser'

function NewProjectInputs({ data, mutation }) {
	const { register, handleSubmit } = useForm({
		defaultValues: { projectName: 'Ditt prosjekt' },
	})
	const user = useGetUser()
	const onSubmit = (data) => {
		mutation.mutate({
			projectObject: {
				...data,
				users: [data.owner],
				company: user.company,
				createdBy: user.id,
			},
		})
	}
	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className='d-flex'>
				<div className={'mb-3 flex-fill m-2'}>
					<label htmlFor={'projectName'} className='form-label'>
						Prosjektnavn
					</label>
					<input
						{...register('projectName')}
						className='form-control'
					/>
				</div>
				<div className={'mb-3 flex-fill m-2'}>
					<label
						htmlFor={'projectDescription'}
						className='form-label'
					>
						Beskrivelse
					</label>
					<input
						{...register('projectDescription')}
						className='form-control'
					/>
				</div>
			</div>
			<div className='d-flex'>
				<div className={'mb-3 flex-fill m-2 minw-300'}>
					<label htmlFor={'address'} className='form-label'>
						Adresse
					</label>
					<input {...register('address')} className='form-control' />
				</div>

				<div className={'mb-3 flex-fill m-2 mw-75   '}>
					<label htmlFor={'postnu'} className='form-label'>
						Postnr.
					</label>
					<input {...register('postnu')} className='form-control' />
				</div>
				<div className={'mb-3 flex-fill m-2'}>
					<label htmlFor={'city'} className='form-label'>
						By
					</label>
					<input {...register('city')} className='form-control' />
				</div>
			</div>
			<div className='d-flex'>
				<div className={'mb-3 flex-fill m-2'}>
					<label htmlFor={'webhotel'} className='form-label'>
						Adresse til webhotell
					</label>
					<input {...register('webhotel')} className='form-control' />
				</div>
				<div className={'mb-3 flex-fill m-2'}>
					<label htmlFor={'endDate'} className='form-label'>
						Sluttdato
					</label>
					<input
						{...register('endDate')}
						type='date'
						className='form-control'
					/>
				</div>
				<div className='mb-3 m-2'>
					<label htmlFor={'role'} className='form-label'>
						Ansvarlig
					</label>

					<select
						{...register('owner')}
						className='form-select m-0'
						aria-label='ProjectOwner'
					>
						{data.users.length > 0
							? data.users.map((user, index) => {
									return (
										<option value={user._id} key={user._id}>
											{user.firstName} {user.lastName}
										</option>
									)
							  })
							: null}
					</select>
				</div>
			</div>
			<div>
				<button className='btn btn-primary' type='submit'>
					Opprett
				</button>
			</div>
		</form>
	)
}

export default NewProjectInputs
