import styled from 'styled-components';
import { Colors } from '../constants/Colors';

export const TypewriterContainer = styled.p`
  span.cursor-type {
    display: inline-block;
    background-color: inherit;
    margin-left: 0.1rem;
    width: 3px;
    animation: tr-blink-type 1s infinite;
  }
  span.cursor.typing {
    animation: none;
  }

  @keyframes tr-blink-type {
    0% {
      background-color: ${Colors.black};
    }
    49% {
      background-color:  ${Colors.black};
    }
    50% {
      background-color: transparent;
    }
    99% {
      background-color: transparent;
    }
    100% {
      background-color:  ${Colors.black};
    }
  }
`;

TypewriterContainer.propTypes = {
};
