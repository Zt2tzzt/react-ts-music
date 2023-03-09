export const getImageSize = (iamgeUrl: string, width: number, height: number = width) =>
	iamgeUrl + `?param=${width}*${height}`

export const formatCount = (count: number) => {
	return count > 10000 ? Math.floor(count / 10000) + '万' : count
}
