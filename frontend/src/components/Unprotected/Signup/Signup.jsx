import { useEffect, useState } from "react"
import { useSignup } from "../../../hooks/useSignup"
import styles from "./Signup.module.css"
import { Form, useNavigate } from "react-router-dom"
import { MainLogo } from "../../../assets/svg/MainLogo"
import SignupCompany from "./Components/SignupCompany"
import SignupInputfields from "./Components/SignupInputfields"
import SignupButtons from "./Components/SignupButtons"

const Signup = () => {
	// States
	const [user, setUser] = useState({
		email: "",
		password: "",
		repeatPassword: "",
		firstName: "",
		lastName: "",
		mobile: "",
		passError: "",
	})
	const [error, setError] = useState(undefined)
	const [orgNu, setOrgNu] = useState({ orgNu: "" })
	const [fetchedCompany, setFetchedCompany] = useState("")

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
					throw Error("Failed to fetch data")
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
					setError("Passordene må være like")
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
		console.log(user)
		const signedUpUser = await signup(user, fetchedCompany)

		if (user) {
			navigate("/")
		}
	}

	return (
		<div className="container-fluid d-flex justify-content-center">
			<div className={`card mt-5 rounded-4 shadow ${styles["max-width-500"]}`}>
				<Form className="card-body">
					<div className="d-flex justify-content-between">
						<h4 className="fw-normal">Opprett ny bruker</h4>
						<MainLogo height={64} />
					</div>
					<div>
						<SignupInputfields user={user} setUser={setUser} />
						<SignupCompany
							orgNu={orgNu}
							setOrgNu={setOrgNu}
							fetchedCompany={fetchedCompany}
						/>
						{error && <div className="alert alert-danger mt-3">{error}</div>}
						{signupError && (
							<div className="alert alert-danger mt-3">{signupError}</div>
						)}
					</div>
					<SignupButtons handleSubmit={handleSubmit} />
				</Form>
			</div>
		</div>
	)
}

export default Signup
