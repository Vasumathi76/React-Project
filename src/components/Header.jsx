import { Link, NavLink } from 'react-router-dom'
import { Scissors, LogOut, Menu, X } from 'lucide-react'
import { useState } from 'react'

function Header({ user, onLogout }) {
  const [menuOpen, setMenuOpen] = useState(false)

  function closeMenu() {
    setMenuOpen(false)
  }

  return (
    <header className="topbar">
      <Link to="/" className="brand" onClick={closeMenu}>
        <span className="brand-icon"><Scissors size={21} /></span>
        Style<span>Slot</span>
      </Link>

      <button className="mobile-toggle" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <X /> : <Menu />}
      </button>

      <nav className={menuOpen ? 'nav open' : 'nav'} onClick={closeMenu}>
        <NavLink to="/">Home</NavLink>

        {user?.role === 'customer' && (
          <NavLink to="/my-bookings">My Bookings</NavLink>
        )}

        {user?.role === 'admin' && (
          <NavLink to="/admin">Admin Dashboard</NavLink>
        )}

        {user ? (
          <>
            <span className="welcome">Hi, {user.name}</span>
            <button className="nav-button" onClick={onLogout}>
              <LogOut size={16} /> Logout
            </button>
          </>
        ) : (
          <Link className="nav-login" to="/login">Login / Sign up</Link>
        )}
      </nav>
    </header>
  )
}

export default Header
