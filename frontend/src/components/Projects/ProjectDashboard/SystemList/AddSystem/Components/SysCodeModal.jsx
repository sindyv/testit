import Button from 'react-bootstrap/Button'
import BootstrapModal from 'react-bootstrap/Modal'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import projectsAPI from '../../../../../../resources/projectsAPI'
import { useAuthContext } from '../../../../../../hooks/useAuthContext'
import Toast from '../../../../../UI/Toast'

function SysCodeModal({ show, onClose, error }) {
	const { register, handleSubmit, reset } = useForm()
	const { projectId } = useParams()
	const { user } = useAuthContext()
	// Access the client
	const queryClient = useQueryClient()

	// Mutations
	const mutation = useMutation({
		mutationFn: async (data) => {
			await projectsAPI.createSystemCode({
				data,
				projectId,
				userId: user.id,
			})
		},
		onSuccess: () => {
			// Reset form
			toast.success('Data lagret', {})

			reset()
			onClose()
			console.log('Success!')
			// Invalidate and refetch
			queryClient.invalidateQueries({
				queryKey: ['projects'],
			})
		},
		onError: () => {
			toast.error(mutation.error.message, {})
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
						<label htmlFor={'name'} className='form-label'>
							Systemkode
						</label>
						<input
							{...register('name')}
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
