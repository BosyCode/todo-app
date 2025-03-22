"use client"

import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import axios from 'axios'
import styles from './Login.module.scss';

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('');

    const res = await axios.post('/api/auth', {email, password})
    if (res.status === 200) {
      router.push('/dashboard');
    } else {
      setError(res.data.message || "Error logging in")
    }
  }

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginBox}>
        <h1 className={styles.title}>Logowanie</h1>
        <form className={styles.form}>
          <input type="text" placeholder="Nazwa użytkownika" className={styles.input} />
          <input type="password" placeholder="Hasło" className={styles.input} />
          <button type="submit" className={styles.button}>Zaloguj</button>
        </form>
      </div>
    </div>
  )
}