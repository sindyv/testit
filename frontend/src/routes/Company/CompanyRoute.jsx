import React from 'react'
import Company from '../../components/Company/Company'
import { Outlet } from 'react-router-dom'
function CompanyRoute() {
	return (
		<>
			<Outlet />
		</>
	)
}

export default CompanyRoute
