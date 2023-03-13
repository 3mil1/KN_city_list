import { css } from '@emotion/react';
import styled from '@emotion/styled';

export type AvailableGutterValues =
  | 4
  | 6
  | 8
  | 10
  | 12
  | 16
  | 18
  | 20
  | 24
  | 32
  | 40
  | 48
  | 60
  | 80
  | 100
  | 140;

export interface StyledGutterProps {
  size: AvailableGutterValues;
}

export const Gutter = styled.div<StyledGutterProps>`
  ${({ size }) => css`
    min-height: ${size}px;
    min-width: ${size}px;
  `}
`;
