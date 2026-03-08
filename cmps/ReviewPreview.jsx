import { DynamicCmp } from "./DynamicCmp.jsx"

export function ReviewPreview({ review, onRemoveReview }) {
  return (
    <li className="review-preview">
      <span>Name: {review.name}</span>
      {review.cmpType === "RateByStars" ? (
        <DynamicCmp
          cmpType={review.cmpType}
          val={review.rate}
          selected={null}
        />
      ) : (
        <span>Rate: {review.rate}/5</span>
      )}
      <span>Date: {review.date}</span>
      <button onClick={() => onRemoveReview(review.id)}>Delete</button>
    </li>
  )
}
