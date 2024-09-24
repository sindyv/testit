import Modal from './Modal'
import { useForm } from 'react-hook-form'

function Modals() {
	const {
		register: regLocCode,
		handleSubmit: handleSubLocCode,
		reset: resetLocCode,
	} = useForm({})

	const {
		register: regSysCode,
		handleSubmit: handleSubSysCode,
		reset: resetSysCode,
	} = useForm({})
	const onSubmit = (data) => {
		console.log(data)
		resetLocCode()
		resetSysCode()
	}
	return (
		<>
			<Modal
				title={'Legg til systemlokasjon'}
				modalId={'systemLocationModal'}
				onSubmit={handleSubLocCode(onSubmit)}
			>
				<div className={'mb-3 flex-fill m-2'}>
					<label htmlFor={'locCode'} className='form-label'>
						Lokasjonskode
					</label>
					<input
						{...regLocCode('locCode')}
						className='form-control'
					/>
					<div className='form-text' id='basic-addon4'>
						Systemts lokasjonsprefix (f.eks +A)
					</div>
				</div>
				<div className={'mb-3 flex-fill m-2'}>
					<label htmlFor={'description'} className='form-label'>
						Beskrivelse
					</label>
					<input
						{...regLocCode('description')}
						className='form-control'
					/>
				</div>
			</Modal>

			<Modal
				title={'Legg til systemnummer'}
				modalId={'systemNumberModal'}
				onSubmit={handleSubSysCode(onSubmit)}
			>
				<div className={'mb-3 flex-fill m-2'}>
					<label htmlFor={'sysCode'} className='form-label'>
						Systemnummer
					</label>
					<input
						{...regSysCode('sysCode')}
						className='form-control'
					/>
					<div className='form-text' id='basic-addon4'>
						Systemnummer fra systemkodetabellen (f.eks 320, 350, 560
						etc)
					</div>
				</div>
				<div className={'mb-3 flex-fill m-2'}>
					<label htmlFor={'description'} className='form-label'>
						Beskrivelse
					</label>
					<input
						{...regSysCode('description')}
						className='form-control'
					/>
				</div>
			</Modal>
		</>
	)
}

export default Modals
