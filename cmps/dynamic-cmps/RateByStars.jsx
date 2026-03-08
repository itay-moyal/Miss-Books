export function RateByStars({ val, selected }) {
  return (
    <div className="star-rating">
      {[1, 2, 3, 4, 5].map((num) => (
        <span key={num} onClick={() => selected(num)}>
          {num <= val ? "★" : "☆"}
        </span>
      ))}
    </div>
  )
}
