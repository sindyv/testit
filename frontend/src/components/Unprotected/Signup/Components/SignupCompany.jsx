import { useEffect, useState } from "react"
import InputFieldControlled from "../../../UI/InputFieldControlled"
function SignupCompany({ orgNu, setOrgNu, fetchedCompany }) {
	return (
		<>
			<div className="d-flex">
				<InputFieldControlled
					className={"mb-3 flex-fill m-2"}
					type={"number"}
					id={"orgNu"}
					label={"Bedrift (Org. nr)"}
					data={orgNu.orgNu}
					setData={setOrgNu}
				/>
			</div>
			<div className="mb-3 flex-fill m-2">
				<label htmlFor={fetchedCompany} className="form-label">
					Bedriftsnavn
				</label>
				<input
					value={fetchedCompany?.navn ?? ""}
					type="text"
					className="form-control"
					id={"fetchedCompany"}
					name={"fetchedCompany"}
					onChange={(e) => {}}
					disabled
				/>
			</div>
		</>
	)
}

export default SignupCompany
