import styles from './Dashboard.module.css'
function Dashboard() {
	return (
		<div className={`card mt-5 rounded-4 p-4`}>
			<div className='card-body'>
				<h4>Oversikt</h4>
				Velkommen! Du har ikke blitt registrert hos en bedrift enda. Be
				administratoren i din bedrift om å legge deg til. Hvis du ikke
				har en bedrift enda, vil dette opprettes, og du vil få en epost
				når dette er gjort!
			</div>
		</div>
	)
}

export default Dashboard
