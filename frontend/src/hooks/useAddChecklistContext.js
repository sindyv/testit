import { AddChecklistContext } from "../store/addChecklistContext"
import { useContext } from "react"

export const useAddChecklistContext = () => {
	const context = useContext(AddChecklistContext)

	if (!context) {
		throw Error("Please only use hook within context provider")
	}

	return context
}
