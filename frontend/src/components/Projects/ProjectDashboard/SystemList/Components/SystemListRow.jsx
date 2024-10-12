import React from 'react'
import { Link } from 'react-router-dom'
import ThreeDotsDropdown from '../../../../UI/ThreeDotsDropdown'

function SystemListRow({ system }) {
	return (
		<tr>
			<td>
				<div>
					<Link to='123'>{`${system.systemLocation.name}=${system.systemCode.name}.${system.systemNumber}`}</Link>
				</div>
				<div className='fs-7 fw-normal'>{system.description}</div>
			</td>
			<td className='py-3 d-flex gap-2'>
				<span className='badge text-bg-light fw-medium fs-6'>
					Sindre
				</span>
				<span className='badge text-bg-light fw-medium fs-6'>Egil</span>
				<span className='badge text-bg-light fw-medium fs-6'>
					Jakob
				</span>
			</td>
			<td className='py-3'>
				<span className='me-3'>
					<span className='badge text-bg-info fw-medium'>
						Ikke startet
					</span>
				</span>
			</td>
			<td className='py-3'>
				<div className='d-flex justify-content-between'>
					<span className='mx-3'>1</span>
					<span>
						<ThreeDotsDropdown />
					</span>
				</div>
			</td>
		</tr>
	)
}

export default SystemListRow
