import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@/App'
import { HashRouter } from 'react-router-dom'
import 'normalize.css'
import '@/assets/css/index.css'
import { Provider } from 'react-redux'
import store from './store'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
	<React.StrictMode>
		<Provider store={store}>
			<HashRouter>
				<App />
			</HashRouter>
		</Provider>
	</React.StrictMode>
)
