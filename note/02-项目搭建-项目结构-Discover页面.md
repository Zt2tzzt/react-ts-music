# 一、项目搭建

## 1.axios 配置

1.安装 *axios*

```shell
npm i axios
```

2.将基于 *axios* 封装好的网络请求代码放入项目中。

3.将第三层封装中，interceptor 携带 token 的代码，暂时注释掉。

## 2.区分环境（webpack）

*webpack* 中如何区分环境？有三种方式：

### 1.手动切换

在项目打包前，通过手动注释代码，来区分环境（不推荐）。

src\service\request\config.ts

```typescript
// export const BASE_URL = 'http://codercba.dev:8000'
export const BASE_URL = 'http://codercba.prod:8000'
```

### 2.环境变量

项目中使用该方案。

1.通过 *webpack* 的环境变量 `process.env.NODE_ENV` 进行区分，

它的类型为：`'development' | 'production' | 'test'`（联合类型）。

src\service\request\config.ts

```typescript
/**
 * 开发环境：development
 * 生产环境：production
 * 测试环境：text
 */
let BASE_URL: string
const TIME_OUT = 25000

console.log('process.env.NODE_ENV:', process.env.NODE_ENV)

switch (process.env.NODE_ENV) {
	case 'development':
		BASE_URL = 'http://codercba.com:9002'
		break
	case 'production':
		BASE_URL = 'http://codercba.com:9002'
		break
}
```

2.进行测试：

将项目打包 执行如下命令：

```shell
npm run build
```

发现终端给出提示，需要创建一个本地服务，执行如下命令：

```shell
npm install -g server

serve -s build # 启动本地服务，并指定 build 目录下的文件，作为资源。
```

### 3.配置文件

在根目录编写以下文件，其中定义的变量，必须以 “`REACT_APP_`” 前缀开头，才能被 *webpack* 读取。

.env.development

```
REACT_APP_BASE_URL = HAHA
```

.env.production

```
REACT_APP_BASE_URL = 'HEHE'
```

index.tsx

```typescript
// 加载
console.log(process.env.REACT_APP_BASE_URL)
```

### 4.补充（类型）

webpack 环境变量 `process.env` 的类型，来自于 `src\react-app-env.d.ts` 文件所引用的位置。

node_modules\react-scripts\lib\react-app.d.ts

```typescript
declare namespace NodeJS {
	interface ProcessEnv {
		readonly NODE_ENV: 'development' | 'production' | 'test'
		readonly PUBLIC_URL: string
	}
}
```

可以在上述位置，声明自定义变量 `REACT_APP_BASE_URL` 的类型；

但这样做不好，不要去修改源码。而是在 `src\react-app-env.d.ts` 中进行重复声明。

```typescript
declare namespace NodeJS {
	interface ProcessEnv {
		readonly REACT_APP_BASE_URL: string
	}
}
```

## 3.API 文档

