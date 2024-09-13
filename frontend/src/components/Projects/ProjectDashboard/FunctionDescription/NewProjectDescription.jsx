import React, { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

const NewProjectDescription = () => {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [files, setFiles] = useState([])

	const onDrop = useCallback((acceptedFiles) => {
		setFiles(acceptedFiles)
	}, [])

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
	})

	const handleSubmit = (e) => {
		e.preventDefault()
		console.log('Submitted:', { name, email, files })
		// Handle form submission here
	}

	return (
		<div className='container mt-3'>
			<form
				onSubmit={handleSubmit}
				className='mx-auto'
				style={{ maxWidth: '500px' }}
			>
				<div className='mb-3'>
					{/* <input
						type='text'
						className='form-control'
						value={name}
						onChange={(e) => setName(e.target.value)}
						placeholder='Name'
						required
					/> */}
					<select
						className='form-select m-0'
						aria-label='Role'
						defaultValue={'Bruker'}
					>
						<option value={'0'}>=360.001</option>
						<option value='1'>=360.002</option>
						<option value='2'>=320.001</option>
					</select>
				</div>
				<div className='mb-3'>
					<input
						type='text'
						className='form-control'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder='Beskrivelse'
						required
					/>
				</div>
				<div
					{...getRootProps()}
					className={`mb-3 p-4 border rounded text-center ${
						isDragActive
							? 'border-primary bg-light'
							: 'border-secondary'
					}`}
					style={{ cursor: 'pointer' }}
				>
					<input {...getInputProps()} />
					{isDragActive ? (
						<p className='mb-0'>Drop the files here ...</p>
					) : (
						<p className='mb-0'>
							Drag 'n' drop some files here, or click to select
							files
						</p>
					)}
				</div>
				{files.length > 0 && (
					<div className='mb-3'>
						<h6>Uploaded files:</h6>
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
