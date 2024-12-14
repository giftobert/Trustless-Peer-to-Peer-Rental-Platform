;; Reputation System Contract

(define-map user-ratings
  { user: principal }
  { total-score: uint, total-ratings: uint }
)

(define-constant MAX-RATING u5)
(define-constant ERR-INVALID-RATING (err u400))
(define-constant ERR-NOT-FOUND (err u404))

(define-public (rate-user (user principal) (rating uint))
  (let
    (
      (current-rating (default-to { total-score: u0, total-ratings: u0 } (map-get? user-ratings { user: user })))
    )
    (asserts! (<= rating MAX-RATING) ERR-INVALID-RATING)
    (ok (map-set user-ratings
      { user: user }
      {
        total-score: (+ (get total-score current-rating) rating),
        total-ratings: (+ (get total-ratings current-rating) u1)
      }
    ))
  )
)

(define-read-only (get-user-rating (user principal))
  (let
    (
      (rating (unwrap! (map-get? user-ratings { user: user }) ERR-NOT-FOUND))
    )
    (ok {
      average-rating: (/ (get total-score rating) (get total-ratings rating)),
      total-ratings: (get total-ratings rating)
    })
  )
)

