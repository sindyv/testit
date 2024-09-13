import React, { useEffect, useState } from "react"
import InputFieldControlled from "../../UI/InputFieldControlled"
import { useNavigate } from "react-router-dom"
import useFormSubmit from "../../../hooks/useFormSubmit"
import styles from "./SignupNewCompany.module.css"
import { MainLogo } from "../../../assets/svg/MainLogo"
function SignupNewCompany() {
	const [viewList, setViewList] = useState(false)
	const [query, setQuery] = useState("")
	const [data, setData] = useState([])
	const navigate = useNavigate()

	const {
		formDataOverride,
		formData,
		handleInput,
		handleSubmit,
		error,
		loading,
	} = useFormSubmit({
		companyName: "",
		streetname: "",
		streetnu: "",
		orgNu: "",
		city: "",
		postnu: "",
		website: "",
	})

	const handleQuery = (query) => {
		setQuery(query.target.value)
		handleInput(query)
	}

	const fetchCompanies = async (query) => {
		try {
			const response = await fetch(
				`https://data.brreg.no/enhetsregisteret/api/enheter?navn=${query}`
			)

			if (!response.ok) {
				throw Error("Failed to fetch data")
			}

			const data = await response.json()

			setData(data._embedded.enheter)
		} catch (error) {}
	}

	const populateFields = (company) => {
		const adresse = company.forretningsadresse.adresse[0].split(" ")
		const gatenummer = adresse[adresse.length - 1]
		let gatenavn = adresse
			.slice(0, adresse.length - 1)
			.toString()
			.replaceAll(",", " ")

		const newData = {
			companyName: company.navn,
			streetname: gatenavn,
			streetnu: gatenummer,
			orgNu: company.organisasjonsnummer,
			city: company.forretningsadresse.poststed,
			postnu: company.forretningsadresse.postnummer,
			website: company.hjemmeside,
		}

		formDataOverride(newData)
		setViewList(false)

		setQuery("")
	}

	useEffect(() => {
		const timer = setTimeout(() => {
			if (query.length > 3) {
				setViewList(true)
				fetchCompanies(query)
			} else {
				setData([])
			}
		}, 1000)
		return () => clearTimeout(timer)
	}, [query])
	return (
		<div className="container-fluid d-flex justify-content-center">
			<div
				className={`my-5 card ${styles["max-width-500"]}`}
				id="add-external-company"
			>
				<div className="card-body">
					<div className="d-flex justify-content-between">
						<h4 className="fw-normal">Opprett ny bedrift</h4>
						<MainLogo height={64} />
					</div>
					<div>
						<div className="d-flex">
							<div className="flex-fill ">
								<InputFieldControlled
									className={"mb-3 m-2"}
									type={"text"}
									id={"companyName"}
									label={"Navn på bedrift"}
									data={formData?.companyName ?? ""}
									setData={handleQuery}
								/>
								{/* Dropdown with suggestions */}
								{data.length > 0 && viewList && (
									<ul
										className="list-group position-absolute"
										style={{
											zIndex: 1000,
										}}
									>
										{data.map((company) => (
											<li
												key={company.organisasjonsnummer}
												className="list-group-item list-group-item-action"
												onClick={() => populateFields(company)}
											>
												{company.navn}
											</li>
										))}
									</ul>
								)}
							</div>
							<InputFieldControlled
								className={"mb-3 flex-fill m-2"}
								type={"email"}
								id={"email"}
								label={"E-post"}
								data={formData?.email}
								setData={handleInput}
							/>
						</div>
						<div className="d-flex">
							<InputFieldControlled
								className={"mb-3 flex-fill m-2"}
								type={"text"}
								id={"orgnr"}
								label={"Organisasjonsnummer"}
								data={formData?.orgNu}
								setData={handleInput}
							/>
							<InputFieldControlled
								className={"mb-3 flex-fill m-2"}
								type={"text"}
								id={"street"}
								label={"Gatenavn"}
								data={formData?.streetname}
								setData={handleInput}
							/>
						</div>
						<div className="d-flex">
							<InputFieldControlled
								className={"mb-3 flex-fill m-2"}
								type={"text"}
								id={"streetnu"}
								label={"Gatenummer"}
								data={formData?.streetnu}
								setData={handleInput}
							/>
							<InputFieldControlled
								className={"mb-3 flex-fill m-2"}
								type={"text"}
								id={"postal"}
								label={"Postnummer"}
								data={formData?.postnu}
								setData={handleInput}
							/>
							<InputFieldControlled
								className={"mb-3 flex-fill m-2"}
								type={"text"}
								id={"city"}
								data={formData?.city}
								setData={handleInput}
								label={"By"}
							/>
						</div>
					</div>
					<div className="mb-3">
						<p className="fw-medium">Ekstern bedrift?</p>
						<div className="form-check form-switch ms-3">
							<input
								className="form-check-input"
								type="checkbox"
								role="switch"
								id="flexSwitchCheckDefault"
							/>
							<label
								className="form-check-label"
								htmlFor="flexSwitchCheckDefault"
							>
								Din bedrift bare skal ha <strong>innsyn</strong> i andre
								bedrifters prosjekter, og betaler ingen kostnad.
							</label>
						</div>
					</div>
					<div className="d-flex flex-row gap-2">
						<button
							className="btn btn-primary"
							type="submit"
							onClick={handleSubmit}
						>
							Legg til
						</button>
						<button
							className="btn btn-warning"
							onClick={() => navigate(-1)}
							role="button"
						>
							Tilbake
						</button>
					</div>
					{error && <div className="alert alert-danger mt-3">{error}</div>}
				</div>
			</div>
		</div>
	)
}

export default SignupNewCompany
