'use client'

import React from 'react'
import styles from './Register.module.scss'
import { useRouter } from 'next/navigation'
import { InputFormik } from '@/components/base/Input/Input'
import { Form, FormikProvider, useFormik } from 'formik'
import axios from 'axios'
import { Button } from '@/components/base/Button/Button'
import * as Yup from 'yup'

const Register = () => {
  const router = useRouter()

  const registerFormik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      passwordConfirm: '',
    },
    onSubmit: async (values) => {
      try {
        await axios
          .post('/api/register', values)
          .then((res) => res.status === 201 && router.push('/auth/login'))
      } catch (error) {
        console.log(error)
      }
    },
    validationSchema: Yup.object().shape({
      username: Yup.string().required('Username is required'),
      email: Yup.string().email('Invalid email').required('Email is required'),
      password: Yup.string()
        .required('Password is required')
        .matches(
          /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_`+{}\[\]:;<>,.?~\-=/\\]{8,}$/,
          'Password must be at least 8 characters and special characters.',
        ),
      passwordConfirm: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Password must match'),
    }),
  })

  return (
    <div className={styles.registerContainer}>
      <h2>Rejestracja</h2>
      <FormikProvider value={registerFormik}>
        <Form>
          <InputFormik
            type="text"
            name="username"
            placeholder="Username"
            label="Nazwa użytkownika"
            required
          />
          <InputFormik
            type="email"
            name="email"
            placeholder="E-mail"
            required
          />
          <InputFormik
            type="password"
            name="password"
            placeholder="Hasło"
            required
          />
          <InputFormik
            type="password"
            name="passwordConfirm"
            placeholder="Powtórz hasło"
            required
          />
          <Button text="Zarejestruj się" type="submit" />
        </Form>
      </FormikProvider>
    </div>
  )
}

export default Register
