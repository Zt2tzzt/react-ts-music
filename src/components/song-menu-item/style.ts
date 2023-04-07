import styled from 'styled-components'

const SongMenuItemWrapper = styled.div`
  width: 140px;
  margin: 15px 0;

  .top {
    position: relative;

    & > img {
      width: 140px;
      height: 140px;
    }

    .cover {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-position: 0 0;

      &:hover {
        cursor: pointer;
      }

      .info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-sizing: border-box;
        padding: 0 10px;
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        background-position: 0 -537px;
        color: #ccc;
        height: 27px;

        &:hover {
          cursor: auto;
        }

        .headset {
          position: relative;
          top: 2px;
          margin-right: 5px;
          display: inline-block;
          width: 14px;
          height: 11px;
          background-position: 0 -24px;
        }
        .play {
          display: inline-block;
          width: 16px;
          height: 17px;
          background-position: 0 0;

          &:hover {
            cursor: pointer;
            background-position: 0 -60px;
          }
        }
      }
    }
  }

  .bottom {
    font-size: 14px;
    color: #000;
    margin-top: 5px;
    line-height: 1.4;

    &:hover {
      text-decoration: underline;
      cursor: pointer;
    }
  }
`

export default SongMenuItemWrapper
