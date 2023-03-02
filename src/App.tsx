import React, { Suspense } from 'react'
import { useRoutes } from 'react-router-dom'
import routes from './router'

function App() {
	return (
		<div className='App'>
			<Suspense>
				<div className='main'>{useRoutes(routes)}</div>
			</Suspense>
		</div>
	)
}

export default App
