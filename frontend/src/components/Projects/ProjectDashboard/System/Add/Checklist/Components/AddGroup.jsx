import { Card, Row, Form, Stack, Button, Col } from "react-bootstrap"
import { useAddChecklistContext } from "../../../../../../../hooks/useAddChecklistContext"

function AddGroup() {
	const ctxChecklist = useAddChecklistContext()
	return (
		<Card className='mt-3'>
			<Card.Body>
				<Row className=''>
					<Col>
						<Card.Title>Legg til gruppe</Card.Title>
					</Col>
					<Col className='justify-content-end d-flex gap-2'>
						<Button
							size='sm'
							variant='outline-success'
							type='submit'
							onClick={ctxChecklist.handleSubmit(ctxChecklist.addGroup)}
						>
							Legg til
						</Button>
					</Col>
				</Row>
				<Stack direction='horizontal' className='gap-3'>
					<div className='w-100'>
						<Form.Label htmlFor='email'>Gruppenavn</Form.Label>
						<Form.Control
							{...ctxChecklist.register("groupName")}
							placeholder='Eks. "Test av stikkontakter 2.etg"'
						/>
					</div>
					<div className='w-100'>
						<Form.Label htmlFor='password'>Gruppebeskrivelse</Form.Label>
						<Form.Control
							{...ctxChecklist.register("groupDescription")}
							placeholder='En kort beskrivelse som vises oversikten'
						/>
					</div>
				</Stack>
			</Card.Body>
		</Card>
	)
}

export default AddGroup
