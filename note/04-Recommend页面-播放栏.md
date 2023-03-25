# 一、Recommend 页面右测区域

## 1.“用户登录”区域

在 `Recommend.tsx` 中，搭建右测区域。

封装 `<UserLogin>` 组件，用于编写右测上方区域。

src\views\discover\views\recommend\cpns\user-login\UserLogin.tsx

```tsx
const UserLogin: FC<IProps> = memo(() => {
	return (
		<RootWrapper className='sprite_02'>
			<p className='desc'>登录网易云音乐，可以享受无限收藏的乐趣，并且无限同步到手机</p>
			<a href='#/login' className='sprite_02'>
				用户登陆
			</a>
		</RootWrapper>
	)
})
```

调整样式。

src\views\discover\views\recommend\cpns\user-login\style.ts

## 2.”入住歌手“区域

在 `Recommend.tsx` 中，搭建右测区域。

创建 `<SettleSinger>` 组件，用来编写”入住歌手“区域。

在其中，封装一个公共组件 `<AreaHeaderV2>`，用来展示头部。

src\components\area-header-v2\AreaHeaderV2.tsx

```tsx
const AreaHeaderV2: FC<IProps> = memo(props => {
	const { title = '默认标题', moreText, moreLink } = props

	return (
		<RootWrapper>
			<h3 className='title'>{title}</h3>
			{moreText && moreLink && <a href={moreLink}>{moreText}</a>}
		</RootWrapper>
	)
})
```

> 【注意】：上方案例中，`moreText` 属性的展示方式，体现了 react 完全利用 ts 的编程能力。
>
> 路由使用 Hash 模式的情况下：`<a hre=“#/xxx”>`，相当于 `<Link to="/xxx">`

封装获取歌手列表的网络请求，在 `fetchRecommendDataAction` 中发送。

src\service\features\discover\recommend.ts

```typescript
export const getArtistList = (limit = 30) =>
	ztRequest.get<IArtistResult>({
		url: '/artist/list',
		params: {
			limit
		}
	})
```

src\store\features\discover\recommend.ts

```typescript
export const fetchRecommendDataAction = createAsyncThunk(
	'recommendDdata',
	(param, { dispatch }) => {
		//...

		getArtistList(5).then(res => {
			console.log('artist res:', res)
			dispatch(changeSettleSingersAction(res.artists))
		})
	}
)
```

> 【注意】：之前封装的 `getImageSize` 工具函数中，应该使用”`y`“拼接尺寸参数
>
> 编程时，前后端多沟通。

src\utils\format.ts

```typescript
export const getImageSize = (iamgeUrl: string, width: number, height: number = width) =>
	iamgeUrl + `?param=${width}y${height}`
```

在 `SettleSings.tsx` 中，编写歌手列表区域，以及下方的”申请成为网易音乐人“按钮。

src\views\discover\views\recommend\cpns\settle-singer\SettleSinger.tsx

```tsx
const SettleSinger: FC<IProps> = memo(() => {
	const { settleSingers } = useAppSelector(
		state => ({
			settleSingers: state.recommend.settleSingers
		}),
		shallowEqual
	)

	return (
		<RootWrapper>
      {/* 头部标题 */}
			<AreaHeaderV2
				title='入住歌手'
				moreText='查看全部'
				moreLink='#/discover/artist'
			></AreaHeaderV2>
      {/* 歌手列表 */}
			<div className='artists'>
				{settleSingers.map(item => (
					<a href='#/discover/artist' className='item' key={item.id}>
						<img src={getImageSize(item.picUrl, 80)} alt='' />
						<div className='info'>
							<div className='name'>{item.name}</div>
							<div className='alias'>{item.alias.join(' ')}</div>
						</div>
					</a>
				))}
			</div>
      {/* 申请成为网易音乐人 */}
			<div className='apply-for'>
				<a href='#/'>申请成为网易音乐人</a>
			</div>
		</RootWrapper>
	)
})
```

## 3.”热门主播“区域

在 `Recommend.tsx` 中，搭建右测区域。

编写”热门主播“区域。创建 `<HotAnchor>` 组件。

