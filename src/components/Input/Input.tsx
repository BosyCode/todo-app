import { FC, InputHTMLAttributes } from 'react';
import styles from './Input.module.scss';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  className?: string;
  label?: string;
  required?: boolean;
  errorMessage?: string;
  state?: string;
}

export const Input: FC<InputProps> = ({className, state, label, errorMessage, required, ...rest}) => {
  return (
    <div>
      <input {...rest} required={required} className={className} />
      {label && (
        <label htmlFor={rest.name} className={styles.label}>
          <span>{label}</span>
        </label>
      )}
      {errorMessage && (
        <p>{errorMessage}</p>
      )}
    </div>
  )
}