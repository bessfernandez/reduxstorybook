import * as React from 'react';
import classnames from 'classnames';

// @ts-ignore
import * as styles from './style.css';

export enum ButtonType {
  BUTTON = 'button',
  RESET = 'reset',
  SUBMIT = 'submit',
}

export enum ButtonTheme {
  DEFAULT = 'default',
  ROUNDED = 'rounded',
}

export enum ButtonSize {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
}

interface Props {
  type?: ButtonType.SUBMIT | ButtonType.RESET | ButtonType.BUTTON;
  theme?: string;
  size?: string;
  onClick?: React.MouseEventHandler;
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

const defaultProps: Props = {
  type: ButtonType.BUTTON,
  theme: ButtonTheme.DEFAULT,
  size: ButtonSize.MEDIUM,
  onClick: () => {},
  className: '',
  disabled: false,
};

const Button: React.FunctionComponent<Props> = (props: Props) => {
  const { type, onClick, children, theme, size, className, disabled } = props;
  const classProps: string = classnames(
    styles.button,
    styles[theme],
    styles[size],
    {
      [styles.disabled]: disabled,
    },
    className,
  );

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classProps}>
      {children}
    </button>
  );
};

Button.defaultProps = defaultProps;

export default Button;
