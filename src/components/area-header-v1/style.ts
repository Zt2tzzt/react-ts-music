import styled from 'styled-components'

const AreaHeaderV1Wrapper = styled.header`
  height: 33px;
  border-bottom: 2px solid #c10d0c;
  box-sizing: border-box;
  padding: 0 18px 4px 34px;
  margin-bottom: 5px;
  background-position: -225px -156px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .left {
    display: flex;
    align-items: center;

    .title {
      font-size: 20px;
      font-family: 'Microsoft Yahei', Arial, Helvetica, sans-serif;
      margin-right: 20px;
      font-weight: normal;
    }

    .keywords {
      display: flex;
      align-items: center;

      .item {
        position: relative;
        top: 2px;

        .link:hover {
          cursor: pointer;
          text-decoration: underline;
        }

        .divider {
          margin: 0 13px;
          color: #ccc;
        }

        &:last-child {
          .divider {
            display: none;
          }
        }
      }
    }
  }

  .right {
    position: relative;
    top: 4px;
    left: 8px;
    display: flex;
    align-items: center;

    .more:hover {
      text-decoration: underline;
      color: #333;
    }

    .icon {
      display: inline-block;
      width: 12px;
      height: 12px;
      margin-left: 4px;
      background-position: 0 -240px;
    }
  }
`

export default AreaHeaderV1Wrapper
