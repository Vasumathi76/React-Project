import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const timeSlots = [
  '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM',
  '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'
]

function Book({ services, stylists, user, onAddBooking }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const service = services.find((item) => item.id === Number(id))

  const [stylist, setStylist] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [note, setNote] = useState('')

  if (!service) {
    return <main className="section"><h2>Service not found</h2></main>
  }

  function handleSubmit(event) {
    event.preventDefault()

    if (!user) {
      navigate('/login')
      return
    }

    onAddBooking({
      serviceId: service.id,
      serviceName: service.name,
      price: service.price,
      stylist,
      date,
      time,
      note
    })

    navigate('/my-bookings')
  }

  return (
    <main className="booking-layout">
      <div className="booking-main">
        <span className="eyebrow">RESERVE YOUR MOMENT</span>
        <h2>Book an <em>appointment</em></h2>
        <p className="muted">Choose your preferred stylist and a time that works for you.</p>

        <form className="booking-form" onSubmit={handleSubmit}>
          <label>
            Choose your stylist
            <select required value={stylist} onChange={(event) => setStylist(event.target.value)}>
              <option value="">Select stylist</option>
              {stylists.map((item) => (
                <option key={item.id} value={item.name}>
                  {item.name} — {item.speciality}
                </option>
              ))}
            </select>
          </label>

          <label>
            Appointment date
            <input
              required
              type="date"
              min={new Date().toISOString().split('T')[0]}
              value={date}
              onChange={(event) => setDate(event.target.value)}
            />
          </label>

          <label>Available time slots</label>
          <div className="time-grid">
            {timeSlots.map((slot) => (
              <button
                type="button"
                key={slot}
                className={time === slot ? 'time active' : 'time'}
                onClick={() => setTime(slot)}
              >
                {slot}
              </button>
            ))}
          </div>

          <input type="hidden" required value={time} />
          <label>
            Note (optional)
            <textarea
              value={note}
              onChange={(event) => setNote(event.target.value)}
              placeholder="Anything you'd like us to know?"
            />
          </label>

          <button className="primary-btn full" disabled={!time}>
            Confirm booking <span>→</span>
          </button>
        </form>
      </div>

      <aside className="booking-summary">
        <img src={service.image} alt={service.name} />
        <div className="summary-body">
          <span className="eyebrow">YOUR SELECTION</span>
          <h3>{service.name}</h3>
          <p>{service.desc}</p>
          <div className="summary-line"><span>Duration</span><b>{service.duration}</b></div>
          <div className="summary-line"><span>Price</span><b>₹{service.price}</b></div>
        </div>
      </aside>
    </main>
  )
}

export default Book
