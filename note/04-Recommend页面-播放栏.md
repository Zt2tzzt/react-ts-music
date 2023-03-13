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
> `<a>` 标签中，`href` 属性 `#/xxx`，相当于 `<Link>` 中 `to` 属性 `/xxx`

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

> 【注意】：之前封装的 `getImageSize` 工具函数中，使用”`y`“拼接尺寸参数
>
> 编程时，前后端多沟通。

src\utils\format.ts

```typescript
export const getImageSize = (iamgeUrl: string, width: number, height: number = width) =>
	iamgeUrl + `?param=${width}y${height}`

```

在 `SettleSings.tsx` 中，编写歌手列表区域，以及下方的”申请称为网易音乐人“按钮。

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
			<AreaHeaderV2
				title='入住歌手'
				moreText='查看全部'
				moreLink='#/discover/artist'
			></AreaHeaderV2>
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
			<AreaHeaderV2 title='热门主播'></AreaHeaderV2>
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

---

编写底部播放栏区域，创建 AppPlayerBar 组件。

考虑到其中维护的业务逻辑和状态过多，比较重，将它放入到 view 目录下的 player 目录，而非 component 目录。

player 页面与播放栏中的逻辑息息相关，所以放在一起。

播放栏不依赖其他页面，单独存在，所以放在 App.jsx 中。

在其中分为三块区域，BarControl，BarPlayerInfo，BarOperator。

搭建其中的布局。调整样式。

---

创建一个 store，用于管理 player 页面和 player 播放栏中的状态。

采用分层架构的方式，来管理 player 的状态。

暂时将歌曲的数据写死在 store 中。

---

在 AppPlayerBar 中，编写 audio 组件。用于音频播放。

使用 ref 拿到 audio 对象。

> 【注意】：`useRef<T>` 要求返回类型是 `T | null` 联合类型。

---

在 AppPlayerBar 中，封装一个工具函数 getSongPlayUrl 用于获取歌曲播放 url。

使用 play API，进行音乐播放。

> 【补充】：Chrome 浏览器从 60+ 版本开始，不运行进入标签页时，自动播放音乐。

---

在 AppPlayerBar 中，编写“播放/暂停”按钮功能。

将播放/暂停状态，传递给 styled-components 组件，TS 中要有类型限制。使用泛型。

点击按钮，改变状态，注意 setState 是异步的，要放在最后执行。

---

在 AppPlayerBar 中，编写“歌曲播放，进度条移动”的功能。

给 Slider 组件，传入 value 属性，用于控制进度条进度。

在 audio 组件上，使用 onTimeUpdate 事件，并获取到歌曲播放的时间。

在 useEffect 中，获取音乐的总时长，并设置到组件上。

在 onTimeUpdate 中计算进度的百分比。

在 Slider 中，使用 step 属性，设置精确度。将 tooltip 属性改为 `{formatter: none}`，

---

对总时长进行格式化，封装工具函数。

把当前时间记录下来，并格式化展示。

---

监听 Slider 的点击完成事件（onAfterChange），拿到点击的进度值。

并设置歌曲的播放进度。三个步骤。

---

监听 Slider 的拖拽事件，创建一个是否拖拽的状态。

根据该状态，在 onTimeUpdate 中判断是否要设值。

在 onAfterChange 中将该状态改为 false。

在拖拽时，改变当前时间，并展示。

---

封装获取歌曲详情的网络请求，并在异步 action `fetchCurrentSongAction` 中发送。

现在 App.jsx 中派发该 action，获取一首歌曲详情。

同一个异步 action，在获取歌曲详情的下方，发送获取歌词的网络请求。

封装格式化歌词的工具函数，将格式化后的歌词，保存到 store 中。

在 audio 组件的 onTimeUpdate 事件中匹配歌词

- 理解匹配歌词的算法。匹配到第 i 个歌词，展示第 i - 1 个歌词。
- 特殊情况：最后一句歌词，无法匹配到，进行处理。

将匹配到的歌词索引，在 store 中进行记录。同一句歌词，只设置一次。

使用 AntDesign 的 `message.open` API 展示歌词，

- 将 duration 设置为 0.
- 设置 key，当有不同 key 时，上一个 message 会消失。
- 重置样式。

---

播放列表功能的编写。考虑两种情况：

- 情况一：播放的歌曲，不在播放列表中，将歌曲加入列表，并播放。
- 情况二：播放的歌曲，已经在列表中，取到该歌曲，并播放。

在 `fetchCurrentSongAction` 中重构代码，判断歌曲 id 是否在列表中。

> 为 `createAsyncThunk` 传入泛型，指定 返回值、参数、`getState` 返回的类型。

---

编写”播放模式“的功能，在 store 中，记录播放模式。

将 playmode 传入 styled-componetns 组件中。改变背景图片。

监听播放模式按钮点击事件，

---

编写切换歌曲（上一首/下一首）功能，监听按钮点击事件。

创建一个异步 action `changeMusicAction`，在其中封装播放音乐的功能。

在其中，根据不同的播放模式，取到不同的歌曲，

---

在 PopularRanking.tsx 中，点击某个歌曲的播放按钮，将歌曲保存到 store 中，并播放。

切换歌曲时，store 中的歌词也要变。

---

audio 组件中，监听音频播放完成的 onEnded 事件。

判断播放模式，设置播放歌曲。