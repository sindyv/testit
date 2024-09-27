import { useForm } from 'react-hook-form'
import useGetUser from '../../../../hooks/useGetUser'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Button } from 'react-bootstrap'
function NewProjectInputs({ data, mutation }) {
	const { register, handleSubmit } = useForm({
		defaultValues: { projectName: 'Ditt prosjekt' },
	})
	const user = useGetUser()
	const onSubmit = (data) => {
		mutation.mutate({
			projectObject: {
				...data,
				users: [data.owner],
				company: user.company,
				createdBy: user.id,
			},
		})
	}
	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<Row className=' mt-3'>
				<Col md>
					<Form.Label htmlFor='projectName'>Prosjektnavn</Form.Label>
					<Form.Control
						id='projectName'
						{...register('projectName')}
					/>
				</Col>
				<Col md>
					<Form.Label htmlFor='projectDescription'>
						Beskrivelse
					</Form.Label>
					<Form.Control
						id='projectDescription'
						{...register('projectDescription')}
						placeholder='En enkel beskrivelse av prosjektet'
					/>
				</Col>
			</Row>
			<Row className='gy-2 mt-2'>
				<Col md='5'>
					<Form.Label htmlFor='address'>Adresse</Form.Label>
					<Form.Control id='address' {...register('address')} />
				</Col>
				<Col md='2'>
					<Form.Label htmlFor='postnu'>Postnr.</Form.Label>
					<Form.Control id='postnu' {...register('postnu')} />
				</Col>
				<Col md='5'>
					<Form.Label htmlFor='city'>By</Form.Label>
					<Form.Control id='city' {...register('city')} />
				</Col>
			</Row>
			<Row className='gy-2 mt-2'>
				<Col md>
					<Form.Label htmlFor='webhotel'>
						Adresse til webhotell
					</Form.Label>
					<Form.Control
						placeholder='http://'
						id='webhotel'
						{...register('webhotel')}
					/>
				</Col>
				<Col md>
					<Form.Label htmlFor='endDate'>Sluttdato</Form.Label>
					<Form.Control
						type='date'
						id='endDate'
						{...register('endDate')}
					/>
				</Col>
				<Col lg>
					<Form.Label htmlFor='owner'>Ansvarlig</Form.Label>
					<Form.Select id='owner' {...register('owner')}>
						{data.users.length > 0
							? data.users.map((user, index) => {
									return (
										<option value={user._id} key={user._id}>
											{user.firstName} {user.lastName}
										</option>
									)
							  })
							: null}
					</Form.Select>
				</Col>
			</Row>
			<Row className='mt-2'>
				<Col>
					<Button variant='primary' type='submit'>
						Opprett
					</Button>
				</Col>
			</Row>
		</Form>
	)
}

export default NewProjectInputs
