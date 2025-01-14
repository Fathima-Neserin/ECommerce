import React from 'react'
import Layout from '../components/Layout/Layout'
import { useAuth } from "../context/auth.context"

function Home() {
  const [auth, setAuth] = useAuth()
  return (
    <Layout title={"Best offers"}>
        <h1>Home</h1>
        <pre>{JSON.stringify(auth, null, 4)}</pre>
    </Layout>
  )
}

export default Home
