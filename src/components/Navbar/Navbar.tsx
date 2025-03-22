"use client"

import React from 'react'
import Link from 'next/link'
import styles from './Navbar.module.scss'

export const Navbar = () => {
  return (
    <header>
      <nav className={styles.navbar}>
        <ul>
          <li><Link href="/auth/login">Logowanie</Link></li>
          <li><Link href="/auth/register">Rejestracja</Link></li>
          <li><Link href="/dashboard">Dashboard</Link></li>
        </ul>
      </nav>
    </header>
  )
}