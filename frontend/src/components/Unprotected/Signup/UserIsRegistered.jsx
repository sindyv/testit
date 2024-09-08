import React from 'react'
import styles from './Signup.module.css'
import { MainLogo } from '../../../assets/svg/MainLogo'
import { useNavigate } from 'react-router-dom'
function UserIsRegistered() {
	const navigate = useNavigate()
	return (
		<div className='container-fluid d-flex justify-content-center'>
			<div
				className={`card mt-5 rounded-4 shadow ${styles['max-width-500']}`}
			>
				<div className='card-body mb-2'>
					<div className='d-flex justify-content-between'>
						<h4 className='fw-normal'>Suksess!</h4>
						<MainLogo height={64} />
					</div>
					<p>
						Du har nå blitt registrert. Du vil snart motta en epost
						fra oss. Vennligst verifiser kontoen din ved å trykke på
						lenken i e-posten. PS! Sjekk søppelmappen din hvis
						eposten ikke dukker opp snart.
					</p>
					<button
						className='btn btn-primary'
						onClick={() => navigate('/login')}
					>
						Tilbake til innlogging
					</button>
				</div>
			</div>
		</div>
	)
}

export default UserIsRegistered
