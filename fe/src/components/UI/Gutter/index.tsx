'use-client';

import * as Styled from './index.style';

export interface GutterProps {
    size: Styled.AvailableGutterValues;
}

export const Gutter = ({ size, ...rest }: GutterProps) => {
    return <Styled.Gutter size={size} {...rest} />;
};

export default Gutter;
