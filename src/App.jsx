import { useEffect, useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'

import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Login from './pages/Login'
import Book from './pages/Book'
import MyBookings from './pages/MyBookings'
import Admin from './pages/Admin'

import {
  initialServices,
  initialStylists,
  initialUsers
} from './data/initialData'
import { readStorage, saveStorage } from './utils/storage'

function App() {
  const [services, setServices] = useState(() =>
    readStorage('ss_services', initialServices)
  )
  const [stylists, setStylists] = useState(() =>
    readStorage('ss_stylists', initialStylists)
  )
  const [bookings, setBookings] = useState(() =>
    readStorage('ss_bookings', [])
  )
  const [users, setUsers] = useState(() =>
    readStorage('ss_users', initialUsers)
  )
  const [user, setUser] = useState(() =>
    readStorage('ss_currentUser', null)
  )

  const navigate = useNavigate()

  useEffect(() => saveStorage('ss_services', services), [services])
  useEffect(() => saveStorage('ss_stylists', stylists), [stylists])
  useEffect(() => saveStorage('ss_bookings', bookings), [bookings])
  useEffect(() => saveStorage('ss_users', users), [users])
  useEffect(() => saveStorage('ss_currentUser', user), [user])

  function handleLogin(email, password) {
    const foundUser = users.find(
      (item) =>
        item.email.toLowerCase() === email.toLowerCase() &&
        item.password === password
    )

    if (!foundUser) return false

    setUser(foundUser)
    return true
  }

  function handleRegister(name, email, password) {
    const emailExists = users.some(
      (item) => item.email.toLowerCase() === email.toLowerCase()
    )

    if (emailExists) return false

    const newUser = {
      id: Date.now(),
      name,
      email,
      password,
      role: 'customer'
    }

    setUsers((oldUsers) => [...oldUsers, newUser])
    setUser(newUser)
    return true
  }

  function handleLogout() {
    setUser(null)
    navigate('/')
  }

  function addBooking(bookingDetails) {
    const newBooking = {
      ...bookingDetails,
      id: Date.now(),
      customerId: user.id,
      customerName: user.name,
      email: user.email,
      status: 'Pending',
      createdAt: new Date().toLocaleDateString()
    }

    setBookings((oldBookings) => [newBooking, ...oldBookings])
  }

  function cancelBooking(bookingId) {
    setBookings((oldBookings) =>
      oldBookings.filter((booking) => booking.id !== bookingId)
    )
  }

  function changeBookingStatus(bookingId, newStatus) {
    setBookings((oldBookings) =>
      oldBookings.map((booking) =>
        booking.id === bookingId
          ? { ...booking, status: newStatus }
          : booking
      )
    )
  }

  return (
    <div className="app">
      <Header user={user} onLogout={handleLogout} />

      <Routes>
        <Route path="/" element={<Home services={services} />} />
        <Route
          path="/login"
          element={
            <Login
              user={user}
              onLogin={handleLogin}
              onRegister={handleRegister}
            />
          }
        />
        <Route
          path="/book/:id"
          element={
            <Book
              services={services}
              stylists={stylists}
              user={user}
              onAddBooking={addBooking}
            />
          }
        />
        <Route
          path="/my-bookings"
          element={
            <MyBookings
              user={user}
              bookings={bookings}
              onCancel={cancelBooking}
            />
          }
        />
        <Route
          path="/admin"
          element={
            <Admin
              user={user}
              services={services}
              setServices={setServices}
              stylists={stylists}
              setStylists={setStylists}
              bookings={bookings}
              onStatusChange={changeBookingStatus}
            />
          }
        />
      </Routes>

      <Footer />
    </div>
  )
}

export default App
