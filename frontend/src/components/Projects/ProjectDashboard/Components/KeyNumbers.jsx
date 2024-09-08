import BuildingSvg from '../../../../assets/svg/BuildingSvg'
import ClipboardCheck from '../../../../assets/svg/ClipboardCheck'
import PersonVideo3 from '../../../../assets/svg/PersonVideo3'
import ClipboardX from '../../../../assets/svg/ClipboardX'
import Card from '../../../UI/Card'

function KeyNumbers() {
	return (
		<Card className={'flex-fill'} title={'Oversikt'}>
			<div className='d-flex flex-row justify-content-between'>
				<div className='card rounded-4 bg-light'>
					<div className='card-body flex-row d-flex align-items-center px-4 gap-3'>
						<BuildingSvg height='48' />

						<div className='d-flex flex-column align-items-center gap-0'>
							Systemer
							<h1>5</h1>
						</div>
					</div>
				</div>
				<div className='card rounded-4 bg-light'>
					<div className='card-body flex-row d-flex align-items-center px-4 gap-3'>
						<ClipboardCheck size='48' />

						<div className='d-flex flex-column align-items-center gap-0'>
							Fremdrift
							<h1>24%</h1>
						</div>
					</div>
				</div>
				<div className='card rounded-4 bg-light'>
					<div className='card-body flex-row d-flex align-items-center px-4 gap-3'>
						<ClipboardX size='48' />

						<div className='d-flex flex-column align-items-center gap-0'>
							Avvik
							<h1>9</h1>
						</div>
					</div>
				</div>
				<div className='card rounded-4 bg-light'>
					<div className='card-body flex-row d-flex align-items-center px-4 gap-3'>
						<PersonVideo3 size='48' />

						<div className='d-flex flex-column align-items-center gap-0'>
							Aktive brukere
							<h1>3</h1>
						</div>
					</div>
				</div>
			</div>
		</Card>
	)
}

export default KeyNumbers
