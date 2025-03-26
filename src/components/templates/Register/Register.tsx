'use client'

import React from 'react'
import styles from './Register.module.scss'
import { useRouter } from 'next/navigation'
import { InputFormik } from '@/components/base/Input/Input'
import { Form, FormikProvider, useFormik } from 'formik'
import axios from 'axios'
import { Button } from '@/components/base/Button/Button'

const Register = () => {
  const router = useRouter()

  const registerFormik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      passwordConfirm: ''
    },
    onSubmit: async (values) => {
      try {
        await axios.post('/api/register', values).then(res => res.status === 201 && router.push('/auth/login'))
      } catch (error) {
        console.log(error)
      }
    }
  })

  return (
    <div className={styles.registerContainer}>
      <h2>Rejestracja</h2>
      <FormikProvider value={registerFormik}>
        <Form>
          <InputFormik type="text" name="username" placeholder="Username" required />
          <InputFormik type="email" name="email" placeholder="E-mail" required />
          <InputFormik type="password" name="password" placeholder="Hasło" required />
          <InputFormik type="password" name="passwordConfirm" placeholder="Powtórz hasło" required />
          <Button text="Zarejestruj się" type='submit'  />
        </Form>
      </FormikProvider>
    </div>
  )
}

export default Register
