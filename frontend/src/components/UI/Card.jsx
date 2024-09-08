import React from 'react'
import { useNavigate } from 'react-router-dom'

function Card({ children, className, title, backbutton }) {
	const navigate = useNavigate()
	return (
		<>
			{backbutton && (
				<button
					className='btn btn-primary'
					onClick={() => navigate(-1)}
				>
					Tilbake
				</button>
			)}
			<div className={`card rounded-4 p-2 ${className}`}>
				<div className='card-body'>
					<h3 className='fw-normal'>{title}</h3>
					{children}
				</div>
			</div>
		</>
	)
}

export default Card
