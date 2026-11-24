import { useState } from "react";
import {
  LayoutDashboard,
  Plus,
  Trash2,
  UserRound,
} from "lucide-react";
import BookingRow from "../components/BookingRow";
import ProtectedPage from "../components/ProtectedPage";

function Admin({
  user,
  services,
  setServices,
  stylists,
  setStylists,
  bookings,
  onStatusChange,
}) {
  const [serviceName, setServiceName] = useState("");
  const [category, setCategory] = useState("Hair");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("45 min");
  const [imageUrl, setImageUrl] = useState("");

  const [stylistName, setStylistName] = useState("");
  const [speciality, setSpeciality] = useState("Hair & Styling");

  if (!user || user.role !== "admin") {
    return <ProtectedPage />;
  }

  function addService(event) {
    event.preventDefault();

    const newService = {
      id: Date.now(),
      name: serviceName,
      category,
      price: Number(price),
      duration,
      desc: "A professional salon service.",
      image: imageUrl,
    };

    setServices((oldServices) => [
      ...oldServices,
      newService,
    ]);

    setServiceName("");
    setPrice("");
    setImageUrl("");
  }

  function deleteService(serviceId) {
    setServices((oldServices) =>
      oldServices.filter(
        (service) => service.id !== serviceId
      )
    );
  }

  function addStylist(event) {
    event.preventDefault();

    const newStylist = {
      id: Date.now(),
      name: stylistName,
      speciality,
    };

    setStylists((oldStylists) => [
      ...oldStylists,
      newStylist,
    ]);

    setStylistName("");
  }

  function deleteStylist(stylistId) {
    setStylists((oldStylists) =>
      oldStylists.filter(
        (stylist) => stylist.id !== stylistId
      )
    );
  }

  return (
    <main className="section dashboard">
      <span className="eyebrow">
        MANAGE YOUR SALON
      </span>

      <h2>
        Admin <em>dashboard</em>
      </h2>

      <div className="stats-grid">
        <div className="stat">
          <span>Total services</span>
          <b>{services.length}</b>
        </div>

        <div className="stat">
          <span>Total stylists</span>
          <b>{stylists.length}</b>
        </div>

        <div className="stat">
          <span>Total bookings</span>
          <b>{bookings.length}</b>
        </div>

        <div className="stat">
          <span>Pending</span>
          <b>
            {
              bookings.filter(
                (item) => item.status === "Pending"
              ).length
            }
          </b>
        </div>
      </div>

      <div className="admin-columns">
        <section className="admin-panel">
          <h3>
            <Plus size={18} />
            Add a service
          </h3>

          <form
            onSubmit={addService}
            className="compact-form"
          >
            <input
              required
              placeholder="Service name"
              value={serviceName}
              onChange={(event) =>
                setServiceName(event.target.value)
              }
            />

            <select
              value={category}
              onChange={(event) =>
                setCategory(event.target.value)
              }
            >
              <option value="Hair">Hair</option>
              <option value="Skin">Skin</option>
              <option value="Nails">Nails</option>
              <option value="Makeup">Makeup</option>
            </select>

            <input
              required
              type="number"
              min="1"
              placeholder="Price (₹)"
              value={price}
              onChange={(event) =>
                setPrice(event.target.value)
              }
            />

            <input
              required
              placeholder="Duration (e.g. 45 min)"
              value={duration}
              onChange={(event) =>
                setDuration(event.target.value)
              }
            />

            <input
              required
              type="url"
              placeholder="Image URL"
              value={imageUrl}
              onChange={(event) =>
                setImageUrl(event.target.value)
              }
            />

            <button
              type="submit"
              className="primary-btn"
            >
              Add service
            </button>
          </form>

          <div className="manage-list">
            {services.map((service) => (
              <div key={service.id}>
                <span>
                  {service.name}

                  <small>
                    ₹{service.price}
                  </small>
                </span>

                <button
                  type="button"
                  aria-label={`Delete ${service.name}`}
                  onClick={() =>
                    deleteService(service.id)
                  }
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="admin-panel">
          <h3>
            <UserRound size={18} />
            Manage stylists
          </h3>

          <form
            onSubmit={addStylist}
            className="compact-form"
          >
            <input
              required
              placeholder="Stylist name"
              value={stylistName}
              onChange={(event) =>
                setStylistName(event.target.value)
              }
            />

            <select
              value={speciality}
              onChange={(event) =>
                setSpeciality(event.target.value)
              }
            >
              <option value="Hair & Styling">
                Hair & Styling
              </option>

              <option value="Skin & Facial">
                Skin & Facial
              </option>

              <option value="Nails & Makeup">
                Nails & Makeup
              </option>
            </select>

            <button
              type="submit"
              className="primary-btn"
            >
              Add stylist
            </button>
          </form>

          <div className="manage-list">
            {stylists.map((stylist) => (
              <div key={stylist.id}>
                <span>
                  {stylist.name}

                  <small>
                    {stylist.speciality}
                  </small>
                </span>

                <button
                  type="button"
                  aria-label={`Delete ${stylist.name}`}
                  onClick={() =>
                    deleteStylist(stylist.id)
                  }
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="admin-panel all-bookings">
        <h3>
          <LayoutDashboard size={18} />
          All appointments
        </h3>

        {bookings.length === 0 ? (
          <p className="muted">
            No appointments have been made yet.
          </p>
        ) : (
          <div className="booking-list">
            {bookings.map((booking) => (
              <BookingRow
                key={booking.id}
                booking={booking}
                isAdmin
                onStatusChange={onStatusChange}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default Admin;