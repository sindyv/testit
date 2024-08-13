import React from 'react'

import styles from './AddNewUser.module.css'

import InputField from '../UI/InputField'
import { Link } from 'react-router-dom'

function AddNewUser() {
	return (
		<div className='container-fluid'>
			<h1>Brukere</h1>
			<div
				className={`card mt-5 rounded-4 shadow ${styles['max-width-500']}`}
			>
				<div className='card-body'>
					<h3>Legg til bruker</h3>
					<div>
						<div className='d-flex'>
							<InputField
								className={'mb-3 flex-fill m-2'}
								type={'text'}
								id={'forname'}
								label={'Fornavn'}
							/>
							<InputField
								className={'mb-3 flex-fill m-2'}
								type={'text'}
								id={'surname'}
								label={'Etternavn'}
							/>
						</div>
						<div className='d-flex'>
							<InputField
								className={'mb-3 flex-fill m-2'}
								type={'email'}
								id={'email'}
								label={'E-post'}
							/>
							<InputField
								className={'mb-3 flex-fill m-2'}
								type={'text'}
								id={'mobile'}
								label={'Mobil'}
							/>
						</div>
					</div>
					<div className='m-2'>
						<button className='btn btn-primary'>Legg til</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default AddNewUser
