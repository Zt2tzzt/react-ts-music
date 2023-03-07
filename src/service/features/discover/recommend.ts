import { IBannersResult } from '@/types'
import ztRequest from '../..'

export const getBanners = () =>
	ztRequest.get<IBannersResult>({
		url: '/banner'
	})
