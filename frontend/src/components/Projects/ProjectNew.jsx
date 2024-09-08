import { Form, redirect, useLoaderData } from 'react-router-dom'
import InputField from '../UI/InputField'

const user = JSON.parse(localStorage.getItem('user'))

function ProjectNew() {
	const { users } = useLoaderData()

	return (
		<div className={`card mt-5 rounded-4 shadow `}>
			<div className='card-body'>
				<h3>Opprett prosjekt</h3>
				<Form method='post'>
					<div className='d-flex'>
						<InputField
							className={'mb-3 flex-fill m-2'}
							type={'text'}
							id={'name'}
							label={'Prosjektnavn'}
						/>
						<InputField
							className={'mb-3 flex-fill m-2'}
							type={'text'}
							id={'description'}
							label={'Beskrivelse'}
						/>
					</div>
					<div className='d-flex'>
						<InputField
							className={'mb-3 flex-fill m-2'}
							type={'text'}
							id={'streetName'}
							label={'Gatenavn'}
						/>
						<InputField
							className={'mb-3 flex-fill m-2'}
							type={'text'}
							id={'streetNumber'}
							label={'Gatenummer'}
						/>
						<InputField
							className={'mb-3 flex-fill m-2'}
							type={'text'}
							id={'postalCode'}
							label={'Postnummer'}
						/>
						<InputField
							className={'mb-3 flex-fill m-2'}
							type={'text'}
							id={'city'}
							label={'By'}
						/>
					</div>
					<div className='d-flex'>
						<InputField
							className={'mb-3 flex-fill m-2'}
							type={'text'}
							id={'webHotel'}
							label={'Adresse til webhotell'}
						/>
						<InputField
							className={'mb-3 flex-fill m-2'}
							type={'date'}
							id={'endDate'}
							label={'Sluttdato'}
						/>
						<div className='mb-3 m-2'>
							<label htmlFor={'role'} className='form-label'>
								Ansvarlig
							</label>

							<select
								className='form-select m-0'
								aria-label='ProjectOwner'
								defaultValue={users[0]._id}
								name='owner'
							>
								{users.length > 0
									? users.map((user) => {
											return (
												<option
													value={user._id}
													key={user._id}
												>
													{user.firstName}{' '}
													{user.lastName}
												</option>
											)
									  })
									: null}
							</select>
						</div>
					</div>
					<div>
						<button className='btn btn-primary'>Opprett</button>
					</div>
				</Form>
			</div>
		</div>
	)
}

export async function loader() {
	const response = await fetch(`${import.meta.env.VITE_DATABASE_URL}/users`, {
		headers: {
			Authorization: 'Bearer ' + user.token,
		},
	})

	if (!response.ok) {
		setError('There was an error fetching your data')
		return null
	}

	if (response.ok) {
		const json = await response.json()
		return json
	}
}
export async function action({ request, params }) {
	const formData = await request.formData()
	const data = Object.fromEntries(formData)

	const {
		name,
		description,
		streetName,
		streetNumber,
		postalCode,
		city,
		endDate,
		owner,
		webHotel,
	} = data

	console.log(Date(endDate))

	const result = await fetch(
		`${import.meta.env.VITE_DATABASE_URL}/projects/new`,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name,
				description,
				streetName,
				streetNumber,
				postalCode,
				city,
				company: user.company,
				users: [user.id],
				owner,
				webHotel,
				endDate,
			}),
		}
	)
	const resJson = await result.json()

	if (!result.ok) {
		throw new Error(resJson.message || 'Oh Noes!')
	} else {
		return redirect(`/projects`)
	}
}

export default ProjectNew
