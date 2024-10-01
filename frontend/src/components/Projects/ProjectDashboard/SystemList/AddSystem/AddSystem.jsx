import { useState } from "react"
import Card from "../../../../UI/Card"
import Modals from "./Components/Modals"
import { Form, Row, Col, Button } from "react-bootstrap"
import InputField from "./Components/InputField"
import { useAddSystemContext } from "../../../../../hooks/useAddSystemContext"
function AddSystem() {
	const { context } = useAddSystemContext()
	const [showSysLocModal, setShowSysLocModal] = useState(false)
	const [showSysNumModal, setShowSysNumModal] = useState(false)
	const [userList, setUserList] = useState([])
	const [currentUser, setCurrentUser] = useState("")

	const onSubmit = (data) => {
		console.log(data)
	}

	const handleOpenSystemLocationModal = () => setShowSysLocModal(true)
	const handleOpenSystemNumberModal = () => setShowSysNumModal(true)

	const handleAddUser = () => {
		// get user object
		const [user] = context.users.filter((user) => user._id !== currentUser)
		if (user) {
			setUserList((prev) => [...prev, user])
		}
	}
	return (
		<Card title={"Legg til system"} className={"mt-3"}>
			<Form onSubmit={context.handleSubmit(onSubmit)}>
				<Row className="gy-3">
					<Col md>
						<InputField
							register={context.register}
							id={"systemLocation"}
							label={"Systemlokasjon"}
							onClickButton={handleOpenSystemLocationModal}
							selectData={[{ id: "+C", value: "+C" }]}
						/>
					</Col>
					<Col md>
						<InputField
							register={context.register}
							id={"systemNumber"}
							label={"Systemnummer"}
							onClickButton={handleOpenSystemNumberModal}
							selectData={[{ id: "320", value: "320" }]}
						/>
					</Col>
					<Col md className="align-self-end">
						<InputField
							register={context.register}
							id={"systemSubNumber"}
							label={"Løpenummer"}
						/>
					</Col>
				</Row>
				<Row className="mt-3">
					<Col md className="align-self-end">
						<InputField
							register={context.register}
							id={"systemDescription"}
							label={"Beskrivelse"}
						/>
					</Col>
					<Col className="align-self-end">
						{!context.query.isPending && !context.query.isError && (
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
									{...context.register("user")}
									onSelect={(e) => setCurrentUser([e.target.value])}
								>
									{context.users.map((data) => {
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
			/>
		</Card>
	)
}

export default AddSystem
