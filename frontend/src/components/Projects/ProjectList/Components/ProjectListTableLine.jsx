import React from 'react'

import ThreeDotsDropdown from '../../../UI/ThreeDotsDropdown'

import styles from './ProjectList.module.css'
import { Link } from 'react-router-dom'

function ProjectListTableLine({ project, mutation }) {
	const handleActive = () => {
		project.deactivated = !project.deactivated
		console.log(project)
		mutation.mutate(project)
	}
	const handleStartStop = () => {
		project.started = !project.started
		mutation.mutate(project)
	}
	const handleCompleted = () => {
		project.completed = !project.completed
		mutation.mutate(project)
	}

	const userMenu = [
		{
			title: project?.deactivated ? 'Aktiver' : 'Deaktiver',
			function: handleActive,
		},
	]

	if (!project.completed) {
		userMenu.push({
			title: project?.started
				? 'Merk som "Ikke startet"'
				: 'Merk som "Pågår"',
			function: handleStartStop,
		})
	}

	if (project.started) {
		userMenu.push({
			title: project?.completed
				? 'Angre ferdigstillelse'
				: 'Merk som "Ferdigstilt"',
			function: handleCompleted,
		})
	}

	return (
		<tr>
			<td>
				<div>
					<div className='fw-medium'>
						<Link to={project._id}>
							{project.projectDescription}
						</Link>
					</div>
					<div className={`${styles.subtitle}`}>
						{project.address}
					</div>
				</div>
			</td>
			<td>{project.endDate.split('T')[0]}</td>
			<td className='d-none d-lg-block'>
				{project.users.map((user) => {
					return (
						<span
							key={user._id}
							className='badge text-bg-light fw-medium fs-6'
						>
							{user.firstName}
						</span>
					)
				})}
			</td>
			<td>
				{!project.started && (
					<span className='badge text-bg-info fw-medium fs-6'>
						Ikke startet
					</span>
				)}
				{project.started && !project.completed && (
					<span className='badge text-bg-warning fw-medium fs-6'>
						Pågår
					</span>
				)}
				{project.completed && project.started && (
					<span className='badge text-bg-success fw-medium fs-6'>
						Ferdig
					</span>
				)}
			</td>
			<td className='d-none d-md-block'>13/29</td>
			<td>
				<div className='d-flex justify-content-between'>
					<span>11</span>
					<span>
						<ThreeDotsDropdown menuItems={userMenu} />
					</span>
				</div>
			</td>
		</tr>
	)
}

export default ProjectListTableLine
