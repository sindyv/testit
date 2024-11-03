import { Stack, Form, Button } from "react-bootstrap"
import { useState } from "react"
import SelectOption from "./SelectOption"
import { useAddChecklistContext } from "../../../../../../../hooks/useAddChecklistContext"

function AddCheckSelect({ register }) {
	const ctxChecklist = useAddChecklistContext()
	const [selectOptions, setSelectOptions] = useState([])
	const [selectOptionInput, setSelectOptionInput] = useState("")

	const handleSelectOptionInput = (e) => {
		setSelectOptionInput(e.target.value)
	}

	const handleAddSelectOption = () => {
		ctxChecklist.addSelectOption(selectOptionInput)
		setSelectOptionInput("")
	}

	return (
		<Stack>
			<Stack direction='horizontal' className='gap-3 mt-2'>
				<div className='w-100'>
					<Form.Label htmlFor='email'>Spørsmål</Form.Label>
					<Form.Control
						{...register("question")}
						placeholder='Eks. "Hvilket nettsystem er tilknyttet"'
					/>
				</div>
			</Stack>
			<Stack direction='horizontal' className='gap-3 mt-2 align-items-end'>
				<div className='flex-grow-1'>
					<Form.Label htmlFor='email'>Alternativ</Form.Label>
					<Form.Control
						onChange={handleSelectOptionInput}
						value={selectOptionInput}
						placeholder='Eks. "TN-nett"'
					/>
				</div>
				<Button
					variant='outline-success'
					onClick={() => handleAddSelectOption()}
				>
					Legg til alternativ
				</Button>
			</Stack>
			<Stack direction='horizontal' className='mt-2'>
				{ctxChecklist.selectOptions.length > 0 &&
					ctxChecklist.selectOptions.map((option) => (
						<SelectOption
							option={option}
							key={option.id}
							removeSelectOption={ctxChecklist.removeSelectOption}
						/>
					))}
			</Stack>
		</Stack>
	)
}

export default AddCheckSelect
