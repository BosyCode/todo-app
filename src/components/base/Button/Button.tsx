import { FC, HTMLAttributes } from 'react'
import classNames from 'classnames'
import styles from './Button.module.scss'
import Link from 'next/link'

export interface ButtonProps extends HTMLAttributes<HTMLButtonElement | HTMLAnchorElement> {
  href?: string;
  text?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Button: FC<ButtonProps> = ({href, text, size, disabled, type, onClick, ...rest}) => {
  const classes = classNames(
    styles.button,
    styles[`size-${size}`]
  )

  const commonProps = {
    className: classes,
    onClick: onClick
  }

  if(href) {
    return (
      <Link href={href} {...commonProps} {...rest}>{text}</Link>
    )
  }

  return (
    <button disabled={disabled} type={type} {...commonProps} {...rest}>{text}</button>
  )
}