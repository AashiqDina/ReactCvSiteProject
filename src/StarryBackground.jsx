import './StarryBackground.css'

export default function StarryBackground(){
    return (
        <div className="stars-container">
          {[...Array(60)].map((_, i) => (
            <div key={i} className="star" style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
            }} />
          ))}
        </div>
    )
}