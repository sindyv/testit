import React, { useState } from "react"
import { Card, Row, Form, Stack, Button, Col } from "react-bootstrap"
import AddCheckSelect from "./AddCheckSelect"
import AddCheckText from "./AddCheckText"
import AddCheckBoxMultiple from "./AddCheckBoxMultiple"
import AddCheckBox from "./AddCheckBox"
import { useAddChecklistContext } from "../../../../../../../hooks/useAddChecklistContext"

function AddChecks() {
	const ctxChecklist = useAddChecklistContext()
	const [checkType, setCheckType] = useState("check")

	const renderCheckType = () => {
		switch (checkType) {
			case "select":
				return <AddCheckSelect register={ctxChecklist.register} />
				break
			case "check":
				return <AddCheckBox register={ctxChecklist.register} />
				break
			case "checkMultiple":
				return <AddCheckBoxMultiple register={ctxChecklist.register} />
				break
			case "text":
				return <AddCheckText register={ctxChecklist.register} />
				break

			default:
				break
		}
	}

	return (
		<Card className='mt-3'>
			<Card.Body>
				<Row className=''>
					<Col>
						<Card.Title>Legg til sjekkpunkter</Card.Title>
					</Col>
					<Col className='justify-content-end d-flex gap-2'>
						<Button
							size='sm'
							variant='outline-success'
							type='submit'
							onClick={ctxChecklist.handleSubmit(ctxChecklist.addCheck)}
						>
							Legg til
						</Button>
					</Col>
				</Row>
				<Stack direction='horizontal' className='gap-3'>
					<div className='w-100'>
						<Form.Label htmlFor='email'>Gruppe</Form.Label>
						<Form.Select {...ctxChecklist.register("selectedGroup")}>
							{ctxChecklist.groups.map((group) => {
								return (
									<option key={group.name} value={group.name}>
										{group.name}
									</option>
								)
							})}
						</Form.Select>
					</div>
				</Stack>
				<Stack direction='horizontal' className='gap-3 mt-2'>
					<div className='w-100'>
						<Form.Label htmlFor='email'>Komponent</Form.Label>
						<Form.Control
							{...ctxChecklist.register("component")}
							placeholder='Eks. XQ001 - Hovedbryter'
						/>
					</div>
					<div className='w-100'>
						<Form.Label htmlFor='password'>Svartype</Form.Label>
						<Form.Select
							onChange={(e) => setCheckType(e.target.value)}
							defaultValue={checkType}
						>
							<option value={"select"}>Nedtrekksmeny</option>
							<option value={"check"}>Sjekkboks</option>
							<option value={"checkMultiple"}>Flere sjekkbokser</option>
							<option value={"text"}>Tekstsvar</option>
						</Form.Select>
					</div>
				</Stack>
				{renderCheckType()}
			</Card.Body>
		</Card>
	)
}

export default AddChecks
