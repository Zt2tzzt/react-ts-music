Discover 页面下的 Recommend 页面编写

# 一、Recommend 页面

在 `Recommend.tsx` 中，轮播图（`<TopBanner>`）下方区域，分为两部分，左边区域和右边区域。

## 1.左、右区域布局

为整个区域设置背景图片，图片上面有区域划分的线，设置样式时，要预留线的 1px 宽度。

src\views\discover\views\recommend\Recommend.tsx

```tsx
<RecommendWrapper>
	<TopBanners></TopBanners>
	<div className='content wrap_v2'>
		<div className='left'>{/*...*/}</div>
		<div className='right'>Right</div>
	</div>
</RecommendWrapper>
```

> 【注意】：调整样式时，有 `padding` / `border` 和 `width` / `height` 同时存在时，
>
> 一定要设置 `box-sizing: border-box;` 属性。

src\views\discover\views\recommend\style.ts

```less
const RecommendWrapper = styled.section`
	> .content {
		border: 1px #d3d3d3 solid;
		background-image: url(${require('@/assets/img/wrap-bg.png')});
		display: flex;

		> .left {
			padding: 20px;
			width: 729px;
      box-sizing: border-box;
		}

		> .right {
			margin-left: 1px;
			width: 250px;
		}
	}
`
```

# 二、HotRecommend 组件

在 `Recommend.tsx` 中，编写 `<HotRecommend>` 组件。用来表示“热门推荐”区域。

在 `HotRecommend.tsx` 中，将 header 区域，封装成一个可复用的公共组件。

### 1.头部区域（AreaHeaderV1）

创建组件 `AreaHeaderV1.tsx`

1.在 `AreaHeaderV1.tsx` 中，隐藏 titles 的 keywords 上最后一个 divider。两种方案：

- 方案一：使用 css 隐藏（项目中采用）。
- 方案二：在 tsx 代码中隐藏。

src\components\area-header-v1\style.ts

```less
.keywords {
  //...
    &:last-child {
      .divider {
        display: none;
      }
    }
  }
}
```

2.在 `AreaHeaderV1.tsx` 中，设置可传入的属性值。

设置 `IProps` 类型。并设置 `props` 的默认值。

src\components\area-header-v1\AreaHeaderV1.tsx

```tsx
interface IProps {
	children?: ReactNode
	titleText?: string
	keywords?: string[]
	moreText?: string
	moreLink?: string
}
const AreaHeaderV1: FC<IProps> = memo(props => {
	const { titleText = '默认标题', keywords = [], moreText = '更多', moreLink = '/' } = props
  //...
}
```

3.在 `HotRecommend.tsx` 中，使用 `<AppHeader>`，并传入这些属性。

src\views\discover\views\recommend\cpns\hot-recommend\HotRecommend.tsx

```tsx
<RootWrapper>
	<AreaHeaderV1
		titleText='热门推荐'
		keywords={['华语', '流行', '摇滚', '民谣', '电子']}
		moreLink='/discover/songs'
	></AreaHeaderV1>
	//...
</RootWrapper>
```

> 【注意】：已用 TS 进行了类型检测，所以不再用 react 提供的 `PropTypes` 进行类型检测。
>
> 关闭 eslint 相关类型检测规则。否则 eslint 会报警告。

.eslintrc.js

```javascript
module.exports = {
	//...
	rules: {
		//...
		'react/prop-types': 'off'
	}
}
```

### 2.内容区域（SongMenuItem）

1.在 `HotRecommend.tsx` 中，发送网络请求，请求“热门推荐”歌单列表数据。

- 封装异步 action，并进行派发。
- 将获取到的 `hotRecommend` 数据，保存到 store。
- （并在 `HotRecommend.tsx` 中，创建 `<SongMenuItem>` 组件，进行歌单展示）。

src\views\discover\views\recommend\cpns\hot-recommend\HotRecommend.tsx

