import React, { Suspense } from 'react'
import { useRoutes } from 'react-router-dom'
import routes from './router'
import AppHeader from './components/app-header/AppHeader'
import AppFooter from './components/app-footer/AppFooter'

function App() {
	return (
		<div className='App'>
			<AppHeader></AppHeader>
			<Suspense>
				<div className='main'>{useRoutes(routes)}</div>
			</Suspense>
			<AppFooter></AppFooter>
		</div>
	)
}

export default App
