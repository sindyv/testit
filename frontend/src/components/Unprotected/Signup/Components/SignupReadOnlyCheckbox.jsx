function SignupReadOnlyCheckbox({ user, setUser }) {
	return (
		<div className=' mx-2 my-4'>
			<p className='fw-bold'>Ekstern bedrift?</p>
			<div className='form-check form-switch ms-3'>
				<input
					className='form-check-input'
					checked={user.readOnly}
					type='checkbox'
					role='switch'
					id='readOnly'
					onChange={(e) =>
						setUser((prev) => ({
							...prev,
							readOnly: e.target.checked,
						}))
					}
				/>
				<label
					className='form-check-label'
					htmlFor='flexSwitchCheckDefault'
				>
					Din bedrift bare skal ha <strong>innsyn</strong> i andre
					bedrifters prosjekter, og betaler ingen kostnad.
				</label>
			</div>
		</div>
	)
}

export default SignupReadOnlyCheckbox
