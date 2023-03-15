import type { ILyricParse } from '@/types'

export const getImageSize = (iamgeUrl: string, width: number, height: number = width) =>
	iamgeUrl + `?param=${width}y${height}`

export const formatCount = (count: number) => {
	return count > 10000 ? Math.floor(count / 10000) + '万' : count
}

export const getSongPlayUrl = (id: number) =>
	`https://music.163.com/song/media/outer/url?id=${id}.mp3`

/**
 * @description: 此函数用于：歌词解析。
 * @Author: ZeT1an
 * @param {string} lyricString 服务器返回的歌词文本。
 * @return {ILyricParse[]} 解析后的歌词数组。
 */
export const parseLyric = (lyricString: string): ILyricParse[] => {
	// 1.将每一行歌词，作为元素，放入数组中
	const lines = lyricString.split('\n')

	// 2.将歌词解析成对象。
	const timeRegExp = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/

	const lyrics: ILyricParse[] = []
	lines.forEach(item => {
		const res = timeRegExp.exec(item)
		if (!res) return

		const time1 = Number(res[1]) * 60 * 1000
		const time2 = Number(res[2]) * 1000
		const time3 = res[3].length === 2 ? Number(res[3]) * 10 : Number(res[3])
		const time = time1 + time2 + time3

		const text = item.replace(timeRegExp, '')

		lyrics.push({ time, text })
	})

	return lyrics
}

export const formatMillisecond = (millisecond: number) => {
	const totalSecond = millisecond / 1000 // 秒钟数

	const minute = Math.floor(totalSecond / 60)
	const second = Math.floor(totalSecond) % 60

	const formatMinute = String(minute).padStart(2, '0')
	const formatSecond = String(second).padStart(2, '0')

	return `${formatMinute}:${formatSecond}`
}
