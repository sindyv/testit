import Button from 'react-bootstrap/Button'
import BootstrapModal from 'react-bootstrap/Modal'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import projectsAPI from '../../../../../../resources/projectsAPI'
import { useAuthContext } from '../../../../../../hooks/useAuthContext'
import Toast from '../../../../../UI/Toast'

function SysLocModal({ show, onClose, error }) {
	const { register, handleSubmit, reset } = useForm()
	const { projectId } = useParams()
	const { user } = useAuthContext()

	// Access the client
	const queryClient = useQueryClient()

	// Mutations
	const mutation = useMutation({
		mutationFn: async (data) => {
			try {
				await projectsAPI.createSystemLocation({
					data,
					projectId,
					userId: user.id,
				})
			} catch (error) {
				throw error
			}
		},
		onSuccess: () => {
			// Reset form
			toast.success('Data lagret', {})

			reset()
			onClose()
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
		<>
			<BootstrapModal show={show} onHide={onClose} centered>
				<BootstrapModal.Header closeButton>
					<BootstrapModal.Title>
						Legg til lokasjonskode
					</BootstrapModal.Title>
				</BootstrapModal.Header>
				<form onSubmit={handleSubmit(onSubmit)}>
					<BootstrapModal.Body>
						<div className={'mb-3 flex-fill m-2'}>
							<label htmlFor={'name'} className='form-label'>
								Lokasjonskode
							</label>
							<input
								{...register('name')}
								className='form-control'
								placeholder='Systemts lokasjonsprefix (f.eks +A)'
							/>
						</div>
						<div className={'mb-3 flex-fill m-2'}>
							<label
								htmlFor={'description'}
								className='form-label'
							>
								Beskrivelse
							</label>
							<input
								{...register('description')}
								className='form-control'
								placeholder='Beskrivelse av systemet'
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
		</>
	)
}

export default SysLocModal
