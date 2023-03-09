import styled from 'styled-components'

export const AppHeaderWrapper = styled.header`
	height: 75px;
	background-color: #242424;
	font-size: 14px;
	color: #fff;

	.content {
		display: flex;
		justify-content: space-between;
	}

	.divider {
		height: 5px;
		background-color: #c20c0c;
	}
`

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
				box-sizing: border-box;
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

	.sign-in {
		&:hover {
			text-decoration: underline;
			color: #fff;
			cursor: pointer;
		}
	}
`
