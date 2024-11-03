import React from "react"
import { Card, Row, Form, Stack, Button, Col } from "react-bootstrap"
import { useAddChecklistContext } from "../../../../../../../hooks/useAddChecklistContext"

function ChecklistData({ register }) {
	const ctxChecklist = useAddChecklistContext()
	return (
		<Card className='mt-3'>
			<Card.Body>
				<Row className=''>
					<Col>
						<Card.Title>Opprett sjekkliste</Card.Title>
					</Col>
					<Col className='justify-content-end d-flex gap-2'>
						<Button size='sm' variant='outline-danger'>
							Avbryt
						</Button>
						<Button size='sm' variant='success' type='submit'>
							Lagre
						</Button>
					</Col>
				</Row>
				<Stack direction='horizontal' className='gap-3'>
					<div className='w-100'>
						<Form.Label htmlFor='email'>Testnavn</Form.Label>
						<Form.Control
							{...ctxChecklist.register("name")}
							placeholder='Eks. "Test av stikkontakter 2.etg"'
						/>
					</div>
					<div className='w-100'>
						<Form.Label htmlFor='password'>Kort beskrivelse</Form.Label>
						<Form.Control
							{...ctxChecklist.register("description")}
							placeholder='En kort beskrivelse som vises oversikten'
						/>
					</div>
				</Stack>
				<Stack direction='horizontal' className='gap-3 mt-3 align-items-start'>
					<div className='w-100'>
						<Form.Label htmlFor='email'>System</Form.Label>
						<Form.Select {...ctxChecklist.register("system")}>
							<option>+A=310.001</option>
						</Form.Select>
					</div>
					<div className='w-100'>
						<Form.Label htmlFor='email'>Testbeskrivelse</Form.Label>
						<Form.Control
							as='textarea'
							placeholder='Legg om ønskelig inn en litt lengre beskrivelse her...'
							{...ctxChecklist.register("longDescription")}
							style={{ height: "100px" }}
						></Form.Control>
					</div>
				</Stack>
			</Card.Body>
		</Card>
	)
}

export default ChecklistData
