import React from 'react'
import SystemTests from './Components/SystemTests'
import IntegratedTests from './Components/IntegratedTests'
import { Link } from 'react-router-dom'
import Deviations from './Components/Deviations'

function ProjectDashboard() {
	return (
		<div className='d-flex flex-column gap-4 mt-3'>
			<Deviations />
			<SystemTests />
			<IntegratedTests />
		</div>
	)
}

export default ProjectDashboard
