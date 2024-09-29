import Modal from "./Modal"
import { useForm } from "react-hook-form"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import projectsAPI from "../../../../../../resources/projectsAPI"
import Toast from "../../../../../UI/Toast"

function Modals({
	showSysLocModal,
	setShowSysLocModal,
	showSysNumModal,
	setShowSysNumModal,
	projectId,
}) {
	const {
		register: regLocCode,
		handleSubmit: handleSubLocCode,
		reset: resetLocCode,
	} = useForm()

	const {
		register: regSysCode,
		handleSubmit: handleSubSysCode,
		reset: resetSysCode,
	} = useForm()
	const onSubmit = (data) => {
		console.log(data)
		resetLocCode()
		resetSysCode()
		setShowSysLocModal(false)
		setShowSysNumModal(false)
	}
	// find query client
	const queryClient = useQueryClient()

	// mutations
	const mutation = useMutation({
		mutationFn: async (data) => projectsAPI.createSystemLocation(data),
		onSuccess: (data) => {
			queryClient.invalidateQueries({
				queryKey: [
					"projects",
					{
						query: {
							_id: projectId,
						},
					},
				],
			})
		},
	})

	const onSubmitNewLocCode = (data) => {
		mutation.mutate({ data, projectId })
		resetLocCode()
	}
	return (
		<>
			<Modal
				error={mutation.error}
				title={"Legg til systemlokasjon"}
				show={showSysLocModal}
				onSubmit={handleSubLocCode(onSubmitNewLocCode)}
				onClose={() => setShowSysLocModal(false)}
			>
				<div className={"mb-3 flex-fill m-2"}>
					<label htmlFor={"locCode"} className="form-label">
						Lokasjonskode
					</label>
					<input
						{...regLocCode("locCode")}
						className="form-control"
						placeholder="Systemts lokasjonsprefix (f.eks +A)"
					/>
				</div>
				<div className={"mb-3 flex-fill m-2"}>
					<label htmlFor={"description"} className="form-label">
						Beskrivelse
					</label>
					<input
						{...regLocCode("description")}
						className="form-control"
						placeholder="Beskrivelse av systemet"
					/>
				</div>
			</Modal>

			<Modal
				show={showSysNumModal}
				title={"Legg til systemnummer"}
				onSubmit={handleSubSysCode(onSubmit)}
				onClose={() => setShowSysNumModal(false)}
			>
				<div className={"mb-3 flex-fill m-2"}>
					<label htmlFor={"sysCode"} className="form-label">
						Systemnummer
					</label>
					<input
						{...regSysCode("sysCode")}
						className="form-control"
						placeholder="Systemnummer fra systemkodetabellen (f.eks 320, 350, 560 etc)"
					/>
				</div>
			</Modal>
		</>
	)
}

export default Modals
