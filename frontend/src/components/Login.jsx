import { useState } from 'react'
import useLogin from '../hooks/useLogin'
const Login = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const { login, loading, error } = useLogin()
	const handleSubmit = async (e) => {
		e.preventDefault()

		login(email, password)
	}

	return (
		<div className="container-sm mt-5" style={{ width: '24rem' }}>
			<div className="card shadow">
				<div className="card-body">
					<h5 className="card-title">Login</h5>
					<form onSubmit={handleSubmit}>
						<div className="mb-3">
							<label
								htmlFor="exampleInputEmail1"
								className="form-label"
							>
								Email address
							</label>
							<input
								value={email}
								type="email"
								className="form-control"
								id="exampleInputEmail1"
								aria-describedby="emailHelp"
								onChange={(e) => setEmail(e.target.value)}
							/>
							<div id="emailHelp" className="form-text">
								We'll never share your email with anyone else.
							</div>
						</div>
						<div className="mb-3">
							<label
								htmlFor="exampleInputPassword1"
								className="form-label"
							>
								Password
							</label>
							<input
								value={password}
								type="password"
								className="form-control"
								id="exampleInputPassword1"
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>

						<button
							disabled={loading}
							type="submit"
							className="btn btn-primary"
						>
							Login
						</button>
						{error && (
							<div className="alert alert-danger mt-3">
								{error}
							</div>
						)}
					</form>
				</div>
			</div>
		</div>
	)
}

export default Login
