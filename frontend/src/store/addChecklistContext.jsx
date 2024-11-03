import { createContext, useState } from "react"
import { toast } from "react-toastify"
import { useForm } from "react-hook-form"

export const AddChecklistContext = createContext({
	groups: [],
	addGroup: () => {},
	register: {},
	handleSubmit: () => {},
	reset: () => {},
	addCheck: () => {},
	saveData: () => {},
	selectOptions: [],
	addSelectOption: () => {},
	removeSelectOption: () => {},
})

function AddChecklistContextProvider({ children }) {
	const [groups, setGroups] = useState([])
	const [selectOptions, setSelectOptions] = useState([])
	const [checks, setChecks] = useState([])
	const { handleSubmit, register, reset } = useForm()

	const addGroup = (data) => {
		setGroups((prev) => [
			...prev,
			{ name: data.groupName, description: data.groupDescription },
		])
		toast.success("Gruppe lagt til")
		reset()
	}

	const addCheck = (data) => {
		setChecks((prev) => {
			return [
				...prev,
				{
					id: crypto.randomUUID(),
					component: data.component,
					group: data.selectedGroup,
					question: data.question,
				},
			]
		})

		toast.success("Sjekkpunkt lagt til")
		reset()
	}

	const addSelectOption = (text) => {
		setSelectOptions((prev) => [...prev, { id: prev.length, optionText: text }])
	}

	const removeSelectOption = (id) => {
		setSelectOptions((prev) => {
			return prev.filter((option) => option.id !== id)
		})
	}

	const saveData = (data) => {
		console.log(data)
	}

	console.log(selectOptions)
	const value = {
		groups,
		addGroup,
		handleSubmit,
		register,
		reset,
		addCheck,
		saveData,
		selectOptions,
		addSelectOption,
		removeSelectOption,
	}

	return (
		<AddChecklistContext.Provider value={value}>
			{children}
		</AddChecklistContext.Provider>
	)
}

export default AddChecklistContextProvider
