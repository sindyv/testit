import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import Card from '../../../../UI/Card'
import Modals from './Components/Modals'
import { Form, Row, Col, Button } from 'react-bootstrap'
import InputField from './Components/InputField'
function AddSystem() {
	const [showSysLocModal, setShowSysLocModal] = useState(false)
	const [showSysNumModal, setShowSysNumModal] = useState(false)

	const queryClient = useQueryClient()
	// Mutations
	const mutation = useMutation({
		mutationFn: async (projectObject) =>
			projectsAPI.createProject(projectObject),
		onSuccess: (data) => {},
	})

	const { register, handleSubmit } = useForm({})

	const onSubmit = (data) => {
		console.log(data)
	}

	const handleOpenSystemLocationModal = () => setShowSysLocModal(true)
	const handleOpenSystemNumberModal = () => setShowSysNumModal(true)

	const handleAddUser = () => {}

	return (
		<Card title={'Legg til system'} className={'mt-3'}>
			<Form onSubmit={handleSubmit(onSubmit)}>
				<Row className='gy-3'>
					<Col md>
						<InputField
							register={register}
							id={'systemLocation'}
							label={'Systemlokasjon'}
							onClickButton={handleOpenSystemLocationModal}
							selectData={[{ id: '+C', value: '+C' }]}
						/>
					</Col>
					<Col md>
						<InputField
							register={register}
							id={'systemNumber'}
							label={'Systemnummer'}
							onClickButton={handleOpenSystemNumberModal}
							selectData={[{ id: '320', value: '320' }]}
						/>
					</Col>
					<Col md className='align-self-end'>
						<InputField
							register={register}
							id={'systemSubNumber'}
							label={'Løpenummer'}
						/>
					</Col>
				</Row>
				<Row className='mt-3'>
					<Col md className='align-self-end'>
						<InputField
							register={register}
							id={'systemDescription'}
							label={'Beskrivelse'}
						/>
					</Col>
					<Col className='align-self-end'>
						<InputField
							register={register}
							id={'systemUsers'}
							label={'Legg til brukere'}
							onClickButton={handleAddUser}
							selectData={[
								{ id: 'Sindre', value: 'Sindre Dyvik' },
								{ id: 'Ole', value: 'Ole Kristensen' },
							]}
						/>
					</Col>
				</Row>
				<Row className='mt-3 justify-content-end gy-3'>
					<Col md='6'>
						<ul className='list-group'>
							<li className='list-group-item'>Frank Jensen</li>
							<li className='list-group-item'>
								Jeremias Sakkariassen
							</li>
						</ul>
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
