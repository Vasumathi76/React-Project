import { Link } from "react-router-dom";
import { CalendarDays } from "lucide-react";
import BookingRow from "../components/BookingRow";
import ProtectedPage from "../components/ProtectedPage";

function MyBookings({ user, bookings, onCancel }) {
  if (!user) {
    return <ProtectedPage />;
  }

  const myBookings = bookings.filter(
    (booking) => booking.customerId === user.id
  );

  return (
    <main className="section dashboard">
      <span className="eyebrow">
        YOUR APPOINTMENTS
      </span>

      <h2>
        My <em>bookings</em>
      </h2>

      <p className="muted">
        Keep track of your upcoming salon visits.
      </p>

      {myBookings.length === 0 ? (
        <div className="empty-panel">
          <CalendarDays size={34} />

          <h3>No bookings yet</h3>

          <p>
            Your next self-care moment is waiting.
          </p>

          <Link
            className="primary-btn"
            to="/"
          >
            Explore services
          </Link>
        </div>
      ) : (
        <div className="booking-list">
          {myBookings.map((booking) => (
            <BookingRow
              key={booking.id}
              booking={booking}
              onCancel={onCancel}
            />
          ))}
        </div>
      )}
    </main>
  );
}

export default MyBookings;