import React from 'react'

import styles from './Company.module.css'

import InputField from '../UI/InputField'
import { Link } from 'react-router-dom'

function Company() {
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
						<Link to={'/users/new'} className='btn btn-primary m-2'>
							Opprett ny bruker
						</Link>{' '}
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
			<div className='collapse' id='add-existing-user'>
				<div
					className={`card mt-5 rounded-4 shadow ${styles['max-width-500']}`}
				>
					<div className='card-body'>
						<h5>Legg til eksisterende bruker</h5>
						<div className='d-flex'>
							<div className='flex-column flex-fill'>
								<InputField
									className={'mb-3 flex-fill m-2'}
									type={'email'}
									id={'email'}
									label={'E-post'}
								/>
								<div className='alert alert-danger m-2'>
									Det finnes ingen bruker med den oppgitte
									epost-adressen
								</div>
							</div>
							<div className='mb-3 m-2'>
								<label htmlFor={'role'} className='form-label'>
									Rolle
								</label>
								<select
									className='form-select m-0'
									aria-label='Role'
									defaultValue={'Bruker'}
								>
									<option value={'0'}>Bruker</option>
									<option value='1'>Administrator</option>
									<option value='2'>Eier</option>
								</select>
							</div>
						</div>
						<div>
							<button className='btn btn-primary'>
								Legg til bruker
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default Company
