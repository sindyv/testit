import Button from 'react-bootstrap/Button'
import BootstrapModal from 'react-bootstrap/Modal'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import projectsAPI from '../../../../../../resources/projectsAPI'

function SysCodeModal({ show, onClose, error }) {
	const { register, handleSubmit, reset } = useForm()
	const { projectId } = useParams()
	// Access the client
	const queryClient = useQueryClient()

	// Mutations
	const mutation = useMutation({
		mutationFn: async (data) => {
			try {
				await projectsAPI.createSystemCode({ data, projectId })
			} catch (error) {
				console.log(error)
			}
		},
		onSuccess: () => {
			// Reset form
			reset()
			onClose()
			console.log('Success!')
			// Invalidate and refetch
			queryClient.invalidateQueries({
				queryKey: ['projects'],
			})
		},
	})

	const onSubmit = (data) => {
		mutation.mutate(data)
	}

	return (
		<BootstrapModal show={show} onHide={onClose} centered>
			<BootstrapModal.Header closeButton>
				<BootstrapModal.Title>Legg til systemkode</BootstrapModal.Title>
			</BootstrapModal.Header>
			<form onSubmit={handleSubmit(onSubmit)}>
				<BootstrapModal.Body>
					<div className={'mb-3 flex-fill m-2'}>
						<label htmlFor={'sysCode'} className='form-label'>
							Systemkode
						</label>
						<input
							{...register('sysCode')}
							className='form-control'
							placeholder='Systemnummer fra systemkodetabellen (f.eks 320, 350, 560 etc)'
						/>
					</div>
				</BootstrapModal.Body>
				<BootstrapModal.Footer>
					<Button variant='secondary' onClick={onClose}>
						Lukk
					</Button>
					<Button variant='primary' type='submit'>
						Legg til
					</Button>
				</BootstrapModal.Footer>
			</form>
		</BootstrapModal>
	)
}

export default SysCodeModal
