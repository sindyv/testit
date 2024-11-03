import Card from "../../../UI/Card"
import { useNavigate } from "react-router-dom"

function System() {
	const navigate = useNavigate()
	return (
		<Card
			title={"+C=320.001"}
			className={"mt-3"}
			addbutton={() => navigate("add")}
		>
			<table className='table'>
				<thead>
					<tr>
						<th scope='col' className={``}>
							Navn
						</th>
						<th scope='col'>Type</th>
						<th scope='col'>Status</th>
						<th scope='col'>Fremdrift</th>
						<th scope='col'>Opprettet</th>
					</tr>
				</thead>
				<tbody></tbody>
			</table>
		</Card>
	)
}

export default System
