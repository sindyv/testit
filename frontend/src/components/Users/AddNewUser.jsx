import styles from './AddNewUser.module.css'
import ThreeDotsDropdown from '../UI/ThreeDotsDropdown'
import { Form } from 'react-router-dom'

function AddNewUser() {
	return (
		<div className={`card mt-5 rounded-4 shadow `}>
			<Form className='card-body'>
				<h3>Legg til bruker</h3>
				<p className='fw-light'>
					Brukere som registrerer seg under din bedrift legges til
					her. Her kan du velge å godjkenne eller underkjenne. Ved
					underkjennelse vil brukeren få beskjed om at forespørselen
					om å bli med i bedriften, ikke er godkjent.
				</p>
				<div>
					<div className='d-flex flex-row'>
						<table className='table'>
							<thead>
								<tr>
									<th scope='col'>Navn</th>
									<th scope='col'>E-post</th>
									<th scope='col'>Rolle</th>
									<th scope='col'></th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>Sindre Dyvik</td>
									<td>sindre.dyvik@ronning-el.no</td>
									<td className='ps-5'>
										<span className='badge text-bg-light'>
											<select
												className='form-select m-0'
												aria-label='Role'
												defaultValue={'Bruker'}
											>
												<option value={'0'}>
													Bruker
												</option>
												<option value='1'>
													Administrator
												</option>
												<option value='2'>Eier</option>
											</select>
										</span>
									</td>
									<td className='h-100'>
										<div className='my-2'>
											<button className='btn btn-success btn-sm'>
												Godkjenn
											</button>
											<button className=' ms-2 btn btn-danger btn-sm'>
												Underkjenn
											</button>
										</div>
									</td>
								</tr>
								<tr>
									<td>Jackob Jackobsen</td>
									<td>Jackob Jackobsen@ronning-el.no</td>
									<td className='ps-5'>
										<span className='badge text-bg-light'>
											<select
												className='form-select m-0'
												aria-label='Role'
												defaultValue={'Bruker'}
											>
												<option value={'0'}>
													Bruker
												</option>
												<option value='1'>
													Administrator
												</option>
												<option value='2'>Eier</option>
											</select>
										</span>
									</td>
									<td className='h-100'>
										<div className='my-2'>
											<button className='btn btn-success btn-sm'>
												Godkjenn
											</button>
											<button className='btn ms-2 btn-danger btn-sm'>
												Underkjenn
											</button>
										</div>
									</td>
								</tr>
								<tr>
									<td>Ole KRistensen</td>
									<td>ole.kristensen@ronning-el.no</td>
									<td className='ps-5'>
										<span className='badge text-bg-light'>
											<select
												className='form-select m-0'
												aria-label='Role'
												defaultValue={'Bruker'}
											>
												<option value={'0'}>
													Bruker
												</option>
												<option value='1'>
													Administrator
												</option>
												<option value='2'>Eier</option>
											</select>
										</span>
									</td>
									<td className='h-100'>
										<div className='my-2'>
											<button className='btn btn-success btn-sm'>
												Godkjenn
											</button>
											<button className='ms-2 btn btn-danger btn-sm'>
												Underkjenn
											</button>
										</div>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</Form>
		</div>
	)
}

export async function action({ request, params }) {
	const formData = await request.formData()
	const data = Object.fromEntries(formData)

	const { forname, surname, email, mobile, userRole, externalCompany } = data

	const result = await fetch(
		`${import.meta.env.VITE_DATABASE_URL}/users/new`,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				forname,
				surname,
				email,
				mobile,
				userRole,
				externalCompany,
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

export default AddNewUser
