import { Stack, Form } from "react-bootstrap"

function AddCheckText({ register }) {
	return (
		<Stack direction='horizontal' className='gap-3 mt-2'>
			<div className='w-100'>
				<Form.Label htmlFor='email'>Spørsmål</Form.Label>
				<Form.Control
					{...register("question")}
					placeholder='Eks. "Strømtrekk på merkeskilt"'
				/>
			</div>
			<div className='w-100'>
				<Form.Label htmlFor='email'>Ledetekst</Form.Label>
				<Form.Control
					{...register("questionPlaceholder")}
					placeholder='Ledetekst som vil stå i tekstfeltet som denne teksten'
				/>
			</div>
		</Stack>
	)
}

export default AddCheckText
