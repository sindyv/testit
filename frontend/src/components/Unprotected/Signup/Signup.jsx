import { useEffect, useState } from 'react'
import { useSignup } from '../../../hooks/useSignup'
import styles from './Signup.module.css'
import { Form, Link, useNavigate } from 'react-router-dom'
import InputFieldControlled from '../../UI/InputFieldControlled'
import { MainLogo } from '../../../assets/svg/MainLogo'
import SignupCompany from './Components/SignupCompany'

const Signup = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [repeatPassword, setRepeatPassword] = useState('')
	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('')
	const [mobile, setMobile] = useState('')
	const [company, setCompany] = useState('')
	const [passError, setPassError] = useState(undefined)
	const { signup, loading, error } = useSignup()
	const navigate = useNavigate()

	useEffect(() => {
		const timer = setTimeout(() => {
			if (password && repeatPassword) {
				if (password !== repeatPassword) {
					setPassError('Passordene må være like')
				} else {
					setPassError(undefined)
				}
			} else {
				setPassError(undefined)
			}
		}, 500)

		return () => clearTimeout(timer)
	}, [password, repeatPassword])

	const handleSubmit = async (e) => {
		e.preventDefault()

		const user = await signup(email, password, firstName, lastName, mobile)

		if (user) {
			navigate('/')
		}
	}

	return (
		<div className='container-fluid d-flex justify-content-center'>
			<div
				className={`card mt-5 rounded-4 shadow ${styles['max-width-500']}`}
			>
				<Form className='card-body'>
					<div className='d-flex justify-content-between'>
						<h4 className='fw-normal'>Opprett ny bruker</h4>
						<MainLogo height={64} />
					</div>
					<div>
						<div className='d-flex'>
							<InputFieldControlled
								className={'mb-3 flex-fill m-2'}
								type={'text'}
								id={'firstName'}
								label={'Fornavn'}
								data={firstName}
								setData={setFirstName}
							/>
							<InputFieldControlled
								className={'mb-3 flex-fill m-2'}
								type={'text'}
								id={'lastName'}
								label={'Etternavn'}
								data={lastName}
								setData={setLastName}
							/>
						</div>
						<div className='d-flex'>
							<InputFieldControlled
								className={'mb-3 flex-fill m-2'}
								type={'email'}
								id={'email'}
								label={'E-post'}
								data={email}
								setData={setEmail}
							/>
							<InputFieldControlled
								className={'mb-3 flex-fill m-2'}
								type={'text'}
								id={'mobile'}
								label={'Mobil'}
								data={mobile}
								setData={setMobile}
							/>
						</div>
						<div className='d-flex'>
							<InputFieldControlled
								className={'mb-3 flex-fill m-2'}
								type={'password'}
								id={'password'}
								label={'Passord'}
								data={password}
								setData={setPassword}
							/>
							<InputFieldControlled
								className={'mb-3 flex-fill m-2'}
								type={'password'}
								id={'repeatPassword'}
								label={'Gjenta passord'}
								data={repeatPassword}
								setData={setRepeatPassword}
							/>
						</div>
						<SignupCompany
							company={company}
							setCompany={setCompany}
						/>
						{passError && (
							<div className='alert alert-danger mt-3'>
								{passError}
							</div>
						)}
					</div>
					<div>
						{error && (
							<div className='alert alert-danger mt-3'>
								{error}
							</div>
						)}
					</div>
					<div className='m-2 d-flex gap-2'>
						<button
							className='btn btn-primary px-4'
							onClick={(e) => {
								handleSubmit(e)
							}}
						>
							Registrer bruker
						</button>
						<button
							className='btn btn-warning'
							onClick={() => navigate(-1)}
						>
							Tilbake
						</button>
					</div>
				</Form>
			</div>
		</div>
	)
}

export default Signup
