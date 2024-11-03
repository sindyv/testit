import React, { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import filesAPI from "../../../../resources/filesAPI"
import { useAuthContext } from "../../../../hooks/useAuthContext"
import { useParams } from "react-router-dom"
import { toast } from "react-toastify"

const NewProjectDescription = ({ project }) => {
	const [files, setFiles] = useState([])
	const { user } = useAuthContext()
	const { register, handleSubmit, reset } = useForm({})
	const onDrop = useCallback((acceptedFiles) => {
		setFiles(acceptedFiles)
	}, [])
	const { projectId } = useParams()

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		multiple: false,
	})

	// Access the client
	const queryClient = useQueryClient()

	// Mutations
	const mutation = useMutation({
		mutationFn: async (formData) => {
			await filesAPI.uploadFile(formData)
		},
		onSettled: (data) => {
			// Reset form
			toast.success("Fil lastet opp ...")
			setFiles([])
			reset()
			// Invalidate and refetch
			queryClient.invalidateQueries({
				queryKey: ["files"],
			})
		},
		onError: (error) => {
			console.log(error)
			toast.error(mutation.error.message, {})
		},
	})

	const onSubmit = (data) => {
		const formData = new FormData()
		formData.append("systemId", data.system)
		formData.append("companyId", user.company)
		formData.append("userId", user.id)
		formData.append("description", data.description)
		formData.append("files", files[0])
		formData.append("projectId", projectId)
		formData.append("fileRelation", "functionDescription")

		mutation.mutate(formData)
		// Handle form submission here
	}

	return (
		<div className='container mt-3'>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className='mx-auto'
				style={{ maxWidth: "500px" }}
			>
				<div className='mb-3'>
					<select className='form-select m-0' {...register("system")}>
						{project.systems.map((system) => {
							return (
								<option
									key={system._id}
									value={system._id}
								>{`${system.systemLocation.name}=${system.systemCode.name}.${system.systemNumber}`}</option>
							)
						})}
					</select>
				</div>
				{/* <div className='mb-3'>
					<input
						{...register('description')}
						type='text'
						className='form-control'
						placeholder='Beskrivelse'
						required
					/>
				</div> */}
				<div
					{...getRootProps()}
					className={`mb-3 p-4 border rounded text-center ${
						isDragActive ? "border-primary bg-light" : "border-secondary"
					}`}
					style={{ cursor: "pointer" }}
				>
					<input {...getInputProps()} />
					{isDragActive ? (
						<p className='mb-0'>Slipp fil her</p>
					) : (
						<p className='mb-0'>
							Dra og slipp fil her, eller trykk for å velge
						</p>
					)}
				</div>
				{files.length > 0 && (
					<div className='mb-3'>
						<h6>Valgt fil:</h6>
						<ul className='list-group'>
							{files.map((file) => (
								<li key={file.name} className='list-group-item'>
									{file.name}
								</li>
							))}
						</ul>
					</div>
				)}
				<button type='submit' className='btn btn-primary'>
					Submit
				</button>
			</form>
		</div>
	)
}

export default NewProjectDescription
