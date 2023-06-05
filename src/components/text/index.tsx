import React, { PropsWithChildren } from 'react';
import { Text as RNText, TextProps } from 'react-native';
import { colors } from 'src/theme/colors';
import { TFontStyle, fonts } from 'theme/fonts';

export type TFontSize = 13 | 15 | 17 | 19 | 34;
type TLineHeight = 17 | 20 | 24 | 26 | 42;

const fontHeight: Record<TFontSize, TLineHeight> = {
  13: 17,
  15: 20,
  17: 24,
  19: 26,
  34: 42,
};

export interface ITexts
  extends PropsWithChildren<Pick<TextProps, 'numberOfLines'>> {
  size: TFontSize;
  fontStyle?: TFontStyle;
  color?: string;
  align?: 'left' | 'center' | 'right';
}

const Text: React.FC<ITexts> = ({
  size,
  fontStyle = 'regular',
  color = colors.grey[300],
  align,
  ...props
}) => {
  const style = {
    fontSize: size,
    lineHeight: fontHeight[size],
    color: color,
    fontFamily: fonts[fontStyle],
    textAlign: align,
  };

  return <RNText {...props} style={style} />;
};

const Title: React.FC<PropsWithChildren> = ({ children }) => (
  <Text size={34} fontStyle="bold" color={colors.grey[900]}>
    {children}
  </Text>
);

export { Text, Title };
