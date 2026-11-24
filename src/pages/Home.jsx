import { useState } from "react";
import { Search } from "lucide-react";
import ServiceCard from "../components/ServiceCard";

function Home({ services }) {
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");

  const categories = [
    "All",
    "Hair",
    "Skin",
    "Nails",
    "Makeup",
  ];

  const filteredServices = services.filter((service) => {
    const matchesCategory =
      category === "All" || service.category === category;

    const matchesSearch =
      service.name.toLowerCase().includes(search.toLowerCase()) ||
      service.category.toLowerCase().includes(search.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow">
            YOUR SELF-CARE DESTINATION
          </span>

          <h1>
            A little time for you.
            <br />
            <em>A whole lot of glow.</em>
          </h1>

          <p>
            Book your favourite salon services with skilled
            professionals. Your next refresh is just a few clicks away.
          </p>

          <a href="#services" className="primary-btn">
            Explore Services <span>→</span>
          </a>

          <div className="hero-note">
            <span>✦</span>
            Easy booking · Trusted stylists · Feel-good moments
          </div>
        </div>

        <div className="hero-photo">
          <img
            src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1200"
            alt="Modern salon interior"
          />

          <div className="photo-tag">
            Your moment. Your style.
          </div>
        </div>
      </section>

      <main id="services" className="section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">
              OUR MENU
            </span>

            <h2>
              Find your <em>feel-good</em> service
            </h2>

            <p>
              Thoughtful treatments, tailored to you.
            </p>
          </div>

          <div className="searchbox">
            <Search size={18} />

            <input
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search services..."
            />
          </div>
        </div>

        <div className="filters">
          {categories.map((item) => (
            <button
              key={item}
              className={
                category === item
                  ? "filter active"
                  : "filter"
              }
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="service-grid">
          {filteredServices.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
            />
          ))}

          {filteredServices.length === 0 && (
            <p className="empty">
              No services found. Try another search.
            </p>
          )}
        </div>
      </main>

      <section className="promise">
        <div>
          <span className="eyebrow">
            THE STYLESLOT EXPERIENCE
          </span>

          <h2>
            Care that feels
            <br />
            <em>like you.</em>
          </h2>
        </div>

        <p>
          From quick touch-ups to a little well-deserved pampering,
          find the service that fits your day. Choose a stylist,
          pick a time, and leave the rest to us.
        </p>
      </section>
    </>
  );
}

export default Home;