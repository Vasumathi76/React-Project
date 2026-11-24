import { Link } from 'react-router-dom'
import { Clock } from 'lucide-react'

function ServiceCard({ service }) {
  return (
    <article className="service-card">
      <div className="service-image">
        <img src={service.image} alt={service.name} />
        <span>{service.category}</span>
      </div>

      <div className="service-info">
        <div className="service-title">
          <h3>{service.name}</h3>
          <b>₹{service.price}</b>
        </div>

        <p>{service.desc}</p>

        <div className="service-bottom">
          <span><Clock size={15} /> {service.duration}</span>
          <Link to={`/book/${service.id}`}>Book now ↗</Link>
        </div>
      </div>
    </article>
  )
}

export default ServiceCard
