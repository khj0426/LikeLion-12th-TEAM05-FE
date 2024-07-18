import {
  Button as FluentUiButton,
  tokens,
  makeStyles,
} from '@fluentui/react-components';
import { ReactNode } from '@tanstack/react-router';
import { ComponentPropsWithoutRef } from 'react';

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  as?: 'a' | 'button';
  icon?: ReactNode;
  shape?: 'circular' | 'square' | 'rounded';
  size?: 'small' | 'medium' | 'large';
}

const useOverrides = makeStyles({
  button: {
    padding: `${tokens.spacingHorizontalM} ${tokens.spacingHorizontalM}`,
    color: '#4B4DED',
    backgroundColor: '#EFEFFD',
    fontWeight: 550,
  },
});

export const Button = ({
  size = 'medium',
  shape = 'rounded',
  icon = null,
  as,
  ...rest
}: ButtonProps) => {
  const overrides = useOverrides();
  return (
    <FluentUiButton
      size={size}
      shape={shape}
      as="button"
      icon={icon}
      {...rest}
      className={rest.className ?? overrides.button}
    >
      {rest.children}
    </FluentUiButton>
  );
};
