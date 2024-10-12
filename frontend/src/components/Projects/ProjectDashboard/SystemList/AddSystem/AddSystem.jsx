import { useState } from 'react'
import Card from '../../../../UI/Card'
import Modals from './Components/Modals'
import { Form, Row, Col, Button } from 'react-bootstrap'
import InputField from './Components/InputField'
import { useAddSystemContext } from '../../../../../hooks/useAddSystemContext'
import Toast from '../../../../UI/Toast'
function AddSystem() {
	const { context } = useAddSystemContext()
	const [showSysLocModal, setShowSysLocModal] = useState(false)
	const [showSysNumModal, setShowSysNumModal] = useState(false)
	const [userList, setUserList] = useState([])

	const handleOpenSystemLocationModal = () => setShowSysLocModal(true)
	const handleOpenSystemNumberModal = () => setShowSysNumModal(true)

	if (context.query.isPending) {
		return
	}

	return (
		<Card title={'Legg til system'} className={'mt-3'}>
			<Form onSubmit={context.handleSubmit(context.onSubmit)}>
				<Row className='gy-3'>
					<Col md>
						<InputField
							register={context.register}
							id={'systemLocation'}
							label={'Systemlokasjon'}
							onClickButton={handleOpenSystemLocationModal}
							selectData={context.systemLocations}
						/>
					</Col>
					<Col md>
						<InputField
							register={context.register}
							id={'systemCode'}
							label={'Systemnummer'}
							onClickButton={handleOpenSystemNumberModal}
							selectData={context.systemCodes}
						/>
					</Col>
					<Col md className='align-self-end'>
						<InputField
							register={context.register}
							id={'systemNumber'}
							label={'Løpenummer'}
						/>
					</Col>
				</Row>
				<Row className='mt-3'>
					<Col md className='align-self-end'>
						<InputField
							register={context.register}
							id={'description'}
							label={'Beskrivelse'}
						/>
					</Col>
					{/* <Col className='align-self-end'>
						{!context.query.isPending && !context.query.isError && (
							<>
								<Form.Label className='mb-3 d-flex justify-content-between align-items-end'>
									Legg til brukere
									<Button
										size='sm'
										variant='outline-primary'
										onClick={handleAddUser}
									>
										+
									</Button>
								</Form.Label>
								<Form.Select
									{...context.register('user')}
									onSelect={(e) =>
										setCurrentUser([e.target.value])
									}
								>
									{context.users.map((data) => {
										return (
											<option
												key={data.id}
												id={data.id}
												value={data.id}
											>
												{data.value}
											</option>
										)
									})}
								</Form.Select>
							</>
						)}
					</Col> */}
				</Row>
				<Row className='mt-3 justify-content-end gy-3'>
					<Col md='6'>
						{userList.length > 0 && (
							<>
								<ul className='list-group'>
									{userList.map((user) => (
										<li
											key={user.id}
											className='list-group-item'
										>
											{user.value}
										</li>
									))}
								</ul>
							</>
						)}
					</Col>
				</Row>
				<Row className='mt-3'>
					<Col>
						<Button type='submit'>Lagre</Button>
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
