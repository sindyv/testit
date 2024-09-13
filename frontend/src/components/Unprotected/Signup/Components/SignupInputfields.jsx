import InputFieldControlled from "../../../UI/InputFieldControlled"
function SignupInputfields({ user, setUser }) {
	return (
		<>
			<div className="d-flex">
				<InputFieldControlled
					className={"mb-3 flex-fill m-2"}
					type={"text"}
					id={"firstName"}
					label={"Fornavn"}
					data={user.firstName}
					setData={setUser}
				/>
				<InputFieldControlled
					className={"mb-3 flex-fill m-2"}
					type={"text"}
					id={"lastName"}
					label={"Etternavn"}
					data={user.lastName}
					setData={setUser}
				/>
			</div>
			<div className="d-flex">
				<InputFieldControlled
					className={"mb-3 flex-fill m-2"}
					type={"email"}
					id={"email"}
					label={"E-post"}
					data={user.email}
					setData={setUser}
				/>
				<InputFieldControlled
					className={"mb-3 flex-fill m-2"}
					type={"text"}
					id={"mobile"}
					label={"Mobil"}
					data={user.mobile}
					setData={setUser}
				/>
			</div>
			<div className="d-flex">
				<InputFieldControlled
					className={"mb-3 flex-fill m-2"}
					type={"password"}
					id={"password"}
					label={"Passord"}
					data={user.password}
					setData={setUser}
				/>
				<InputFieldControlled
					className={"mb-3 flex-fill m-2"}
					type={"password"}
					id={"repeatPassword"}
					label={"Gjenta passord"}
					data={user.repeatPassword}
					setData={setUser}
				/>
			</div>
		</>
	)
}

export default SignupInputfields
