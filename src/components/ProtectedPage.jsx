import { Link } from 'react-router-dom'

function ProtectedPage() {
  return (
    <main className="empty-panel section">
      <h2>Please sign in</h2>
      <p>Sign in to view this page.</p>
      <Link className="primary-btn" to="/login">Login</Link>
    </main>
  )
}

export default ProtectedPage
