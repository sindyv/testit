import { useNavigate } from "react-router-dom"

function SignupButtons({ handleSubmit }) {
	const navigate = useNavigate()
	return (
		<div className="m-2 d-flex gap-2">
			<button
				className="btn btn-primary px-4"
				onClick={(e) => {
					handleSubmit(e)
				}}
			>
				Registrer bruker
			</button>
			<button className="btn btn-warning" onClick={() => navigate(-1)}>
				Tilbake
			</button>
		</div>
	)
}

export default SignupButtons
