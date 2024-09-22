function useTranslateUserRole(role) {
	let translatedRole = ''
	switch (role) {
		case 'Administrator':
			translatedRole = 'Administrator'
			break
		case 'User':
			translatedRole = 'Bruker'
			break
		default:
			translatedRole = 'Ukjent rolle'
			break
	}
	return translatedRole
}

export default useTranslateUserRole