```tsx
const HotRecommend: FC<IProps> = memo(() => {
	const { hotRecommends } = useAppSelector(
		state => ({
			hotRecommends: state.recommend.hotRecommends
		}),
		shallowEqual
	)

	return (
		<RootWrapper>
			<AreaHeaderV1
				titleText='热门推荐'
				keywords={['华语', '流行', '摇滚', '民谣', '电子']}
				moreLink='/discover/songs'
			></AreaHeaderV1>
			<div className='recommend-list'>
				{hotRecommends.map(item => (
					<SongMenuItem key={item.id} itemData={item}></SongMenuItem>
				))}
			</div>
		</RootWrapper>
	)
})
```

src\store\features\discover\recommend.ts

```typescript
const initialState: {
	banners: IBanner[]
	hotRecommends: IPersonalized[]
} = {
	banners: [],
	hotRecommends: []
}

const recommendSlice = createSlice({
	name: 'recommend',
	initialState,
	reducers: {
		changeBannersAction(state, { payload }: PayloadAction<IBanner[]>) {
			state.banners = payload
		},
		changeHotRecommendsAction(state, { payload }: PayloadAction<IPersonalized[]>) {
			state.hotRecommends = payload
		}
	}
})

export const { changeBannersAction, changeHotRecommendsAction } = recommendSlice.actions
export default recommendSlice.reducer

export const fetchBannerDataAction = createAsyncThunk('banners', (param, { dispatch }) => {
	getBanners().then(res => {
		console.log('banners res:', res)
		dispatch(changeBannersAction(res.banners))
	})
})

export const fetchHotRecommendsAction = createAsyncThunk('hotRecommends', (param, { dispatch }) => {
	getHotRecommend(8).then(res => {
		console.log('hotRecommends res:', res)
		dispatch(changeHotRecommendsAction(res.result))
	})
})
```

2.在 `HotRecommend.tsx` 中，将歌单封装成一个组件 `<SongsMenuItem>`。

src\components\song-menu-item\SongMenuItem.tsx

```tsx
interface IProps {
	children?: ReactNode
	itemData: IPersonalized
}
const SongMenuItem: FC<IProps> = memo(props => {
	const { itemData } = props

	return (
		<RootWrapper>
			<div className='top'>
				<img src={getImageSize(itemData.picUrl, 140)} alt='' />
				<div className='cover sprite_cover'>
					<div className='info sprite_cover'>
						<span>
							<i className='sprite_icon headset'></i>
							<span className='count'>{formatCount(itemData.playCount)}</span>
						</span>
						<i className='sprite_icon play'></i>
					</div>
				</div>
			</div>
			<div className='bottom'>{itemData.name}</div>
		</RootWrapper>
	)
})
```

> 【回顾】：网易云音乐的 API 管理的非常好，在图片 url 后方跟上对应的参数，可以请求不同格式的图片。

加载图片时，为节省性能，在图片后方拼接参数，控制加载图片的大小。

将上述逻辑，封装成工具函数 `getImageSize`。

src\utils\format.ts

```typescript
export const getImageSize = (iamgeUrl: string, width: number, height: number = width) =>
	iamgeUrl + `?param=${width}*${height}`
```

将播放量进行格式化，并展示。

src\utils\format.ts

```typescript
export const formatCount = (count: number) => {
	return count > 10000 ? Math.floor(count / 10000) + '万' : count
}
```

应用精灵图，并调整样式。

src\components\song-menu-item\style.ts

# 三、NewAlbums 组件

在 `Recommend.tsx` 中，编写“新碟上架”区域，创建 `<NewAlbums>` 组件。

### 1.头部区域（引用公共组件）

编写 header 区域，引用 `<AreaHeaderV1>` 组件。

### 2.内容区域（轮播图）

编写 content 区域。

1.使用 AntDesign 提供的轮播图组件 `<Carousel>` 来做滚动效果。

先搭建轮播图的箭头控制器，使用精灵图。调整样式。

src\views\discover\views\recommend\cpns\new-albums\NewAlbums.tsx

