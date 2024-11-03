import React from "react"
import { useNavigate } from "react-router-dom"
import { Card, Container, Row, Col, Button } from "react-bootstrap"

function AddChecklist() {
	const navigate = useNavigate()
	return (
		<Container className='mt-5'>
			<Row>
				<Col className='d-flex' lg={4}>
					<Card>
						<Card.Body className='d-flex flex-column justify-content-between'>
							<Row>
								<Card.Title>
									<h2 className='d-inline me-3'>#1</h2>Sjekkliste
								</Card.Title>
								<Card.Text>
									<Row>
										<Col>
											Opprett en sjekkliste for kontroll av ditt system.
											Sjekklisten kan inneholde grupper med :
											<ul>
												<li>Sjekkbokser</li>
												<li>Nedtrekksvalg</li>
												<li>Flervalg</li>
											</ul>
										</Col>
									</Row>
								</Card.Text>
							</Row>
							<Row>
								<Col>
									<Button
										variant='outline-primary'
										onClick={() => navigate("checklist")}
									>
										Opprett
									</Button>
								</Col>
							</Row>
						</Card.Body>
					</Card>
				</Col>
				<Col className='d-flex mt-3 mt-lg-0' lg={4}>
					<Card>
						<Card.Body className='d-flex flex-column justify-content-between'>
							<Row>
								<Card.Title>
									<h2 className='d-inline me-3'>#2</h2>Test med protokoll (ett
									system)
								</Card.Title>
								<Card.Text>
									<Row>
										<Col>
											Dette testskjema er for funksjonstester med testprosedyre,
											og er beregnet for unike systemer. Testprosedyren
											beskrives i steg med handling og akseptkriterie, og
											sjekkes av etter hvert steg.
										</Col>
									</Row>
								</Card.Text>
							</Row>
							<Row>
								<Col>
									<Button
										variant='outline-primary'
										onClick={() => navigate("single-system-test")}
									>
										Opprett
									</Button>
								</Col>
							</Row>
						</Card.Body>
					</Card>
				</Col>
				<Col className='d-flex mt-3 mt-lg-0' lg={4}>
					<Card>
						<Card.Body className='d-flex flex-column justify-content-between'>
							<Row>
								<Card.Title>
									<h2 className='d-inline me-3'>#3</h2>Test med protokoll (flere
									like system)
								</Card.Title>
								<Card.Text>
									<Row>
										<Col>
											Denne skjematypen likner <strong>#2</strong>, men er
											beregnet for test av flere identiske systmer med lik
											testprosedyre. Denne typen produserer en liste med
											systemer, som igjen inneholder flere sjekkpunkter.
										</Col>
									</Row>
								</Card.Text>
							</Row>
							<Row>
								<Col>
									<Button
										variant='outline-primary'
										onClick={() => navigate("multi-system-test")}
									>
										Opprett
									</Button>
								</Col>
							</Row>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	)
}

export default AddChecklist
