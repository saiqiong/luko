import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';
import { colors } from 'theme/colors';

const Camera = ({
  width = 44,
  height = 32,
  color = colors.blue.main,
  ...props
}: SvgProps) => (
  <Svg width={width} height={height} fill="none" {...props}>
    <Path fill={color} d="M22 26a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z" />
    <Path
      fill={color}
      fillRule="evenodd"
      d="M27.172 1.172A4 4 0 0 0 24.343 0h-4.686a4 4 0 0 0-2.829 1.172l-1.656 1.656A4 4 0 0 1 12.343 4H4a4 4 0 0 0-4 4v20a4 4 0 0 0 4 4h36a4 4 0 0 0 4-4V8a4 4 0 0 0-4-4h-8.343a4 4 0 0 1-2.829-1.172l-1.656-1.656ZM34 18c0 6.627-5.373 12-12 12s-12-5.373-12-12S15.373 6 22 6s12 5.373 12 12Zm4-10a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"
      clipRule="evenodd"
    />
    <Path fill={color} d="M8 0a2 2 0 0 1 2 2H6a2 2 0 0 1 2-2Z" />
  </Svg>
);

export { Camera };
