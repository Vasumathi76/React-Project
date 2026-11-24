import { CalendarDays } from "lucide-react";

function BookingRow({
  booking,
  isAdmin = false,
  onCancel,
  onStatusChange,
}) {
  return (
    <article className="booking-row">
      <div className="booking-date">
        <CalendarDays />
        <b>{booking.date}</b>
        <span>{booking.time}</span>
      </div>

      <div className="booking-detail">
        <h3>{booking.serviceName}</h3>

        <p>
          {isAdmin
            ? `Customer: ${booking.customerName} · ${booking.email}`
            : `Stylist: ${booking.stylist}`}
        </p>

        <small>
          ₹{booking.price} · Booked on {booking.createdAt}
        </small>
      </div>

      <div className="booking-actions">
        <span className={`status ${booking.status.toLowerCase()}`}>
          {booking.status}
        </span>

        {isAdmin ? (
          <select
            value={booking.status}
            onChange={(event) =>
              onStatusChange(booking.id, event.target.value)
            }
          >
            <option>Pending</option>
            <option>Confirmed</option>
            <option>Completed</option>
            <option>Cancelled</option>
          </select>
        ) : (
          booking.status !== "Cancelled" && (
            <button
              className="text-danger"
              onClick={() => onCancel(booking.id)}
            >
              Cancel
            </button>
          )
        )}
      </div>
    </article>
  );
}

export default BookingRow;