import React, { Suspense, useEffect } from 'react'
import { useRoutes } from 'react-router-dom'
import routes from './router'
import AppHeader from './components/app-header/AppHeader'
import AppFooter from './components/app-footer/AppFooter'
import AppPlayerBar from './views/player/app-player-bar/AppPlayerBar'
import { useAppDispatch } from './store'
import { fetchCurrentSongAction } from './store/features/player/player'

function App() {
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(fetchCurrentSongAction(2003496926))
	}, [])

	return (
		<div className='App'>
			<AppHeader></AppHeader>
			<Suspense>
				<div className='main'>{useRoutes(routes)}</div>
			</Suspense>
			<AppFooter></AppFooter>

			{/* 播放器，工具栏 */}
			<AppPlayerBar></AppPlayerBar>
		</div>
	)
}

export default App
