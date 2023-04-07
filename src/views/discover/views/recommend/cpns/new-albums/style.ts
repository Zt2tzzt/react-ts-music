import styled from 'styled-components'

export default styled.section`
  margin-top: 20px;

  > .content {
    height: 186px;
    background-color: #f5f5f5;
    border: 1px #d3d3d3 solid;
    margin: 20px 0 37px;
    box-sizing: border-box;
    padding: 0 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .arrow {
      position: relative;
      top: -12px;
      width: 17px;
      height: 17px;
      cursor: pointer;
    }

    .arrow-left {
      background-position: -260px -75px;

      &:hover {
        background-position: -280px -75px;
      }
    }

    .arrow-right {
      background-position: -300px -75px;

      &:hover {
        background-position: -320px -75px;
      }
    }

    .banner {
      overflow: hidden;
      flex: 1;

      .album-list {
        display: flex;
        justify-content: space-around;
        align-items: center;
      }
    }
  }
`
