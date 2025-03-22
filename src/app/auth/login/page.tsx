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
      <h2>Logowanie</h2>
      <form onSubmit={handleSubmit} className={styles.loginBox}>
        {error && <p className={styles.error}></p>}
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Zaloguj</button>
      </form>
    </div>
  )
}