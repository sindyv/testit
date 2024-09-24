import React from 'react'

function Modal({ title, modalId, children, onSubmit }) {
	return (
		<div
			className='modal fade'
			id={modalId}
			tabIndex='-1'
			aria-labelledby='exampleModalLabel'
			aria-hidden='true'
		>
			<div className='modal-dialog modal-dialog-centered'>
				<div className='modal-content'>
					<div className='modal-header'>
						<h1 className='modal-title fs-5' id={modalId}>
							{title}
						</h1>
						<button
							type='button'
							className='btn-close'
							data-bs-dismiss='modal'
							aria-label='Close'
						></button>
					</div>
					<form onSubmit={onSubmit}>
						<div className='modal-body'>{children}</div>
						<div className='modal-footer'>
							{' '}
							<button className='btn btn-primary' type='submit'>
								Lagre
							</button>
							<button
								type='button'
								className='btn btn-secondary'
								data-bs-dismiss='modal'
							>
								Lukk
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}

export default Modal