```tsx
{
	/* speed 属性，用来调整轮播图滚动的速度。*/
}
;<Carousel ref={bannerRef} dots={false} speed={1500}>
	{Array.from({ length: 2 }).map((_, index) => index)}
</Carousel>
```

2.再搭建轮播图中的内容。

在 `Recommend.tsx` 中，发送网络请求，获取新碟上架列表，并保存到 store 中。

在 `NewAlbums.tsx` 中，将新碟上架列表展示出来。

理解在轮播图中分页的算法：

- 已知 pageSize 为 5；
- 已知 totalPage 为 2；
- page 从 0 开始，那么第 page 页展示的列表数据为：`page * 5` 到 `(page + 1) * 5`

封装一个组件 `<AlbumItem>` 用来展示”新碟“

在 `NewAlbums.tsx` 中，引用封装好的 `<AlbumItem>` 组件，放入轮播图 `<Carousel>` 中

src\views\discover\views\recommend\cpns\new-albums\NewAlbums.tsx

```tsx
const NewAlbums: FC<IProps> = memo(() => {
	const bannerRef = useRef<ElementRef<typeof Carousel>>(null)

	const { newAlbums } = useAppSelector(
		state => ({
			newAlbums: state.recommend.newAlbum
		}),
		shallowEqual
	)

	const onPreClick = () => {
		bannerRef.current?.prev()
	}
	const onNextClick = () => {
		bannerRef.current?.next()
	}

	return (
		<RootWrapper>
			<AreaHeaderV1 titleText='新碟上架' moreLink='/discover/album'></AreaHeaderV1>

			<div className='content'>
				{/* 控制器1 */}
				<button className='sprite_02 arrow arrow-left' onClick={onPreClick}></button>

				{/* 轮播图 */}
				<div className='banner'>
					<Carousel ref={bannerRef} dots={false} speed={1500}>
						{Array.from({ length: 2 }).map((_, index) => (
							<div key={index}>
								<div className='album-list'>
									{newAlbums.slice(index * 5, (index + 1) * 5).map(album => (
										<NewAlbumItem key={album.id} itemData={album}></NewAlbumItem>
									))}
								</div>
							</div>
						))}
					</Carousel>
				</div>

				{/* 控制器2 */}
				<button className='sprite_02 arrow arrow-right' onClick={onNextClick}></button>
			</div>
		</RootWrapper>
	)
})
```

> 【注意】：传入 `<Carousel>` 的直接子元素，被默认设值了行内样式，`display: inline-block; width: 100%`；
>
> 该样式不好覆盖。需要再嵌套一层展示。

调整样式。

src\views\discover\views\recommend\cpns\new-albums\style.ts

### 3.重构异步 Action

在 `Recommend.tsx` 页面中，对发送请求的方式进行重构，

在一次派发 action 操作中，发送多个网络请求。

src\views\discover\views\recommend\Recommend.tsx

```typescript
const dispatch = useAppDispatch()
useEffect(() => {
	dispatch(fetchRecommendDataAction())
}, [])
```

src\store\features\discover\recommend.ts

```typescript
export const fetchRecommendDataAction = createAsyncThunk(
	'recommendDdata',
	(param, { dispatch }) => {
		getBanners().then(res => {
			console.log('banners res:', res)
			dispatch(changeBannersAction(res.banners))
		})
		getHotRecommend(8).then(res => {
			console.log('hotRecommends res:', res)
			dispatch(changeHotRecommendsAction(res.result))
		})
		getNewAlbum().then(res => {
			console.log('newAlbums res:', res)
			dispatch(changeNewAlbumsAction(res.albums))
		})
	}
)
```

# 四、PopularRanking 组件

在 `Recommend.tsx` 页面中，创建组件 `<PopularRanking>`，用来编写榜单区域。

### 1.样式调整

在其中设置背景图片。

src\views\discover\views\recommend\cpns\popular-ranking\PopularRanking.tsx

