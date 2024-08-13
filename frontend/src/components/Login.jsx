import { useEffect, useState } from 'react'
import useLogin from '../hooks/useLogin'
import { useNavigate } from 'react-router-dom'
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
				<div className='card shadow'>
					<div className='card-body'>
						<h5 className='card-title'>Login</h5>
						<form onSubmit={handleSubmit}>
							<div className='mb-3'>
								<label
									htmlFor='exampleInputEmail1'
									className='form-label'
								>
									Email address
								</label>
								<input
									value={email}
									type='email'
									className='form-control'
									id='exampleInputEmail1'
									aria-describedby='emailHelp'
									onChange={(e) => setEmail(e.target.value)}
								/>
								<div id='emailHelp' className='form-text'>
									We'll never share your email with anyone
									else.
								</div>
							</div>
							<div className='mb-3'>
								<label
									htmlFor='exampleInputPassword1'
									className='form-label'
								>
									Password
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

							<button
								disabled={loading}
								type='submit'
								className='btn btn-primary'
							>
								Login
							</button>
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
