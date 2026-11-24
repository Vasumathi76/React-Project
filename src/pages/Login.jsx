import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login({ user, onLogin, onRegister }) {
  const [mode, setMode] = useState('login')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    if (user) navigate(user.role === 'admin' ? '/admin' : '/')
  }, [user, navigate])

  function handleSubmit(event) {
    event.preventDefault()

    const success = mode === 'login'
      ? onLogin(email, password)
      : onRegister(name, email, password)

    if (success) {
      if (mode === 'login' && email === 'admin@styleslot.com') {
        navigate('/admin')
      } else {
        navigate('/')
      }
    } else {
      setError(
        mode === 'login'
          ? 'Email or password is incorrect.'
          : 'This email is already registered.'
      )
    }
  }

  return (
    <main className="auth-wrap">
      <div className="auth-card">
        <span className="eyebrow">WELCOME TO STYLESLOT</span>
        <h2>{mode === 'login' ? 'Good to see you.' : 'Create your account.'}</h2>
        <p>Sign in to book your next salon visit.</p>

        <form onSubmit={handleSubmit}>
          {mode === 'register' && (
            <label>
              Your name
              <input
                required
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Enter your name"
              />
            </label>
          )}

          <label>
            Email address
            <input
              required
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
            />
          </label>

          <label>
            Password
            <input
              required
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter password"
            />
          </label>

          {error && <p className="error">{error}</p>}
          <button className="primary-btn full">
            {mode === 'login' ? 'Sign in' : 'Create account'} <span>→</span>
          </button>
        </form>

        <p className="switch-auth">
          {mode === 'login' ? 'New to StyleSlot?' : 'Already have an account?'}
          <button onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError('') }}>
            {mode === 'login' ? 'Create an account' : 'Sign in'}
          </button>
        </p>

        <div className="demo-login">
          <b>Demo login</b><br />
          Customer: user@styleslot.com / user123<br />
          Admin: admin@styleslot.com / admin123
        </div>
      </div>
    </main>
  )
}

export default Login
