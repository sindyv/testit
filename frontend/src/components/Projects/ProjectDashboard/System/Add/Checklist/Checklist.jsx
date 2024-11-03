import React from "react"
import { Form } from "react-bootstrap"
import ChecklistData from "./Components/ChecklistData"
import AddGroup from "./Components/AddGroup"
import AddChecks from "./Components/AddChecks"
import { useAddChecklistContext } from "../../../../../../hooks/useAddChecklistContext"

function Checklist() {
	const ctxChecklist = useAddChecklistContext()

	return (
		<Form
			className='w-100'
			onSubmit={ctxChecklist.handleSubmit(ctxChecklist.saveData)}
		>
			<ChecklistData />
			<AddGroup />
			<AddChecks />
		</Form>
	)
}

export default Checklist
