import Button from 'react-bootstrap/Button'
import BootstrapModal from 'react-bootstrap/Modal'

function Modal({ title, show, children, onSubmit, onClose }) {
	return (
		<BootstrapModal show={show} onHide={onClose} centered>
			<BootstrapModal.Header closeButton>
				<BootstrapModal.Title>{title}</BootstrapModal.Title>
			</BootstrapModal.Header>
			<BootstrapModal.Body>{children}</BootstrapModal.Body>
			<BootstrapModal.Footer>
				<Button variant='secondary' onClick={onClose}>
					Lukk
				</Button>
				<Button variant='primary' onClick={onSubmit}>
					Legg til
				</Button>
			</BootstrapModal.Footer>
		</BootstrapModal>
	)
}

export default Modal
