import { useEffect, useState } from "react"
import useLogin from "../hooks/useLogin"
import { Link, useNavigate } from "react-router-dom"
import { MainLogo } from "../assets/svg/MainLogo.jsx"
import ErrorToast from "./UI/ErrorToast.jsx"
import { useAuthContext } from "../hooks/useAuthContext"

import {
	Card,
	CardBody,
	Col,
	Container,
	Row,
	Stack,
	Form,
	Button,
} from "react-bootstrap"
const Login = () => {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const { login, loading, error } = useLogin()
	const navigate = useNavigate()
	const { user } = useAuthContext()

	// If there is a user, navigate to root route
	useEffect(() => {
		if (user) {
			navigate("/")
		}
	}, [])

	// Check login credentials. If login is succesfull, navigate to root route. If not, error will be shown
	const handleSubmit = async (e) => {
		e.preventDefault()

		const user = await login(email, password)

		if (user) {
			navigate("/")
		}
	}

	return (
		<Container fluid>
			<Row className='justify-content-center'>
				<Card style={{ width: "24rem" }} className='rounded-4 mt-5 shadow'>
					<Card.Body>
						<Stack className='align-items-center' gap='3'>
							<MainLogo />
							<h5 className='card-title fw-normal'>Innlogging</h5>
							<Form className='w-100' onSubmit={handleSubmit}>
								<div className='w-100'>
									<Form.Label htmlFor='email'>E-post adresse</Form.Label>
									<Form.Control
										type='email'
										value={email}
										id='email'
										aria-describedby='passwordHelpBlock'
										onChange={(e) => setEmail(e.target.value)}
									/>
								</div>
								<div className='w-100'>
									<Form.Label htmlFor='password'>Passord</Form.Label>
									<Form.Control
										type='password'
										id='password'
										value={password}
										onChange={(e) => setPassword(e.target.value)}
									/>
								</div>
								{error && (
									<ErrorToast>
										{error?.message || "En uventet feil oppstod"}
									</ErrorToast>
								)}
								<Stack className='mt-3'>
									<Button variant='primary' className='w-100' type='submit'>
										Logg inn
									</Button>
									<div className='w-100'>
										<hr />
									</div>
									<div className='w-100'>
										<p className='fw-lighter'>
											Har du ikke en konto enda?{" "}
											<Link to={"/signup"} className='text-primary'>
												Lag en her!
											</Link>
										</p>
									</div>
								</Stack>
							</Form>
						</Stack>
					</Card.Body>
				</Card>
			</Row>
		</Container>
	)
}

export default Login
