import './App.css'
import {Navigate, Route, Routes } from "react-router-dom"
import MainUi from './dotTop/mainUi'
import SignUp from './signUp'
import { AuthProvider } from './providers/AuthProvider'
import type { JSX } from 'react'
import { useAuth } from './hooks/useAuth'
import LogIn from './logIn'

function RequireAuth({ children }: { children: JSX.Element }) {
  // ログイン状態（user）と、確認中かどうか（loading）を取得
  const { user, loading } = useAuth();

  // 認証チェックが終わるまで待つ
  if (loading) return <p>判定中...</p>;
  // 未ログインならサインイン画面へリダイレクト
  if (!user || !user.id) return <Navigate to="/logIn" replace />;

  // ログイン済みならそのまま子コンポーネントを表示
  return children;

    // ログアウトの使い方
    // const { logout } = useAuth();

    // const handleLogout = async () => {
    //     await logout();
    // };
}

function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path='/signUp' element={<SignUp />}/>
          <Route path='/logIn' element={<LogIn />}/>
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
