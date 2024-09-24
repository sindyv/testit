import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import Card from '../../../../UI/Card'
import Modals from './Components/Modals'
function AddSystem() {
	const queryClient = useQueryClient()
	// Mutations
	const mutation = useMutation({
		mutationFn: async (projectObject) =>
			projectsAPI.createProject(projectObject),
		onSuccess: (data) => {},
	})

	const { register, handleSubmit } = useForm({
		defaultValues: { projectName: 'Ditt prosjekt' },
	})

	const onSubmit = () => {}

	return (
		<Card title={'Legg til system'} className={'mt-3'}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className='d-flex align-items-end'>
					<div className={'mb-3 flex-fill m-2'}>
						<label
							htmlFor={'projectName'}
							className='form-label  d-flex justify-content-between'
						>
							Systemlokasjon
							<button
								type='button'
								className='btn btn-outline-primary btn-sm'
								data-bs-toggle='modal'
								data-bs-target='#systemLocationModal'
							>
								+
							</button>
						</label>
						<select
							{...register('systemLocation')}
							className='form-select m-0'
						>
							<option value={'+C'} key={'+C'}>
								+C
							</option>
						</select>
					</div>
					<div className={'mb-3 flex-fill m-2'}>
						<label
							htmlFor={'projectDescription'}
							className='form-label d-flex justify-content-between'
						>
							Systemnummer
							<button
								type='button'
								className='btn btn-outline-primary btn-sm'
								data-bs-toggle='modal'
								data-bs-target='#systemNumberModal'
							>
								+
							</button>
						</label>
						<select
							{...register('mainSystem')}
							className='form-select m-0'
						>
							<option value={'320'} key={'320'}>
								320
							</option>
							<option value={'350'} key={'350'}>
								350
							</option>
							<option value={'360'} key={'360'}>
								360
							</option>
						</select>
					</div>
					<div className={'mb-3 flex-fill m-2'}>
						<label htmlFor={'systemNumber'} className='form-label'>
							Løpenummer
						</label>
						<input
							{...register('systemNumber')}
							className='form-control'
							type='number'
						/>
					</div>
				</div>
				<div className='d-flex'>
					<div className={'mb-3 flex-fill m-2 minw-300'}>
						<label htmlFor={'address'} className='form-label'>
							Beskrivelse
						</label>
						<input
							{...register('description')}
							className='form-control'
						/>
					</div>
				</div>
				<div className='d-flex'>
					<div className={'mb-3 m-2'}>
						<label
							htmlFor={'projectDescription'}
							className='form-label'
						>
							Legg til deltakere
						</label>
						<div className='d-flex gap-2'>
							<select className='form-select m-0'>
								<option value={'123'} key={'320'}>
									Sindre Dyvik
								</option>
								<option value={'124'} key={'350'}>
									Ole Kristensen
								</option>
								<option value={'125'} key={'360'}>
									Jens Normann
								</option>
							</select>
							<button className='btn btn-primary'>+</button>
						</div>
					</div>
				</div>
				<div>
					<button className='btn btn-primary' type='submit'>
						Opprett
					</button>
				</div>
			</form>

			<Modals />
		</Card>
	)
}

export default AddSystem
