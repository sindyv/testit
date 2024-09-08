import { useEffect, useState } from 'react'
import useLogin from '../hooks/useLogin'
import { Link, useNavigate } from 'react-router-dom'
import { MainLogo } from '../assets/svg/MainLogo.jsx'

import { useAuthContext } from '../hooks/useAuthContext'
const Login = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const { login, loading, error } = useLogin()
	const navigate = useNavigate()
	const { user } = useAuthContext()

	useEffect(() => {
		if (user) {
			navigate('/')
		}
	}, [])

	const handleSubmit = async (e) => {
		e.preventDefault()

		const user = await login(email, password)

		if (user) {
			navigate('/')
		}
	}

	return (
		<div className='container-fluid d-flex align-items-center justify-content-center mt-5'>
			<div style={{ width: '24rem' }}>
				<div className='card shadow rounded-4'>
					<div className='card-body'>
						<div className='d-flex flex-column justify-content-center align-items-center'>
							<div className='mb-3 mt-1'>
								<MainLogo />
							</div>
							<h5 className='card-title fw-normal'>Innlogging</h5>
						</div>
						<form onSubmit={handleSubmit}>
							<div className='mb-3'>
								<label
									htmlFor='exampleInputEmail1'
									className='form-label'
								>
									Epost
								</label>
								<input
									value={email}
									type='email'
									className='form-control'
									id='exampleInputEmail1'
									aria-describedby='emailHelp'
									onChange={(e) => setEmail(e.target.value)}
								/>
							</div>
							<div className='mb-3'>
								<label
									htmlFor='exampleInputPassword1'
									className='form-label'
								>
									Passord
								</label>
								<input
									value={password}
									type='password'
									className='form-control'
									id='exampleInputPassword1'
									onChange={(e) =>
										setPassword(e.target.value)
									}
								/>
							</div>
							<div className='d-flex'>
								<button
									disabled={loading}
									type='submit'
									className='btn btn-primary flex-fill'
								>
									Login
								</button>
							</div>
							<hr />
							<div className='d-flex'>
								<p className='fw-lighter'>
									Har du ikke en konto enda?{' '}
									<Link
										to={'/signup'}
										className='text-primary'
									>
										Lag en her!
									</Link>
								</p>
							</div>
							{error && (
								<div className='alert alert-danger mt-3'>
									{error}
								</div>
							)}
						</form>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Login
