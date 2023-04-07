import styled from 'styled-components'

export default styled.section`
  padding: 20px;

  .artists {
    .item {
      display: flex;
      height: 62px;
      margin-top: 14px;
      background-color: #fafafa;
      text-decoration: none;

      &:hover {
        background-color: #f4f4f4;
      }

      img {
        width: 62px;
        height: 62px;
      }

      .info {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        padding: 3px 12px;
        border: 1px #e9e9e9 solid;
        border-left: none;
        overflow: hidden;

        .name {
          font-size: 14px;
          font-weight: bold;
          color: #000;
        }

        .alias {
          font-size: 12px;
          color: #666;
          ${prop => prop.theme.mixin.textNoWrap}
        }
      }
    }
  }

  .apply-for {
    margin-top: 12px;
    a {
      color: #333;
      font-weight: bold;
      text-align: center;
      display: block;
      height: 31px;
      line-height: 31px;
      border-radius: 4px;
      background-color: #fafafa;
      border: 1px #c3c3c3 solid;
      text-decoration: none;

      &:hover {
        background-color: #fff;
      }
    }
  }
`
