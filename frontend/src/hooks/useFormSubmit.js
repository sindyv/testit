import { useEffect, useState } from 'react'
import { useAuthContext } from './useAuthContext'
import { useNavigate } from 'react-router-dom'

export default function useFormSubmit(defaultObject) {
	const navigate = useNavigate()
	const [formData, setFormData] = useState(defaultObject)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')

	const { user } = useAuthContext()

	const handleInput = (e) => {
		const { name, value } = e.target

		setFormData((prev) => {
			return {
				...prev,
				[name]: value,
			}
		})
	}
	const handleSubmit = async (e) => {
		e.preventDefault()

		setLoading(true)
		setError(false)

		try {
			const result = await fetch(
				`${import.meta.env.VITE_DATABASE_URL}/companies/external/new`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Authorization: 'Bearer ' + user.token,
					},
					body: JSON.stringify({ ...formData, user }),
				}
			)

			navigate('/company/external')
		} catch (error) {
			setError(error.message)
		} finally {
			setLoading(false)
		}
	}

	const formDataOverride = (formData) => {
		setFormData((prev) => {
			return { ...prev, ...formData }
		})
	}

	return {
		formDataOverride,
		formData,
		handleInput,
		handleSubmit,
		error,
		loading,
	}
}
