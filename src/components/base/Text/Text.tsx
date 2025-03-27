import { FC, HTMLProps, JSX } from 'react'
import parse from 'html-react-parser'
import classNames from 'classnames'
import styles from './Text.module.scss'

export interface TextProps extends HTMLProps<HTMLParagraphElement> {
  tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span'
  text?: string | JSX.Element | number
  className?: string
  weight?: '300' | '400' | '500' | '600' | '700' | '800' | '900'
  fontSize?: '8' | '10' | '12' | '16' | '20' | '24' | '32' | '40' | '48' | '60'
  color?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'info'
    | 'warning'
    | 'danger'
    | 'accent'
  isUppercase?: boolean
  fontFamily?: 'poppins'
}

export const Text: FC<TextProps> = ({
  tag = 'p',
  text,
  className,
  weight,
  fontSize,
  color,
  isUppercase,
  fontFamily,
  children,
  ...rest
}) => {
  const T = tag

  const textInner = text?.toString().replace('\n/g', '<br>')
  const content = children ? children : parse(textInner || '')

  return (
    <T
      {...rest}
      className={classNames(
        className,
        styles[`weight-${weight}`],
        styles[`color-${color}`],
        styles[`size-${fontSize}`],
        styles[`family-${fontFamily}`],
      )}
    >
      {content}
    </T>
  )
}
