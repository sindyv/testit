import { useEffect, useState } from 'react'
import { useSignup } from '../../../hooks/useSignup'
import styles from './Signup.module.css'
import { useNavigate } from 'react-router-dom'
import { MainLogo } from '../../../assets/svg/MainLogo'
import SignupCompany from './Components/SignupCompany'
import SignupInputfields from './Components/SignupInputfields'
import SignupButtons from './Components/SignupButtons'
import SignupReadOnlyCheckbox from './Components/SignupReadOnlyCheckbox'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
const Signup = () => {
	// States
	const [user, setUser] = useState({
		email: '',
		password: '',
		repeatPassword: '',
		firstName: '',
		lastName: '',
		mobile: '',
		passError: '',
		readOnly: false,
	})
	const [error, setError] = useState(undefined)
	const [orgNu, setOrgNu] = useState({ orgNu: '' })
	const [fetchedCompany, setFetchedCompany] = useState('')

	// Hooks
	const { signup, loading, error: signupError } = useSignup()
	const navigate = useNavigate()

	//useEffects
	// Fetches company when organisation number is typed in.
	useEffect(() => {
		const fetchCompanies = async () => {
			try {
				const response = await fetch(
					`https://data.brreg.no/enhetsregisteret/api/enheter/${orgNu.orgNu}`
				)

				if (!response.ok) {
					throw Error('Failed to fetch data')
				}

				const data = await response.json()
				setFetchedCompany(data)
			} catch (error) {
				setError(error.message)
			}
		}
		if (orgNu.orgNu.length === 9) {
			fetchCompanies()
		}
	}, [orgNu])

	// Matches passwords, and gives an error of passwords are different
	useEffect(() => {
		const timer = setTimeout(() => {
			if (user.password && user.repeatPassword) {
				if (user.password !== user.repeatPassword) {
					setError('Passordene må være like')
				} else {
					setError(undefined)
				}
			} else {
				setError(undefined)
			}
		}, 800)

		return () => clearTimeout(timer)
	}, [user.password, user.repeatPassword])

	// Button handlers

	// Submit form that registers users
	const handleSubmit = async (e) => {
		e.preventDefault()
		if (!fetchedCompany) {
			setError('Vi fant ingenting med dette organisasjonsnummeret')
		} else {
			const signedUpUser = await signup(user, fetchedCompany)
			if (signedUpUser) {
				navigate('/')
			}
		}
	}

	return (
		<Container fluid='sm'>
			<Row className='justify-content-center'>
				<Card
					className='border rounded-4 mt-5 shadow'
					style={{ width: '40rem' }}
				>
					<Card.Body>
						<Row>
							<Col className='align-self-center'>
								<h4 className='fw-normal my-auto'>
									Opprett ny bruker
								</h4>
							</Col>
							<Col sm='auto'>
								<MainLogo height={64} />
							</Col>
						</Row>
						<Form onSubmit={handleSubmit}>
							<SignupInputfields user={user} setUser={setUser} />
							<SignupCompany
								orgNu={orgNu}
								setOrgNu={setOrgNu}
								fetchedCompany={fetchedCompany}
							/>
							<SignupReadOnlyCheckbox
								user={user}
								setUser={setUser}
							/>
							{error && (
								<div className='alert alert-danger mt-3 mw-450'>
									{error}
								</div>
							)}
							{signupError && (
								<div className='alert alert-danger mt-3 mw-450'>
									{signupError}
								</div>
							)}
							<SignupButtons
								handleSubmit={handleSubmit}
								loading={loading}
							/>
						</Form>
					</Card.Body>
				</Card>
			</Row>
		</Container>
		// <div className='container-fluid d-flex justify-content-center'>
		// 	<div
		// 		className={`card mt-5 rounded-4 shadow ${styles['max-width-500']}`}
		// 	>
		// 		<Form className='card-body'>
		// 			<div className='d-flex justify-content-between'>
		// 				<h4 className='fw-normal'>Opprett ny bruker</h4>
		// 				<MainLogo height={64} />
		// 			</div>
		// 			<div>
		// 				<SignupInputfields user={user} setUser={setUser} />
		// 				<SignupCompany
		// 					orgNu={orgNu}
		// 					setOrgNu={setOrgNu}
		// 					fetchedCompany={fetchedCompany}
		// 				/>
		// 				<SignupReadOnlyCheckbox user={user} setUser={setUser} />

		// 				{error && (
		// 					<div className='alert alert-danger mt-3 mw-450'>
		// 						{error}
		// 					</div>
		// 				)}
		// 				{signupError && (
		// 					<div className='alert alert-danger mt-3 mw-450'>
		// 						{signupError}
		// 					</div>
		// 				)}
		// 			</div>
		// 			<SignupButtons
		// 				handleSubmit={handleSubmit}
		// 				loading={loading}
		// 			/>
		// 		</Form>
		// 	</div>
		// </div>
	)
}

export default Signup
