import React, { lazy } from 'react'
import { Navigate, type RouteObject } from 'react-router-dom'

// 一级路由
const Discover = lazy(() => import('@/views/discover/Discover'))
const Mine = lazy(() => import('@/views/mine/Mine'))
const Focus = lazy(() => import('@/views/focus/Focus'))
const Download = lazy(() => import('@/views/download/Download'))

// 二级路由
const Alibum = lazy(() => import('@/views/discover/views/alibum/Alibum'))
const Artist = lazy(() => import('@/views/discover/views/artist/Artist'))
const Djradio = lazy(() => import('@/views/discover/views/djradio/Djradio'))
const Ranking = lazy(() => import('@/views/discover/views/ranking/Ranking'))
const Recommend = lazy(() => import('@/views/discover/views/recommend/Recommend'))
const Songs = lazy(() => import('@/views/discover/views/songs/Songs'))

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to='/discover'></Navigate>
  },
  {
    path: '/discover',
    element: <Discover></Discover>,
    children: [
      {
        path: '/discover',
        element: <Navigate to='/discover/recommend'></Navigate>
      },
      {
        path: '/discover/recommend',
        element: <Recommend></Recommend>
      },
      {
        path: '/discover/ranking',
        element: <Ranking></Ranking>
      },
      {
        path: '/discover/songs',
        element: <Songs></Songs>
      },
      {
        path: '/discover/djradio',
        element: <Djradio></Djradio>
      },
      {
        path: '/discover/artist',
        element: <Artist></Artist>
      },
      {
        path: '/discover/album',
        element: <Alibum></Alibum>
      }
    ]
  },
  {
    path: '/mine',
    element: <Mine></Mine>
  },
  {
    path: '/foucs',
    element: <Focus></Focus>
  },
  {
    path: '/download',
    element: <Download></Download>
  }
]

export default routes
