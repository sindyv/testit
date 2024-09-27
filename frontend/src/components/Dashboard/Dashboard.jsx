import styles from './Dashboard.module.css'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
function Dashboard() {
	return (
		<Container xs='auto'>
			<Card className='rounded-4 mt-5'>
				<Card.Body>
					<h4>Oversikt</h4>
					Velkommen! Du har ikke blitt registrert hos en bedrift enda.
					Be administratoren i din bedrift om å legge deg til. Hvis du
					ikke har en bedrift enda, vil dette opprettes, og du vil få
					en epost når dette er gjort!
				</Card.Body>
			</Card>
		</Container>
	)
}

export default Dashboard
