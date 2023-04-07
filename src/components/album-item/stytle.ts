import styled from 'styled-components'

export default styled.div`
  width: 118px;
  height: 150px;
  margin-top: 20px;
  background-position: -260px 100px;

  .top {
    position: relative;
    overflow: hidden;

    img {
      width: 100px;
      height: 100px;
    }

    .cover {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background-position: 0 -570px;
    }

    .play {
      display: none;
      position: absolute;
      right: 25px;
      bottom: 5px;
      width: 22px;
      height: 22px;
      background-position: 0 -85px;
    }

    &:hover {
      .play {
        display: block;
      }
    }
  }

  .bottom {
    font-size: 12px;
    width: 100px;
    margin-top: 5px;
    line-height: 18px;

    .name {
      color: #000;
      ${props => props.theme.mixin.textNoWrap}
    }

    .artist {
      color: #666;
      ${props => props.theme.mixin.textNoWrap}
    }
  }
`
