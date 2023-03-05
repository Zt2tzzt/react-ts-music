# 一、项目搭建

## 1.axios 配置

1.安装 *axios*

```shell
npm i axios
```

2.将基于 *axios* 封装好的网络请求代码放入项目中。

3.将第三层封装中，interceptor 携带 token 的代码暂时注释掉。

## 2.区分环境（webpack）

webpack 中如何区分环境？有三种方式：

### 1.手动切换

在项目打包前，通过手动的注释代码，来区分环境（不推荐）。

src\service\request\config.ts

```typescript
// export const BASE_URL = 'http://codercba.dev:8000'
 export const BASE_URL = 'http://codercba.prod:8000'
```

### 2.环境变量

项目中使用该方案。

1.通过环境变量 `process.env.NODE_ENV` 进行区分，它的类型为：`'development' | 'production' | 'test'`（联合类型）。

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

将项目打包 允许如下命令

```shell
npm run build
```

发现终端给出提示，需要执行如下命令，去创建一个本地服务。

```shell
npm install -g server

serve -s build # 启动本地服务，并指定 build 目录下的文件，作为资源。
```

### 3.配置文件

在根目录编写以下文件，其中定义的变量，必须以 “`REACT_APP_`” 前缀开头，才能被 webpack 读取。

.env.development

```
REACT_APP_BASE_URL = HAHA
```

.env.production

```
REACT_APP_BASE_URL = 'HEHE'
```

index.ts

```typescript
// 加载
console.log(process.env.REACT_APP_BASE_URL)
```

### 4.补充（类型）

`process.env` 的类型来自于 `src\react-app-env.d.ts` 文件所引用的位置。

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

但这样做不好，不要去修改源码。而是在 `src\react-app-env.d.ts` 中进行声明

```typescript
declare namespace NodeJS {
	interface ProcessEnv {
		readonly REACT_APP_BASE_URL: string
	}
}
```

## 3.API 文档

阅读 [项目 API 文档](http://codercba.com:9002)，将 `BASE_URL` 改为该地址。

## 4.网络请求测试

在 `Recommend.tsx` 中发送网络请求，进行 *axios* 的测试。

给 `useState` 传入类型。使用 `useState<T>`

src\views\discover\recommend\Recommend.tsx

```typescript
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

## 5.补充（类组件类型）

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

3.1.将 `state` 写在类组件的成员变量中，进行初始化，代码更加简洁（不用谢 `constructor`）。

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

此时，需要使用 propsTypes 对 Demo 组件做 prop 类型验证。除非关闭 eslint 警告。

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

它的库本身没有类型声明，需要引入第三方类型声明。

```shell
npm i --save-dev @types/styled-components
```

3.创建 `AppHeaderWrapper`，为 `AppHeader.tsx` 设置样式，将内容居中，使用混入。

src\components\app-header\app-header-style.ts

```typescript
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

5.在 `index.tsx` 中，使用 `ThemeProvider`

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

---

在 AppHeader 中加入 HeaderLeft 和 HeaderRight

在 HeaderLeft 中，编写 logo，拷贝以前的样式。

---

在 AppHeader 中，编写导航。

将导航对应的路径，放入到一个 jassetes/data/header-titles.son 文件中。

react 脚手架，默认有 json 文件的声明。在 AppHeader.tsx 中引入 json 文件。

遍历 json 文件，判断是 Link 还是 a 元素。

将样式拷贝过来，并做调整。

---

在 AppHeader 中，为选中的 title 加上选中效果。

方案一：使用 useState 记录（错误的方案，页面刷新后，状态消失）

方案二：使用 NavLink（项目中采用）。

---

在 AppHeadert 中，HeaderRight 中，编写搜索框。使用 AntDesign 中的组件。

安装 AntDesign 库。

```shell
npm install antd
```

antDesign 采用 tree shaking 模式，没有按需引入。

安装 Antdesign 的图标库。

```shell
npm install --save @ant-design/icons
```

使用 Antdesign 的 Input 组件，编写搜索框，并在前面加上图标。

调整样式。

---

在 Discover 页面中，分为两部分内容，header 和 content。

同样将 header 中的 titles 放到 json 文件中。

遍历 json 文件中的 titles，使用 NavLink 作为导航元素。

调整样式。

---

在 Discover 中，编写轮播图。

发送网络请求，采用分层架构，但目录按照业务来划分。

在 recommend 目录下创建 service 文件夹。

创建 recommend 的 store，在其中发送网络请求，使用 createAsyncThunk。

回顾两种处理异步 action 的方案。使用第二种发难。

---

将轮播图封装成一个组件。

封装成 TopBanner 组件。

从 store 中获取轮播图数据。

网易云音乐服务器图片资源管理很好：在 url 后跟上参数，可改变图片的尺寸和高斯模糊。

---

TopBanner 中，分三个区域：BannerLeft，BannerControl，BannerRight。

在 BannerLeft 中，使用 AntDesign 的走马灯组件 Carousel。

在 BannerRight 中，使用编写下载客户端的背景图片。

在 BannerControl 中，编写箭头，并做绝对定位。

---

在 TopHeader 中，点击箭头，轮播图切换。

使用 useRef，获取 Carousel 组件对象。使用 `ElementRef<typeof Carousel>` 获取类型。

调用组件的 prev, next 方法。

---

轮播图切换的淡入，淡出效果编写。

给 Carousel 传入 effect 属性进行控制。

---

给整个 BannerWrapper 设置背景。使用轮播图模糊后的背景。

background-size 设置为 6000px.模糊：40 * 20

使用 carsoule 的 afterChange 事件，获取当前轮播图的索引。设置背景，两种方案：

- BannerWrapper 的行内样式。
- 给 bannerWrapper 传入属性。

---

自定义轮播图指示器。

使用 classnames 库，为指示器动态添加 class。

安装 classnames 库