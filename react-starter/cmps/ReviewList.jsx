export function ReviewList({ reviews, onRemoveReview }) {
  return (
    <ul className="review-list">
      {reviews.map((review) => (
        <li key={review.id}>
          <span>Name: {review.name} </span>
          <span>Rate: {review.rate}</span>
          <span>Date: {review.date}</span>
          <button onClick={() => onRemoveReview(review.id)}>Delete</button>
        </li>
      ))}
    </ul>
  )
}
