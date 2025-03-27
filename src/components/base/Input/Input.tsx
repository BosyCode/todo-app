import { FC, InputHTMLAttributes } from 'react'
import styles from './Input.module.scss'
import { useField } from 'formik'
import classNames from 'classnames'
import { Text } from '@/components/base/Text/Text'

export interface InputProps
  extends InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  className?: string
  label?: string
  required?: boolean
  errorMessage?: string
  state?: string
}

export interface FormikInputProps
  extends Omit<InputProps, 'value' | 'onChange' | 'message' | 'state'> {
  name?: string
}

export const Input: FC<InputProps> = ({
  className,
  state,
  label,
  errorMessage,
  required,
  ...rest
}) => {
  return (
    <div>
      <input
        {...rest}
        required={required}
        className={classNames(styles.input, className)}
      />
      {label && (
        <label htmlFor={rest.name} className={styles.label}>
          <Text
            tag="span"
            text={label}
            weight="500"
            fontSize="20"
            color="accent"
            fontFamily="poppins"
          />
        </label>
      )}
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  )
}

export const InputFormik: FC<FormikInputProps> = ({ name, ...props }) => {
  const [input, meta] = useField(name)

  const hasError = meta.touched && !!meta.error

  return (
    <Input
      {...props}
      {...input}
      state={hasError ? 'error' : 'default'}
      errorMessage={hasError ? meta.error : undefined}
    />
  )
}
