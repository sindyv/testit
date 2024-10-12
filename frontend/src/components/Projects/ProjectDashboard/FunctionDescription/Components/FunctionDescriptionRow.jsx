import React from 'react'
import ThreeDotsDropdown from '../../../../UI/ThreeDotsDropdown'
import filesAPI from '../../../../../resources/filesAPI'

function FunctionDescriptionRow({ file, mutation }) {
	const userMenu = [
		{
			title: 'Last ned',
			function: async () => {
				filesAPI.downloadFile(file.company, file._id)
			},
		},
		{
			title: file.approved
				? 'Sett som ikke godkjent'
				: 'Sett som godkjent',
			function: () => {
				file.approved = !file.approved
				mutation.mutate(file)
			},
		},
	]
	return (
		<tr>
			<td>
				<div>{`${file.system.systemLocation.name}=${file.system.systemCode.name}.${file.system.systemNumber}`}</div>
				<div className='fs-7 fw-normal'>{file.system.description}</div>
			</td>
			<td>
				<div className='my-2 d-flex justify-content-between'>
					<span className='me-3'>
						{file.approved ? (
							<span className='badge text-bg-success fw-medium'>
								Godkjent
							</span>
						) : (
							<span className='badge text-bg-warning fw-medium'>
								Ikke godkjent
							</span>
						)}
					</span>

					<span>
						<ThreeDotsDropdown menuItems={userMenu} />
					</span>
				</div>
			</td>
		</tr>
	)
}

export default FunctionDescriptionRow
