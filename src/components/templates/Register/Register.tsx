'use client'

import React from 'react'
import styles from './Register.module.scss'
import { useRouter } from 'next/navigation'
import { InputFormik } from '@/components/base/Input/Input'
import { Form, FormikProvider, useFormik } from 'formik'
import axios from 'axios'
import { Button } from '@/components/base/Button/Button'
import * as Yup from 'yup'
import { Text } from '@/components/base/Text/Text'

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
      username: Yup.string().required('Nazwa użytkownika jest wymagana'),
      email: Yup.string()
        .email('Nieprawidłowy format e-mail')
        .required('E-mail jest wymagany'),
      password: Yup.string()
        .required('Hasło jest wymagane')
        .matches(
          /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_`+{}\[\]:;<>,.?~\-=/\\]{8,}$/,
          'Hasło musi składać się z 8 znaków, jednej wielkiej litery, cyfry i specjalnego znaku.',
        ),
      passwordConfirm: Yup.string()
        .oneOf([Yup.ref('password')], 'Hasło nie jest takie samo')
        .required('Musisz powtórzyć swoje hasło'),
    }),
  })

  return (
    <div className={styles.registerContainer}>
      <Text
        tag="h2"
        text="Rejestracja"
        fontSize="32"
        color="accent"
        fontFamily="poppins"
      />
      <FormikProvider value={registerFormik}>
        <Form>
          <InputFormik
            type="text"
            name="username"
            label="Nazwa użytkownika"
            required
          />
          <InputFormik type="email" name="email" label="Email" required />
          <InputFormik type="password" name="password" label="Hasło" required />
          <InputFormik
            type="password"
            name="passwordConfirm"
            label="Powtórz hasło"
            required
          />
          <Button
            text="Zarejestruj się"
            type="submit"
            style={{ margin: '15px 0' }}
          />
        </Form>
      </FormikProvider>
    </div>
  )
}

export default Register
