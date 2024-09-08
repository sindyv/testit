import InputFieldControlled from '../../../UI/InputFieldControlled'
import { Link } from 'react-router-dom'
function SignupCompany({ company, setCompany }) {
	return (
		<>
			<div className='d-flex'>
				<InputFieldControlled
					className={'mb-3 flex-fill m-2'}
					type={'text'}
					id={'company'}
					label={'Bedrift'}
					data={company}
					setData={setCompany}
				/>
			</div>
			<div>
				<p className='fw-light'>
					Finner du ikke din bedrift? Opprett den{' '}
					<Link to={'company/new'}>her</Link>
				</p>
			</div>
		</>
	)
}

export default SignupCompany
