import React, { useState, useEffect } from 'react'

const Toast = ({ message, show, onClose }) => {
	const [isVisible, setIsVisible] = useState(show)

	useEffect(() => {
		setIsVisible(show)
		if (show) {
			const timer = setTimeout(() => {
				setIsVisible(false)
				onClose()
			}, 3000)
			return () => clearTimeout(timer)
		}
	}, [show, onClose])

	return (
		<div
			className={`position-fixed bottom-0 end-0 p-3 ${
				isVisible ? 'show' : ''
			}`}
			style={{ zIndex: 11 }}
		>
			<div
				className={`toast ${isVisible ? 'show' : ''}`}
				role='alert'
				aria-live='assertive'
				aria-atomic='true'
			>
				<div className='toast-header'>
					<strong className='me-auto'>Notification</strong>
					<button
						type='button'
						className='btn-close'
						onClick={onClose}
					></button>
				</div>
				<div className='toast-body'>{message}</div>
			</div>
		</div>
	)
}
export default Toast
