import React from 'react'
import ThreeDotsDropdown from '../../../UI/ThreeDotsDropdown'
import useTranslateUserRole from '../../../../hooks/useTranslateUserRole'

function TableRow({ user, mutation }) {
	const handleDisable = () => {
		user.active = false
		mutation.mutate(user)
	}

	const handleEnable = () => {
		user.active = true
		mutation.mutate(user)
	}
	const userMenu = [
		{
			title: user?.active ? 'Deaktiver' : 'Aktiver',
			function: user?.active ? handleDisable : handleEnable,
		},
	]

	return (
		<tr>
			<td>{`${user.firstName} ${user.lastName}`}</td>
			<td>{useTranslateUserRole(user.role)}</td>
			<td className='ps-5'>
				<span className='badge text-bg-light'>
					{user.projects.length}
				</span>
			</td>
			<td className='d-flex justify-content-between'>
				{user?.active ? (
					<span className='badge text-bg-success d-flex justify-content-center align-items-center'>
						Aktiv
					</span>
				) : (
					<span className='badge text-bg-warning d-flex justify-content-center align-items-center'>
						Inaktiv
					</span>
				)}
				<span>
					<ThreeDotsDropdown menuItems={userMenu} />
				</span>
			</td>
		</tr>
	)
}

export default TableRow