阅读 [项目 API 文档](http://codercba.com:9002)。

## 4.网络请求测试

在 `Recommend.tsx` 中发送网络请求，进行 *axios* 的测试。

【注意】：给 `useState` 传入类型。使用 `useState<T>`

src\views\discover\recommend\Recommend.tsx

```tsx
interface IProps {
	children?: ReactNode
}

export interface IBannerData {
	imageUrl: string
	targetId: number
	targetType: number
	titleColor: string
	typeTitle: string
	url: string
	exclusive: boolean
	scm: string
	bannerBizType: string
}

const Recommend: FC<IProps> = memo(() => {
	const [banners, setBanners] = useState<IBannerData[]>([])

	useEffect(() => {
		ztRequest.get<{ banners: IBannerData[]; code: number }>({ url: '/banner' }).then(res => setBanners(res.banners))
	})

	return (
		<div>
			{banners.map((item, index) => (
				<div key={index}>{item.imageUrl}</div>
			))}
		</div>
	)
})
```

## 5.类组件类型【补充】

类组件中，TS 要怎么写？

1.普通写法：对 `render` 函数返回值，进行类型约束，使用 `React.ReactNode`

src\views\demo\Demo.tsx

```tsx
import React, { PureComponent } from 'react'

export class demo extends PureComponent {
	render(): React.ReactNode {
		return <div>demo</div>
	}
}

export default demo
```

2.为组件的 `props` 设置类型，给 `PureComponent` 传入泛型类型。

src\views\demo\Demo.tsx

```tsx
import React, { PureComponent } from 'react'

interface IProps {
	name: string
	age: number
}

export class Demo extends PureComponent<IProps> {
	render(): React.ReactNode {
		return (
			<div>
				<h1>name: {this.props.name}</h1>
				<h1>name: {this.props.age}</h1>
			</div>
		)
	}
}

export default Demo
```

3.为组件的 `state` 加上类型约束，同样是给 `PureComponent` 传入泛型类型。

src\views\demo\Demo.tsx

```tsx
import React, { PureComponent } from 'react'

interface IProps {
	name: string
	age: number
}

interface IState {
	msg: string
	count: number
}

export class Demo extends PureComponent<IProps, IState> {
	constructor(props: IProps) {
		super(props)
		this.state = {
			msg: 'haha',
			count: 0
		}
	}

	render(): React.ReactNode {
		return (
			<div>
				<h1>name: {this.props.name}</h1>
				<h1>name: {this.props.age}</h1>
			</div>
		)
	}
}

export default Demo
```

3.1.将 `state` 写在类组件的成员变量中，进行初始化，

这样代码更加简洁（不用写 `constructor`）。

```tsx
import React, { PureComponent } from 'react'

interface IProps {
	name: string
	age: number
}

interface IState {
	msg: string
	count: number
}

export class Demo extends PureComponent<IProps, IState> {
	state = {
		msg: 'haha',
		count: 0
	}

	render(): React.ReactNode {
		return (
			<div>
				<h1>name: {this.props.name}</h1>
				<h1>name: {this.props.age}</h1>
			</div>
		)
	}
}

export default Demo
```

4.`PureComponent` 传入的第三个泛型类型（很少用），

用于定义生命周期 `getSnapshotBeforeUpdate` 的返回值类型。

它的返回值，用于 `componentDidUpdate` 生命周期的第三个参数。

此时，需要使用 `propsTypes` 对 Demo 组件的 prop 做类型验证。除非关闭 eslint 警告。

```tsx
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

interface IProps {
	name: string
	age: number
}

interface IState {
	msg: string
	count: number
}

interface ISnaptShot {
	address: string
}

export class Demo extends PureComponent<IProps, IState, ISnaptShot> {
	state = {
		msg: 'haha',
		count: 0
	}

	static propTypes = {
		name: PropTypes.string,
		age: PropTypes.number
	}

	getSnapshotBeforeUpdate(prevProps: Readonly<IProps>, prevState: Readonly<IState>) {
		console.log(prevProps)
		console.log(prevState)

		return { address: 'LA' }
	}

	componentDidUpdate(
		prevProps: Readonly<IProps>,
		prevState: Readonly<IState>,
		snapshot?: ISnaptShot | undefined
	): void {
		console.log(prevProps)
		console.log(prevState)
		console.log(snapshot)
	}

	render(): React.ReactNode {
		return (
			<div>
				<h1>name: {this.props.name}</h1>
				<h1>name: {this.props.age}</h1>
			</div>
		)
	}
}

export default Demo
```

## 6.状态管理（类型）

使用 RTK 配置状态管理。

1.` createSlice` 中 `initialState` 一般不需要指定类型，可以自动推导。

如果手动指定类型，那么类型更加明确

- 比如推导出 string，手动指定可以是联合类型。

```typescript
type DirectionType = 'left' | 'right' | 'down' | 'up'

interface IState {
	count: number
	message: string
	address: string
	height: number
	direction: DirectionType
}

const initialState: IState = {
	count: 100,
	message: 'hello redux',
	address: '深圳市',
	height: 1.88,
	direction: 'left'
}

const counterSlice = createSlice({
	name: 'counter',
	initialState,
	reducers: {
		changeMessageAction(state, { payload }) {
			state.message = payload
		}
	}
})
```

2.`reducers` 中的方法，`action` 参数中 `payload` 属性的类型指定：

需要使用到 `PyloadAction` 泛型类型。

```typescript
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

//...

const counterSlice = createSlice({
	name: 'counter',
	initialState,
	reducers: {
		changeMessageAction(state, { payload }: PayloadAction<string>) {
			state.message = payload
		}
	}
})
```

# 二、项目结构搭建

在 component 目录下创建 `AppHeader.tsx` 和 `AppFooter.tsx` 两个组件。

在 `App.tsx` 中应用。

src\App.tsx

```tsx
function App() {
	return (
		<div className='App'>
			<AppHeader></AppHeader>
			<Suspense>
				<div className='main'>{useRoutes(routes)}</div>
			</Suspense>
			<AppFooter></AppFooter>
		</div>
	)
}
```

## 1.AppHeader 组件

在 `AppHeader.tsx` 中调整样式。使用 *styled-components*

1.安装 *style-component*

```shell
npm install styled-components -D
```

2.*style-component* 在 ts 中使用，需要声明模块。

它的库本身没有类型声明，需要安装第三方类型声明。

```shell
npm i --save-dev @types/styled-components
```

3.创建 `AppHeaderWrapper`，为 `AppHeader.tsx` 设置样式，将内容居中，使用混入。

src\components\app-header\app-header-style.ts

```less
import styled from 'styled-components'

const AppHeaderWrapper = styled.header`
	height: 75px;
	background-color: #242424;
	font-size: 14px;
	color: #fff;
`
export default AppHeaderWrapper
```

src\components\app-header\AppHeader.tsx

```tsx
import AppHeaderWrapper from './app-header-style'
//...
const AppHeader: FC<IProps> = memo(() => {
	return (
		<AppHeaderWrapper>
      {/*...*/}
		</AppHeaderWrapper>
	)
})
```

4.在 `assetes/theme` 下创建主题，其中包括用于混入样式代码。

src\assets\theme\index.ts

```typescript
const theme = {
	color: {
		primary: '#C20C0C',
		secondary: ''
	},
	size: {},
	misin: {
		wrapv1: `
      width: 1100px;
      margin: 0 auto
    `
	}
}

export default theme
```

5.在 `index.tsx` 中，使用 `<ThemeProvider>`，提供 `theme`。

src\index.tsx

```tsx
import { ThemeProvider } from 'styled-components'
import theme from './assets/theme'
//...
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<ThemeProvider theme={theme}>
				<HashRouter>
					<App />
				</HashRouter>
			</ThemeProvider>
		</Provider>
	</React.StrictMode>
)
```

在 `AppHeader.tsx` 中加入 `<HeaderLeftWrapper>` 和 `<HeaderRightWrapper>` 区域。

### 1.HeaderLeft 区域

在 `<HeaderLeftWrapper>` 中：

- 编写 logo，拷贝以前的样式。
- 编写导航元素，使用 `<NavLink>` 或 `<a>`。

将导航对应的路径，放入到一个 `assetes/data/header-titles.son` 文件中。

在 `AppHeader.tsx` 中引入 json 文件。

> 【注意】：react 脚手架创建的 ts 项目，默认有 json 文件的模块声明。

遍历 json 文件导出的列表，根据 `type`，判断是使用 `<NavLink>` 还是 `<a>` 元素。

src\components\app-header\AppHeader.tsx

```tsx
const AppHeader: FC<IProps> = memo(() => {

	return (
		<AppHeaderWrapper>
			<div className='content wrap_v1'>
				<HeaderLeftWrapper>
          {/* logo */}
					<a className='logo sprite_01' href='/'>
						网易云音乐
					</a>
          {/* 一级路由 */}
					<div className='title-list'>
						{headerTitles.map(item => (
							<div className='item' key={item.title}>
								{item.type === 'path' ? (
									<NavLink to={item.link} className={({ isActive }) => (isActive ? 'active' : undefined)}>
										{item.title}
										<i className='icon sprite_01'></i>
									</NavLink>
								) : item.type === 'link' ? (
									<a href={item.link} rel='noreferrer' target='_blank'>
										{item.title}
									</a>
								) : undefined}
							</div>
						))}
					</div>
				</HeaderLeftWrapper>
			</div>
		</AppHeaderWrapper>
	)
})
```

将样式拷贝过来，并做调整。

为什么用 `<NavLink>` 而不是 `<Link>`

因为在为选中的 title 加上选中效果时，有两种方案：

方案一：使用 `useState` 记录选中 title 的 index

- 缺点：页面刷新后，无法根据当前 url，匹配到激活的 link，除非封装工具函数进行匹配，这样做太麻烦；

方案二：使用 `<NavLink>`（项目中采用）。

src\components\app-header\style.ts

```less
export const HeaderLeftWrapper = styled.div`
	display: flex;

	.logo {
		display: block;
		width: 176px;
		height: 70px;
		background-position: 0 0;
		text-indent: -9999px;
	}

	.title-list {
		display: flex;
		line-height: 70px;

		.item {
			position: relative;

			a {
				display: block;
				padding: 0 20px;
				color: #ccc;
			}

			:last-of-type a {
				position: relative;
				::after {
					position: absolute;
					content: '';
					width: 28px;
					height: 19px;
					background-image: url(${require('@/assets/img/sprite_01.png')});
					background-position: -190px 0;
					top: 20px;
					right: -15px;
				}
			}

			&:hover a,
			.active {
				color: #fff;
				background-color: #000;
			}

			.active .icon {
				position: absolute;
				display: inline-block;
				width: 12px;
				height: 7px;
				bottom: -1px;
				left: 50%;
				transform: translateX(-50%);
				background-position: -226px 0;
			}
		}
	}
`
```

### 2.HeaderRight 区域

在 `<HeaderRightWrapper>` 中，编写搜索框。使用 *AntDesign* 中的组件。

1.安装 *AntDesign* 库。

```shell
npm install antd
```

> 【注意】：*AntDesign* 和 *Material UI* 都采用“tree shaking”模式，
>
> 使用 ESModule 直接引入即可，无需做按需引入的配置。

2.安装 *Antdesign* 的图标库。

```shell
npm install --save @ant-design/icons
```

3.使用 *Antdesign* 的 `<Input>` 组件，编写搜索框，

在 `<Input>` 组件前面加上图标，使用 `prefix` 属性。

src\components\app-header\AppHeader.tsx

```tsx
//...
<HeaderRightWrapper>
  <Input
    // onFocus={onFoucs}
    className='search'
    placeholder='音乐/视频/电台/用户'
    prefix={<SearchOutlined></SearchOutlined>}
  ></Input>
  <span className='center'>创作者中心</span>
  <span className='sign-in'>登录</span>
</HeaderRightWrapper>
//...
```

调整样式。

src\components\app-header\style.ts

```less
export const HeaderRightWrapper = styled.div`
	display: flex;
	align-items: center;
	color: #787878;
	font-size: 12px;

	> .search {
		width: 158px;
		height: 32px;
		border-radius: 16px;

		input::placeholder {
			font-size: 12px;
		}
	}

	.center {
		width: 90px;
		height: 32px;
		line-height: 32px;
		margin: 0 16px;
		text-align: center;
		border: 1px #666 solid;
		border-radius: 16px;
		color: #ccc;
		cursor: pointer;

		&:hover {
			color: #fff;
			border-color: #fff;
		}
	}
`
```

## 2.Discover 页面

在 `Discover.tsx` 页面中，分为两部分内容，header 和 content。

### 1.header 区域（NavBar）

在 `Discover.tsx` 中，创建 `NavBar.tsx`，用来表示 header 区域。

同样将 header 中的 titles 放到 json 文件中。

src\assets\data\discover-titles.json

遍历 json 文件中的 titles，使用 `<NavLink>` 作为导航元素。

src\views\discover\Discover.tsx

```tsx
const Discover: FC<IProps> = memo(() => {
	return (
		<div>
			<NavBar></NavBar>
			<Suspense>
				<Outlet></Outlet>
			</Suspense>
		</div>
	)
})
```

src\views\discover\cpns\nav-bar\NavBar.tsx

```tsx
import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import NavBarWrapper from './style'
import discoverTitles from '@/assets/data/discover-titles.json'
import { NavLink } from 'react-router-dom'

interface IProps {
	children?: ReactNode
}
const NavBar: FC<IProps> = memo(() => {
	return (
		<NavBarWrapper>
			<div className='nav wrap_v1'>
				{discoverTitles.map(item => (
					<div className='item' key={item.link}>
						<NavLink to={item.link}>{item.title}</NavLink>
					</div>
				))}
			</div>
		</NavBarWrapper>
	)
})
```

调整样式

src\views\discover\cpns\nav-bar\style.ts

```less
import styled from 'styled-components'

const NavBarWrapper = styled.nav`
	height: 30px;
	background-color: ${props => props.theme.color.primary};

	.nav {
		display: flex;
		padding-left: 360px;
		position: relative;
		top: -4px;

		.item {
			a {
				display: inline-block;
				height: 20px;
				line-height: 20px;
				padding: 0 13px;
				margin: 7px 17px 0;
				color: #fff;
				font-size: 12px;

				&:hover,
				&.active {
					background-color: #9b0909;
					border-radius: 20px;
				}
			}
		}
	}
`

export default NavBarWrapper
```

### 2.Content 区域

发送网络请求，采用分层架构，但目录按照业务来划分。

【注意】：另一种分层架构模式。

- 在组件目录（如 recommend 目录）下创建 service 、store 目录，对该组件相关的网络请求，状态管理做分层架构。
- 项目中未采用这种分层架构。

```shell
discover
└─views
    ├─alibum
    ├─artist
    ├─djradio
    ├─ranking
    ├─recommend
    └─songs
```

#### 1.Recommend.tsx 页面

##### 1.轮播图组件 TopBanners.tsx

创建 recommend 的 store，在其中发送网络请求，使用 `createAsyncThunk`。

src\store\features\discover\recommend.ts

```typescript
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { IBanner } from '@/types'
import { getBanners } from '@/service/features/discover/recommend'

const initialState: {
	banners: IBanner[]
} = {
	banners: []
}

const recommendSlice = createSlice({
	name: 'recommend',
	initialState,
	reducers: {
		changeBannersAction(state, { payload }) {
			state.banners = payload
		}
	}
})

export const fetchBannerDataAction = createAsyncThunk('banners', (param, { dispatch }) => {
	getBanners().then(res => {
		dispatch(changeBannersAction(res.banners))
	})
})

export const { changeBannersAction } = recommendSlice.actions
export default recommendSlice.reducer
```

> 【回顾】：两种处理异步 action 的方案。项目中使用第二种方案。

在 `Recommend.tsx` 中发送网络请求，请求 `banners` 数据，保存到 store 中。

src\views\discover\views\recommend\Recommend.tsx

```tsx
import React, { memo, useEffect } from 'react'
import type { FC, ReactNode } from 'react'
import { fetchBannerDataAction } from '@/store/features/discover/recommend'
import TopBanners from './cpns/top-banners/TopBanners'
import { useAppDispatch } from '@/store'

interface IProps {
	children?: ReactNode
}
const Recommend: FC<IProps> = memo(() => {
  // 发送请求
	const dispatch = useAppDispatch()
	useEffect(() => {
		dispatch(fetchBannerDataAction())
	}, [])

	return (
		<div>
			<TopBanners></TopBanners>
		</div>
	)
})

Recommend.displayName = 'Recommend'

export default Recommend
```

将轮播图封装成一个组件 `TopBanners.tsx`。

从 store 中获取轮播图数据。

src\views\discover\views\recommend\cpns\top-banners\TopBanners.tsx

```typescript
const { banners } = useAppSelector(
  state => ({
    banners: state.recommend.banners
  }),
  shallowEqual
)
```

`TopBanner.tsx` 中，分三个区域：BannerLeft，BannerRight，BannerControl。

在 BannerLeft 中，使用 AntDesign 的走马灯组件 `<Carousel>`。

在 BannerRight 中，使用编写下载客户端的背景图片。

在 BannerControl 中，编写箭头，作为轮播图的控制器，并做绝对定位。

src\views\discover\views\recommend\cpns\top-banners\TopBanners.tsx

```tsx
<TopBannersWrapper style={{ background: `url('${bgImgUrl}') center center / 6000px` }}>
  <div className='banner wrap_v2'>
    
    <BannerLeftWrapper>
      {/* 轮播图 */}
      {/* 轮播图切换的淡入，淡出效果编写。传入 effect 属性进行控制。*/}
      <Carousel
        autoplay
        dots={false}
        autoplaySpeed={3000}
        effect='fade'
        ref={carouselRef}
        beforeChange={onCarouselBeforechange}
      >
        {banners.map(item => (
          <div className='banner-item' key={item.imageUrl}>
            <img className='image' src={item.imageUrl} alt={item.typeTitle} />
          </div>
        ))}
      </Carousel>
      {/* 轮播图指示器 */}
      <ul className='dots'>
        {banners.map((item, index) => (
          <li key={item.imageUrl}>
            <span className={classNames('item', { active: index === currentIndex })}></span>
          </li>
        ))}
      </ul>
    </BannerLeftWrapper>
    
    {/*下载客户端*/}
    <BannerRightWrapper>
      <p>PC 安卓 iPhone WP iPad Mac 六大客户端</p>
    </BannerRightWrapper>
    
    {/*箭头控制器*/}
    <BannerControlWrapper>
      <button className='btn left' onClick={onPrevClick}></button>
      <button className='btn right' onClick={onNextClick}></button>
    </BannerControlWrapper>
    
  </div>
</TopBannersWrapper>
```

在 `TopHeader.tsx` 中，点击箭头，轮播图切换。

使用 `useRef`，获取 `<Carousel>` 组件对象。使用 `ElementRef<typeof Carousel>` 获取它的类型。

调用组件的 `prev`, `next` 方法。

src\views\discover\views\recommend\cpns\top-banners\TopBanners.tsx

```typescript
//...
const carouselRef = useRef<ElementRef<typeof Carousel>>(null)
//...
const onPrevClick = () => {
  carouselRef.current?.prev()
}
const onNextClick = () => {
  carouselRef.current?.next()
}
```

给整个 `<TopBannerWrapper>` 设置背景。使用轮播图模糊后的背景。

`background-size` 设置为 `6000px`.模糊：`40 * 20`

src\views\discover\views\recommend\cpns\top-banners\TopBanners.tsx

```tsx
const TopBanners: FC<IProps> = memo(() => {
	//...
	let bgImgUrl = ''
	if (currentIndex >= 0 && banners.length > 0) {
		bgImgUrl = banners[currentIndex].imageUrl + '?imageView&blur=40x20'
	}
	return (
		<TopBannersWrapper style={{ background: `url('${bgImgUrl}') center center / 6000px` }}>
      {/*...*/}
		</TopBannersWrapper>
	)
})
```

> 【注意】：网易云音乐服务器图片资源管理很好：在图片 url 后跟上参数，可改变图片的尺寸和高斯模糊。

使用 `<Carsoule>` 的 `beforeChange` 事件，获取当前轮播图的索引。

使用该索引，设置背景，两种方案：

- BannerWrapper 的行内样式（项目中采用）。
- 给 bannerWrapper 传入属性。

src\views\discover\views\recommend\cpns\top-banners\TopBanners.tsx

```tsx
// 走马灯，切换前，事件
const onCarouselBeforechange = useCallback(
  (from: number, to: number) => {
    setCurrentIndex(to)
  },
  [currentIndex]
)

//...

let bgImgUrl = ''
if (currentIndex >= 0 && banners.length > 0) {
  bgImgUrl = banners[currentIndex].imageUrl + '?imageView&blur=40x20'
}

//...
<TopBannersWrapper style={{ background: `url('${bgImgUrl}') center center / 6000px` }}>
  <div className='banner wrap_v2'>
    <Carousel
      autoplay
      dots={false}
      autoplaySpeed={3000}
      effect='fade'
      ref={carouselRef}
      beforeChange={onCarouselBeforechange}
    >
      {banners.map(item => (
        <div className='banner-item' key={item.imageUrl}>
          <img className='image' src={item.imageUrl} alt={item.typeTitle} />
        </div>
      ))}
    </Carousel>
    {/*...*/}
  </div>
</TopBannersWrapper>
```

自定义轮播图指示器。

在 `<Carousel>` 组件上，设置 `dots={false}`，关闭自带的指示器。

使用 *classnames* 库：

```shell
npm i classnames
```

为指示器动态添加 `active` class。

src\views\discover\views\recommend\cpns\top-banners\TopBanners.tsx

```tsx
<BannerLeftWrapper>
  {/* 轮播图 */}
  <Carousel
    autoplay
    dots={false}
    autoplaySpeed={3000}
    effect='fade'
    ref={carouselRef}
    beforeChange={onCarouselBeforechange}
  >
    {banners.map(item => (
      <div className='banner-item' key={item.imageUrl}>
        <img className='image' src={item.imageUrl} alt={item.typeTitle} />
      </div>
    ))}
  </Carousel>
  {/* 轮播图指示器 */}
  <ul className='dots'>
    {banners.map((item, index) => (
      <li key={item.imageUrl}>
        <span className={classNames('item', { active: index === currentIndex })}></span>
      </li>
    ))}
  </ul>
</BannerLeftWrapper>
```

src\views\discover\views\recommend\cpns\top-banners\style.ts

```less
export const BannerLeftWrapper = styled.div`
	position: relative;
	width: 730px;
	height: 100%;

	.banner-item {
		overflow: hidden;
		height: 285px;
		.image {
			height: 285px;
			width: 100%;
		}
	}

	.dots {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		margin: 0 auto;
		display: flex;
		justify-content: center;

		> li {
			margin: 0 2px;

			.item {
				display: inline-block;
				width: 20px;
				height: 20px;
				background: url(${require('@/assets/img/banner_sprite.png')}) 3px -343px;
				cursor: pointer;

				&:hover,
				&.active {
					background-position: -14px -343px;
				}
			}
		}
	}
```

