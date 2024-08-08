import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './scss/styles.scss'
import { AuthContextProvider } from './store/authContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<AuthContextProvider>
			<App />
		</AuthContextProvider>
	</React.StrictMode>
)