使用封装好的 `<AreaHeaderV2>` 组件。编写头部。

将主播相关信息，维护到 json 文件中，并遍历展示。

src\views\discover\views\recommend\cpns\hot-anchor\HotAnchor.tsx

```tsx
//...
import hotAnchors from '@/assets/data/hot-anchors.json'

interface IProps {
	children?: ReactNode
}
const HotAnchor: FC<IProps> = memo(() => {
	return (
		<RootWrapper>
      {/* 头部标题 */}
			<AreaHeaderV2 title='热门主播'></AreaHeaderV2>
      {/* 歌手列表 */}
			<div className='anchors'>
				{hotAnchors.map(item => (
					<div className='item' key={item.picUrl}>
						<a href='' className='image'>
							<img src={item.picUrl} alt='' />
						</a>
						<div className='info'>
							<div className='name'>{item.name}</div>
							<div className='position'>{item.position}</div>
						</div>
					</div>
				))}
			</div>
		</RootWrapper>
	)
})
```

# 二、底部播放栏

## 1.布局搭建

编写底部播放栏区域，创建 `<AppPlayerBar>` 组件。

考虑到其中维护的业务逻辑和状态过多，比较“重”，将它放入到 `/src/view/player` 目录，而非 `/src/component` 目录。

考虑到将来会开发的 player 页面与播放栏中的逻辑息息相关，所以将它们放在一起。

`<AppPlayerBar>` 播放栏组件不依赖其他页面，单独存在，所以在 `App.jsx` 中使用。

src\App.tsx

```tsx
function App() {
	return (
		<div className='App'>
			{/*...*/}

			{/* 播放器，工具栏 */}
			<AppPlayerBar></AppPlayerBar>
		</div>
	)
}
```

`<AppPlayerBar>` 中分为三块区域，`BarControl`，`BarPlayerInfo`，`BarOperator`。

src\views\player\app-player-bar\AppPlayerBar.tsx

```tsx
const AppPlayerBar: FC<IProps> = memo(() => {
	return (
		<RootWrapper className='sprite_playbar'>
			<div className='content wrap_v2'>
				<BarControl></BarControl>
				<BarPlayerInfo></BarPlayerInfo>
				<BarOperator></BarOperator>
			</div>
		</RootWrapper>
	)
})
```

搭建其中的布局。调整样式。

src\views\player\app-player-bar\style.ts

## 2.store 创建

创建一个 store，用于管理 player 页面和 `AppPlayerBar.tsx` 中的状态。

采用分层架构的方式，来管理。

暂时将歌曲的数据写死在 store 中。

## 3.audio 组件

在 `AppPlayerBar.tsx` 中：

- 编写 `<audio>` 组件。用于音频播放。
- 使用 `ref` 拿到 `<audio>` 对象。

> 【注意】：`useRef<T>` 要求返回类型是 `T | null` 联合类型，在使用返回值时，需要进行类型缩小。

在 `AppPlayerBar.tsx` 中，在 `useEffect` 中：

- 封装一个工具函数 `getSongPlayUrl` 用于获取歌曲播放 url。
- 使用 `<audio>` 的 `play` API，进行音乐播放。

> 【补充】：Chrome 浏览器从 60.0.0+ 版本开始，不允许进入标签页时，自动播放音乐。

src\utils\format.ts


```typescript
export const getSongPlayUrl = (id: number) =>
	`https://music.163.com/song/media/outer/url?id=${id}.mp3`
```

src\views\player\app-player-bar\AppPlayerBar.tsx

```typescript
const audioRef = useRef<HTMLAudioElement>(null)

