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
