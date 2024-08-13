import React from 'react'
import { useMatches } from 'react-router-dom'

function Breadcrumbs() {
	let matches = useMatches()
	let crumbs = matches
		// first get rid of any matches that don't have handle and crumb
		.filter((match) => Boolean(match.handle?.crumb))
		// now map them into an array of elements, passing the loader
		// data to each one
		.map((match) => match.handle.crumb(match.data))

	return (
		<nav aria-label='breadcrumb'>
			<ol className='breadcrumb'>
				{crumbs.map((crumb, index) => (
					<li
						// className='breadcrumb-item active'
						aria-current='page'
						key={index}
					>
						<h1 className=''>{crumb}</h1>
					</li>
				))}
			</ol>
		</nav>
	)
}

export default Breadcrumbs
