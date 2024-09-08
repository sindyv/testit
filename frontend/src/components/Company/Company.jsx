import { useState } from 'react'
import styles from './Company.module.css'

import InputField from '../UI/InputField'
import { Link } from 'react-router-dom'

function Company() {
	const [externalCompanyChecked, setExternalCompanyChecked] = useState(false)

	const handleCheckExternalCompany = (e) => {
		setExternalCompanyChecked(e.target.checked)
	}

	return (
		<>
			<div
				className={`card mt-5 rounded-4 shadow ${styles['max-width-500']}`}
			>
				<div className='card-body'>
					<h3>Firmanavn</h3>
					<div>
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
								id={'telephone'}
								label={'Telefonnummer'}
							/>
						</div>
						<div className='d-flex'>
							<InputField
								className={'mb-3 flex-fill m-2'}
								type={'text'}
								id={'address'}
								label={'Adresse'}
							/>
							<InputField
								className={'mb-3 flex-fill m-2'}
								type={'text'}
								id={'street'}
								label={'Gatenavn'}
							/>
						</div>
						<div className='d-flex'>
							<InputField
								className={'mb-3 flex-fill m-2'}
								type={'text'}
								id={'streetnu'}
								label={'Gatenummer'}
							/>
							<InputField
								className={'mb-3 flex-fill m-2'}
								type={'text'}
								id={'postal'}
								label={'Postnummer'}
							/>
							<InputField
								className={'mb-3 flex-fill m-2'}
								type={'text'}
								id={'city'}
								label={'By'}
							/>
						</div>
					</div>
					<div>
						<button
							className='m-2 btn btn-primary'
							data-bs-toggle='collapse'
							data-bs-target='#add-existing-user'
							type='button'
							aria-expanded='false'
							aria-controls='add-existing-user'
						>
							Legg til eksisterende bruker
						</button>
					</div>
				</div>
			</div>
		</>
	)
}

export default Company
