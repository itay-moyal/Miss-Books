import { ReviewPreview } from "./ReviewPreview.jsx"

export function ReviewList({ reviews, onRemoveReview }) {
  return (
    <ul className="review-list">
      {reviews.map((review) => (
        <ReviewPreview
          key={review.id}
          review={review}
          onRemoveReview={onRemoveReview}
        />
      ))}
    </ul>
  )
}