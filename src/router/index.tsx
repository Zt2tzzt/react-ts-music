import React from 'react'

import Discover from '@/views/discover/Discover'
import type { RouteObject } from 'react-router-dom'

const routes: RouteObject[] = [
	{
		path: '/',
		element: <Discover></Discover>
	}
]

export default routes
