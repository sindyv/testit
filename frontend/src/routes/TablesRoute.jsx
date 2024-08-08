import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import useFetch from '../hooks/useFetch'

function TablesRoute() {
	const { user } = useAuthContext()
	const { data, error, isLoading } = useFetch('companies', user.token)
	if (isLoading) {
		return <p>Loading ...</p>
	}

	if (error) {
		return (
			<div className="alert alert-danger m-5">
				An error hass occured: {error}
			</div>
		)
	}

	return (
		<div>
			<p>Here are the companies</p>
			{data?.companies.length > 0
				? data.companies.map((company) => company.name)
				: null}
		</div>
	)
}

export default TablesRoute
