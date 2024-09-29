import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { useState } from "react"
import projectsAPI from "../../../../../resources/projectsAPI"
import Card from "../../../../UI/Card"
import Modals from "./Components/Modals"
import { Form, Row, Col, Button } from "react-bootstrap"
import InputField from "./Components/InputField"
import { useParams } from "react-router-dom"
function AddSystem() {
	const [showSysLocModal, setShowSysLocModal] = useState(false)
	const [showSysNumModal, setShowSysNumModal] = useState(false)
	const [userList, setUserList] = useState([])
	const [currentUser, setCurrentUser] = useState("")
	const { projectId } = useParams()

	// Queries
	const { isPending, isError, data, error } = useQuery({
		queryKey: [
			"projects",
			{
				query: {
					_id: projectId,
				},
			},
		],
		queryFn: projectsAPI.fetchProjects,
	})

	// Make a 'users'-array
	const users = []

	if (!isPending && !isError) {
		data.projects[0].users.map((user) =>
			users.push({ value: `${user.firstName} ${user.lastName}`, id: user._id })
		)
	}

	const queryClient = useQueryClient()
	// Mutations
	const mutation = useMutation({
		mutationFn: async (projectObject) =>
			projectsAPI.createProject(projectObject),
		onSuccess: (data) => {},
	})

	const { register, handleSubmit, values } = useForm({})

	const onSubmit = (data) => {
		console.log(data)
	}

	const handleOpenSystemLocationModal = () => setShowSysLocModal(true)
	const handleOpenSystemNumberModal = () => setShowSysNumModal(true)

	const handleAddUser = () => {
		// get user object
		const [user] = users.filter((user) => user._id !== currentUser)
		if (user) {
			setUserList((prev) => [...prev, user])
		}
	}

	return (
		<Card title={"Legg til system"} className={"mt-3"}>
			<Form onSubmit={handleSubmit(onSubmit)}>
				<Row className="gy-3">
					<Col md>
						<InputField
							register={register}
							id={"systemLocation"}
							label={"Systemlokasjon"}
							onClickButton={handleOpenSystemLocationModal}
							selectData={[{ id: "+C", value: "+C" }]}
						/>
					</Col>
					<Col md>
						<InputField
							register={register}
							id={"systemNumber"}
							label={"Systemnummer"}
							onClickButton={handleOpenSystemNumberModal}
							selectData={[{ id: "320", value: "320" }]}
						/>
					</Col>
					<Col md className="align-self-end">
						<InputField
							register={register}
							id={"systemSubNumber"}
							label={"Løpenummer"}
						/>
					</Col>
				</Row>
				<Row className="mt-3">
					<Col md className="align-self-end">
						<InputField
							register={register}
							id={"systemDescription"}
							label={"Beskrivelse"}
						/>
					</Col>
					<Col className="align-self-end">
						{!isPending && !isError && (
							<>
								<Form.Label className="mb-3 d-flex justify-content-between align-items-end">
									Legg til brukere
									<Button
										size="sm"
										variant="outline-primary"
										onClick={handleAddUser}
									>
										+
									</Button>
								</Form.Label>
								<Form.Select
									{...register("user")}
									onClick={(e) => setCurrentUser([e.target.value])}
								>
									{users.map((data) => {
										return (
											<option key={data.id} id={data.id} value={data.id}>
												{data.value}
											</option>
										)
									})}
								</Form.Select>
							</>
						)}
					</Col>
				</Row>
				<Row className="mt-3 justify-content-end gy-3">
					<Col md="6">
						{userList.length > 0 && (
							<>
								<ul className="list-group">
									{userList.map((user) => (
										<li key={user.id} className="list-group-item">
											{user.value}
										</li>
									))}
								</ul>
							</>
						)}
					</Col>
				</Row>
				<Row className="mt-3">
					<Col>
						<Button type="submit">Lagre</Button>
					</Col>
				</Row>
			</Form>

			<Modals
				showSysLocModal={showSysLocModal}
				showSysNumModal={showSysNumModal}
				setShowSysLocModal={setShowSysLocModal}
				setShowSysNumModal={setShowSysNumModal}
				projectId={projectId}
			/>
		</Card>
	)
}

export default AddSystem