```tsx
<RootWrapper>
	<AreaHeaderV1 titleText='榜单' moreLink='/discover/ranking'></AreaHeaderV1>
	<div className='content'>
		{rankings.map(item => (
			<RankingItem key={item.id} itemData={item}></RankingItem>
		))}
	</div>
</RootWrapper>
```

src\views\discover\views\recommend\cpns\popular-ranking\style.ts

```less
export default styled.section`
	.content {
		display: flex;
		height: 472px;
		margin-top: 20px;
		background: url(${require('@/assets/img/recommend-top-bg.png')});
	}
`
```

### 2.数据渲染模式

并在 `Recommend.tsx` 中，派发 action，封装网络请求，将三个榜单的数据，保存到 store 中。

src\views\discover\views\recommend\Recommend.tsx

```typescript
const dispatch = useAppDispatch()
useEffect(() => {
	dispatch(fetchRecommendDataAction())
}, [])
```

> 【注意】：三个榜单分别要发送三次网络请求，榜单数据的组织，有两种方案：
>
> 方案一：渲染一次（项目中采用）
>
> - 等到三个网络请求都有结果后，再一次性渲染到页面。从页面渲染的角度来看，性能高。
> - 虽然等待三次网络请求全部完成比较耗时，但是考虑到榜单在页面下方，并不会被用户立即看到，所以影响不大。
>
> 方案二：渲染多次。
>
> - 三个网络请求，一旦有一个返回数据，就进行一次渲染。
> - 会渲染多次，性能低。

使用 `Promise.all` 方法，

src\store\features\discover\recommend.ts

```typescript
export const fetchRecommendDataAction = createAsyncThunk(
	'recommendDdata',
	(param, { dispatch }) => {
		//...

		// 榜单
		const rankingIds = [19723756, 3779629, 2884035] // 榜单的 id 列表，用于发送网络请求。
		Promise.all(rankingIds.map(id => getPopularRankingList(id))).then(ress => {
			const res = ress.map(res => res.playlist)
			console.log('popular ranking res:', res)
			dispatch(changePopularRankingsAction(res))
		})
	}
)
```

> 【补充】：理解 `Promise<T>` 中泛型的使用。
>
> `T` 表示传入 `resolve` 的数据类型。

```typescript
new Promise<number>((resolve, reject) => {
	resolve(666)
})
```

### 3.RankingItem 组件

在 `PopularRanking.tsx` 中，创建 `<RankingItem>` 组件。用于编写榜单列表。

并传入榜单数据 `itemData`。

src\views\discover\views\recommend\cpns\popular-ranking\cpns\ranking-item\RankingItem.tsx

```tsx
const RankingItem: FC<IProps> = memo(props => {
	const { itemData } = props
	const { tracks = [] } = itemData

	return (
		<RootWrapper>
			<div className='header'>
				<div className='image'>
					<img src={getImageSize(itemData.coverImgUrl, 80)} alt='' />
					<a className='sprite_cover' href=''></a>
				</div>
				<div className='info'>
					<div className='name'>{itemData.name}</div>
					<div>
						<button className='sprite_02 btn play'></button>
						<button className='sprite_02 btn favor'></button>
					</div>
				</div>
			</div>
			<div className='list'>
				{tracks.slice(0, 10).map((item, index) => (
					<div className='item' key={item.id}>
						<div className='index'>{index + 1}</div>
						<div className='info'>
							<div className='name'>{item.name}</div>
							<div className='operator'>
								<button className='btn sprite_02 play'></button>
								<button className='btn sprite_icon2 add'></button>
								<button className='btn sprite_02 favor'></button>
							</div>
						</div>
					</div>
				))}
			</div>
			<div className='footer'>
				<a href='#/discover/ranking'>查看全部 &gt;</a>
			</div>
		</RootWrapper>
	)
})
```

调整样式。

src\views\discover\views\recommend\cpns\popular-ranking\cpns\ranking-item\style.ts
