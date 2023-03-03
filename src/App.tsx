import React, { Suspense } from 'react'
import { shallowEqual, useDispatch } from 'react-redux'
import { Link, useRoutes } from 'react-router-dom'
import routes from './router'
import { useSelectorWithStateType } from '@/store'
import { changeMessageAction } from './store/features/counter'

function App() {
	const { count, message } = useSelectorWithStateType(
		state => ({
			count: state.counter.count,
			message: state.counter.message
		}),
		shallowEqual
	)

	const dispatch = useDispatch()
	const onChangeMessage = () => {
		dispatch(changeMessageAction('哈哈哈哈'))
	}

	return (
		<div className='App'>
			<div className='nav'>
				<Link to='/discover'>发现音乐</Link> | <Link to='/mine'>我的音乐</Link> | <Link to='/foucs'>关注</Link> |
				<Link to='/download'>下载客户端</Link> |
			</div>
			<h2>当前计数：{count}</h2>
			<h2>当前消息：{message}</h2>
			<button onClick={onChangeMessage}>修改 message</button>
			<Suspense>
				<div className='main'>{useRoutes(routes)}</div>
			</Suspense>
		</div>
	)
}

export default App
