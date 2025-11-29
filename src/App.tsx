import './App.css'
import {Navigate, Route, Routes } from "react-router-dom"
import MainUi from './dotTop/mainUi'
import SignUp from './signUp'
import SignIn from './signIn'
import { AuthProvider } from './providers/AuthProvider'
import type { JSX } from 'react'
import { useAuth } from './hooks/useAuth'

function RequireAuth({ children }: { children: JSX.Element }) {
  const { user, loading } = useAuth();

  if (loading) return <p>判定中...</p>;
  if (!user) return <Navigate to="/login" replace />;

  return children;
}

function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path='/signUp' element={<SignUp />}/>
          <Route path='/signIn' element={<SignIn />}/>
          <Route path="/" element={
            <RequireAuth>
              <MainUi />
            </RequireAuth>
            }/>
        </Routes>
      </AuthProvider>
    </>
  )
}

export default App
