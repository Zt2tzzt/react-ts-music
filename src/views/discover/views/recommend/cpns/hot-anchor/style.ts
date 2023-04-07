import styled from 'styled-components'

export default styled.section`
  padding: 20px;
  .anchors {
    margin-top: 20px;

    .item {
      display: flex;
      margin-bottom: 10px;
      width: 210px;
      .image {
        img {
          width: 40px;
          height: 40px;
        }
      }

      .info {
        flex: 1;
        margin-left: 8px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
        .name {
          color: #000;
          font-weight: bold;
          margin-top: 3px;
        }

        .position {
          width: 160px;
          color: #666;
          ${prop => prop.theme.mixin.textNoWrap}
        }
      }
    }
  }
`
