import styled from 'styled-components'

const RecommendWrapper = styled.section`
  > .content {
    border: 1px #d3d3d3 solid;
    background-image: url(${require('@/assets/img/wrap-bg.png')});
    display: flex;

    > .left {
      width: 729px;
      box-sizing: border-box;
      padding: 20px;
    }

    > .right {
      width: 250px;
      margin-left: 1px;
    }
  }
`

export default RecommendWrapper
