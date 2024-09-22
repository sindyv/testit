import React, { useState } from 'react'

function TableRow({ user, mutation }) {
	const [role, setRole] = useState('User')

	const handleApprove = () => {
		user.enabled = true
		user.role = role
		mutation.mutate(user)
	}

	return (
		<tr>
			<td>{`${user.firstName} ${user.lastName}`}</td>
			<td>{user.email}</td>
			<td className='ps-5'>
				<span className='badge text-bg-light'>
					<select
						className='form-select m-0'
						aria-label='Role'
						value={role}
						onChange={(e) => setRole(e.target.value)}
					>
						<option value='User'>Bruker</option>
						<option value='Administrator'>Administrator</option>
					</select>
				</span>
			</td>
			<td className='h-100'>
				<div className='my-2'>
					<button
						className='btn btn-success btn-sm'
						onClick={handleApprove}
					>
						Godkjenn
					</button>
					<button className=' ms-2 btn btn-danger btn-sm'>
						Underkjenn
					</button>
				</div>
			</td>
		</tr>
	)
}

export default TableRow