useEffect(() => {
	if (!audioRef.current) return
	if (!('id' in currentSong && currentSong.id)) return

	// 播放音乐
	audioRef.current.src = getSongPlayUrl(currentSong.id)
	audioRef.current
		.play()
		.then(() => {
			setIsPlaying(true)
			console.log('歌曲播放成功')
		})
		.catch(err => {
			setIsPlaying(false)
			console.log('歌曲播放失败:', err)
		})

	// 设置音乐总时长
	setDuration(currentSong.dt)
}, [currentSong])
```

## 4.“播放/暂停”功能

在 `<AppPlayerBar>` 中，编写“播放/暂停”按钮功能。

将“播放/暂停”状态 `isPlaying`，传递给 styled-components 组件 `<BarControl>`。

点击按钮，改变状态。

> 【注意】：setState 操作是**异步的**，要放在最后执行。

src\views\player\app-player-bar\AppPlayerBar.tsx

```tsx
const AppPlayerBar: FC<IProps> = memo(() => {
	//...
  const [isPlaying, setIsPlaying] = useState(false)
	//...
  
  // 播放 / 暂停
  const onPlayPauseClick = () => {
    isPlaying
      ? audioRef.current?.pause()
      : audioRef.current?.play().catch(err => {
          console.log('播放出错 err:', err)
          setIsPlaying(false)
        })
    setIsPlaying(!isPlaying)
  }
	//...
  return (
    <BarControl sPlaying={isPlaying}>
      <button className='btn sprite_playbar prev' onClick={onPreClick}></button>
      <button className='btn sprite_playbar play' onClick={onPlayPauseClick}></button>
      <button className='btn sprite_playbar next' onClick={onNextClick}></button>
    </BarControl>
  )
}
```

styled-components 组件在 TS 中要有类型限制。使用泛型。

src\views\player\app-player-bar\style.ts

```typescript
interface IBarControl {
	isPlaying: boolean
}
export const BarControl = styled.div<IBarControl>`
	//...
`
```

## 5.”进度监听“功能

在 `AppPlayerBar.tsx` 中，编写“歌曲播放，进度条移动”的功能。

给 `<Slider>` 组件：

- 传入 `value` 属性，用于控制进度条进度。
- 使用 `step` 属性，设置精确度
- 将 `tooltip` 属性改为 `{formatter: none}`，表示不展示提示框。

在 `<audio>` 组件上，使用 `onTimeUpdate` 事件，并获取到歌曲播放的时间 `audioRef.current.currentTime`，计算进度的百分比。

在 `useEffect` 中，获取音乐的总时长，并设置到组件上。

src\views\player\app-player-bar\AppPlayerBar.tsx

```tsx
const AppPlayerBar: FC<IProps> = memo(() => {
  //...

  const { currentSong } = useAppSelector(
		state => ({
			currentSong: state.player.currentSong,
		}),
		shallowEqual
	)

  useEffect(() => {
		// 设置音乐总时长
		setDuration(currentSong.dt)
	}, [currentSong])

  //...

  // Audio
	const onAudioTimeUpdate = () => {
		// 获取当歌曲播放前时间
		if (!audioRef.current) return
		const currentTime = audioRef.current.currentTime * 1000

		// 计算当前歌曲播放进度
		if (!isSliding) {
			const progress = (currentTime / duration) * 100
			setProgress(progress)
			setCurrentTime(currentTime)
		}

		// 匹配歌词
		const findIndex = lyrics.findIndex(item => item.time > currentTime)
		const index = findIndex === -1 ? lyrics.length - 1 : findIndex
		if (lyricIndex === index) return
		dispatch(changeLyricIndexongAction(index))

		// 展示歌词
		message.open({
			content: lyrics[index].text,
			key: 'lyric',
			duration: 0
		})
	}

  return{
    {/*...*/}
    <Slider
      step={0.5}
      value={progressm}
      tooltip={{ formatter: null }}
    ></Slider>

  	{/*...*/}
    <audio ref={audioRef} onTimeUpdate={onAudioTimeUpdate}></audio>
  }
}
```

## 6.“时间展示”功能

对总时长进行格式化，封装工具函数 `formatMillisecond`。

src\utils\format.ts

```typescript
export const formatMillisecond = (millisecond: number) => {
	const totalSecond = millisecond / 1000 // 秒钟总数

	const minute = Math.floor(totalSecond / 60) // 分钟
	const second = Math.floor(totalSecond) % 60 // 秒钟

	const formatMinute = String(minute).padStart(2, '0')
	const formatSecond = String(second).padStart(2, '0')

	return `${formatMinute}:${formatSecond}`
}
```

把当前时间记录下来，并格式化展示。

src\views\player\app-player-bar\AppPlayerBar.tsx

```tsx
const AppPlayerBar: FC<IProps> = memo(() => {

  return (
    {/*...*/}
    <div className='time'>
      <span className='current'>{formatMillisecond(currentTime)}</span>
      <span className='divider'>/</span>
      <span className='duration'>{formatMillisecond(duration)}</span>
    </div>
  )
}
```

## 7。“播放进度控制”功能

### 1.点击

监听 `<Slider>` 组件的点击完成事件 `onAfterChange`，拿到点击的进度值。

并设置歌曲的播放进度。三个步骤。

src\views\player\app-player-bar\AppPlayerBar.tsx

```typescript
const onSliderChanged = useCallback(
	(value: number) => {
		const currentTime = (value / 100) * duration
		if (audioRef.current) audioRef.current.currentTime = currentTime / 1000

		setProgress(value) // 步骤一
		setCurrentTime(currentTime) // 步骤二
		setIsSliding(false) // 步骤三
	},
	[duration]
)
```

### 2.拖拽

监听 `<Slider>` 的拖拽事件 `onChange`，创建一个是否拖拽的状态 `isSliding`。

根据该状态，在 `<audio>` 的 `onTimeUpdate` 事件中判断是否要设值。

在 `<Slider>` 的 `onAfterChange` 中将该状态改为 `false`。

在拖拽时，改变当前时间，并展示。

```tsx
const AppPlayerBar: FC<IProps> = memo(() => {
  const [isSliding, setIsSliding] = useState(false)

  const onSliderChanged = useCallback(
    (value: number) => {
      const currentTime = (value / 100) * duration
      if (audioRef.current) audioRef.current.currentTime = currentTime / 1000

      setProgress(value)
      setCurrentTime(currentTime)
      setIsSliding(false) // 改变 isSliding 状态
    },
    [duration]
  )

  const onSliderChanging = useCallback(
		(value: number) => {
			setIsSliding(true)
			setProgress(value)
			setCurrentTime((value / 100) * duration)
		},
		[duration]
	)

  // Audio
	const onAudioTimeUpdate = () => {
    //...

		// 计算当前歌曲播放进度
		if (!isSliding) {
			const progress = (currentTime / duration) * 100
			setProgress(progress)
			setCurrentTime(currentTime)
		}

    //...
	}
}
```

## 8.歌词详情 & 歌词获取

封装获取歌曲详情的网络请求，并在异步 action `playTheMusicAction` 中发送。

同一个异步 action，在获取歌曲详情的下方，发送获取歌词的网络请求。

src\store\features\player\player.ts

```typescript
export const playTheMusicAction = createAsyncThunk('currentSong', (id, { dispatch, getState }) => {
	//...
  getSongDetail(id).then(res => {
		if (!res.songs.length) return
		const song = res.songs[0]
		dispatch(changeCurrentSongAction(song))
	})
  //...

	// 歌词获取
	getSongLyric(id).then(res => {
		const lyricString = res.lrc.lyric
		const lyrics = parseLyric(lyricString) // 歌词解析
		dispatch(changeLyricsAction(lyrics))
	})
})
```

先在 `App.tsx` 中派发该 action，获取一首歌曲详情。

src\App.tsx

```tsx
function App() {
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(playTheMusicAction(2003496926))
	}, [])

	return {
		/*...*/
	}
}
```

### 1.歌词解析

封装格式化歌词的工具函数，将格式化后的歌词，保存到 store 中。

src\utils\format.ts

```typescript
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
```

src\store\features\player\player.ts

```typescript
export const playTheMusicAction = createAsyncThunk(
  //...

  // 歌词获取
  getSongLyric(id).then(res => {
    const lyricString = res.lrc.lyric
    const lyrics = parseLyric(lyricString) // 歌词解析
    dispatch(changeLyricsAction(lyrics))
  })
}
```

在 `AppPlayerBar.tsx` 中的 `<audio>` 组件的 `onTimeUpdate` 事件中匹配歌词

- 理解匹配歌词的算法。匹配到第 `i` 个歌词，展示的是第 `i - 1` 个歌词。

- 特殊情况：最后一句歌词，无法匹配到，进行处理。

  ```typescript
  const index = findIndex === -1 ? lyrics.length - 1 : findIndex
  ```

将匹配到的歌词索引，在 store 中进行记录。同一句歌词，只设置一次。

使用 _AntDesign_ 的 `message.open` API 展示歌词，

- 将 `duration` 设置为 0.
- 设置 `key`，避免同时展示多个 message。
- 重置样式（项目中未重置）。

src\views\player\app-player-bar\AppPlayerBar.tsx

```typescript
// Audio
const onAudioTimeUpdate = () => {
	// 获取当歌曲播放前时间
	if (!audioRef.current) return
	const currentTime = audioRef.current.currentTime * 1000

	// 计算当前歌曲播放进度
	if (!isSliding) {
		const progress = (currentTime / duration) * 100
		setProgress(progress)
		setCurrentTime(currentTime)
	}

	// 匹配歌词
	const findIndex = lyrics.findIndex(item => item.time > currentTime)
	const index = findIndex === -1 ? lyrics.length - 1 : findIndex
	if (lyricIndex === index) return
	dispatch(changeLyricIndexongAction(index))

	// 展示歌词
	message.open({
		content: lyrics[index].text,
		key: 'lyric',
		duration: 0
	})
}
```

## 9.”播放列表“功能

播放列表功能的编写。考虑两种情况：

- 情况一：播放的歌曲，不在播放列表中，将歌曲加入列表，并播放。
- 情况二：播放的歌曲，已经在列表中，取到该歌曲，并播放。

在 `playTheMusicAction` 中重构代码，判断歌曲 id 是否在列表中。

> 【注意】：为 `createAsyncThunk` 传入泛型，分别指定“返回值”、“参数”、“`getState` 返回值”的类型。

src\store\features\player\player.ts

```typescript
export const playTheMusicAction = createAsyncThunk<void, number, IThunkState>(
	'currentSong',
	(id, { dispatch, getState }) => {
		// 播放歌曲，分两种情况
		const playSongList = getState().player.playSongList
		const index = playSongList.findIndex(item => item.id === id)
		if (index === -1) {
			// 歌曲不在播放列表中
			getSongDetail(id).then(res => {
				if (!res.songs.length) return
				const song = res.songs[0]

				const newPlaySongList = [...playSongList, song]
				dispatch(changeCurrentSongAction(song))
				dispatch(changePlaySongListAction(newPlaySongList))
				dispatch(changePlaySongIndexAction(newPlaySongList.length - 1))
			})
		} else {
			// 歌曲已在播放列表中
			const song = playSongList[index]
			dispatch(changeCurrentSongAction(song))
			dispatch(changePlaySongListAction(index))
		}

		// 歌词获取
		getSongLyric(id).then(res => {
			const lyricString = res.lrc.lyric
			const lyrics = parseLyric(lyricString) // 歌词解析
			dispatch(changeLyricsAction(lyrics))
		})
	}
)
```

## 10.“播放模式”功能

编写”播放模式“的功能，在 store 中，记录播放模式。

src\store\features\player\player.ts

```typescript
export enum PLAY_MODE {
	ORDER,
	RANDOM,
	CIRCULATION
}
const initialState: {
	//...
	playMode: PLAY_MODE
} = {
	//...
	playMode: PLAY_MODE.ORDER
}

const playerSlice = createSlice({
	name: 'player',
	initialState,
	reducers: {
		//...
		changePlayModeAction(state, { payload }) {
			state.playMode = payload
		}
	}
})
```

在 `AppPlayerBar.tsx` 中，将 `playMode` 传入 styled-componetns 组件中。改变背景图片。

src\views\player\app-player-bar\AppPlayerBar.tsx

```tsx
<BarOperator playMode={playMode}>
	<div className='left'>
		<button className='btn pip'></button>
		<button className='btn sprite_playbar favor'></button>
		<button className='btn sprite_playbar share'></button>
	</div>
	<div className='right sprite_playbar'>
		<button className='btn sprite_playbar volume'></button>
		<button className='btn sprite_playbar loop' onClick={onModeChangeClick}></button>
		<button className='btn sprite_playbar playlist'></button>
	</div>
</BarOperator>
```

src\views\player\app-player-bar\style.ts

```typescript
interface IBarOperator {
	playMode: number
}
export const BarOperator = styled.div<IBarOperator>`
	.loop {
		background-position: ${props => {
			switch (props.playMode) {
				case 1:
					return '-66px -248px'
				case 2:
					return '-66px -344px'
				default:
					return '-3px -344px'
			}
		}};
	}
`
```

监听播放模式按钮点击事件，

src\views\player\app-player-bar\AppPlayerBar.tsx

```typescript
// ModeChange
const onModeChangeClick = () => {
	let newPlayMode = playMode + 1
	if (newPlayMode > 2) newPlayMode = 1 // 边界判断
	dispatch(changePlayModeAction(newPlayMode))
}
```

## 11.“歌曲切换”功能

编写切换歌曲（上一首/下一首）功能，监听按钮点击事件。

src\views\player\app-player-bar\AppPlayerBar.tsx

```typescript
const musicChange = (isNext = true) => {
	dispatch(changeMusicAction(isNext))
}

// 上一首，播放/暂停，下一首
const onPreClick = () => {
	musicChange(false)
}

const onNextClick = () => {
	musicChange(true)
}
```

创建一个异步 action `changeMusicAction`，在其中封装播放音乐的功能。

在其中，根据不同的播放模式，取到不同的歌曲，

src\store\features\player\player.ts

```typescript
export const changeMusicAction = createAsyncThunk<void, boolean, IThunkState>(
	'changeMusic',
	(isNext: boolean, { dispatch, getState }) => {
		// 获取 state 中的数据
		const { playMode, playSongIndex, playSongList } = getState().player

		const _getDiffRandomNumber = (): number => {
			const length = playSongList.length
			const random = Math.floor(Math.random()) * length
			return random === playSongIndex && length > 1 ? _getDiffRandomNumber() : random
		}

		// 根据播放模式，切换歌曲
		let newIndex = playSongIndex
		switch (playMode) {
			case PLAY_MODE.RANDOM: // 随机播放
				newIndex = _getDiffRandomNumber() // 递归，直到找到与原值不同的一个随机数。
				break
			default:
				newIndex = isNext ? playSongIndex + 1 : playSongIndex - 1
				// 边界判断
				if (newIndex > playSongList.length - 1) newIndex = 0
				if (newIndex < 0) newIndex = playSongList.length - 1
				break
		}

		// 歌曲变更
		const song = playSongList[newIndex]
		dispatch(changeCurrentSongAction(song))
		dispatch(changePlaySongIndexAction(newIndex))

		// 请求新的歌词
		getSongLyric(song.id).then(res => {
			const lyricStr = res.lrc.lyric
			const lyrics = parseLyric(lyricStr)
			dispatch(changeLyricsAction(lyrics))
		})
	}
)
```

在 `AppPlayerBar.tsx` 中的 `<audio>` 组件中，监听音频播放完成的 `onEnded` 事件。

判断播放模式，设置播放歌曲。

src\views\player\app-player-bar\AppPlayerBar.tsx

```typescript
const onAudioEnded = () => {
	switch (playMode) {
		case PLAY_MODE.CIRCULATION:
			if (audioRef.current) audioRef.current.currentTime = 0
			break
		default:
			musicChange(true)
			break
	}
}
```

# 三、歌曲播放

在 `PopularRanking.tsx` 的 `<RankingItem>` 中，点击某个歌曲的播放按钮，将歌曲保存到 store 中，并播放。

src\views\discover\views\recommend\cpns\popular-ranking\cpns\ranking-item\RankingItem.tsx

```typescript
const onPlayClick = (id: number) => {
	dispatch(playTheMusicAction(id))
}
```

切换歌曲时，store 中的歌词也要变。

src\store\features\player\player.ts

# 四. 网易云的完整项目

预习[完整项目](https://github.com/coderwhy/hy-react-web-music)
