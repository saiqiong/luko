import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';
import { colors } from 'theme/colors';

const Trash = ({
  width = 12,
  height = 15,
  color = colors.grey.white,
  ...props
}: SvgProps) => (
  <Svg
    width={width}
    height={height}
    fill="none"
    viewBox={`0 0 ${width} ${height}`}
    {...props}>
    <Path
      fill={color}
      fillRule="evenodd"
      d="M5.5 0h1c.344 0 .547.25.75.5.203.25.406.5.75.5h3a1 1 0 1 1 0 2h-.08c0 .025 0 .05-.003.077l-.846 11a1 1 0 0 1-.997.923H2.926a1 1 0 0 1-.997-.923l-.846-11A1.016 1.016 0 0 1 1.08 3H1a1 1 0 0 1 0-2h3c.344 0 .547-.25.75-.5.203-.25.406-.5.75-.5ZM3.061 4.552a.497.497 0 0 1 .988-.11l.89 8.006a.497.497 0 1 1-.988.11l-.89-8.006ZM8.445 4c.296 0 .526.257.494.552l-.89 8.006a.497.497 0 1 1-.988-.11l.89-8.006A.497.497 0 0 1 8.445 4Z"
      clipRule="evenodd"
    />
  </Svg>
);

export { Trash };
