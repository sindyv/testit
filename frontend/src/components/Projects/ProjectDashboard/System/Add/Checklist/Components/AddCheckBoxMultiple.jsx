import { Stack, Form } from "react-bootstrap"

function AddCheckBoxMultiple({ register }) {
	return (
		<Stack direction='horizontal' className='gap-3 mt-2'>
			<div className='w-100'>
				<Form.Label htmlFor='email'>Spørsmål</Form.Label>
				<Form.Control
					{...register("question")}
					placeholder='Eks. "Kontrollert spenning i stikkontakt"'
				/>
			</div>
		</Stack>
	)
}

export default AddCheckBoxMultiple
