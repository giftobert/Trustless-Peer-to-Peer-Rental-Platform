;; Booking System Contract

(define-map bookings
  { property-id: uint, start-date: uint }
  { guest: principal, end-date: uint, total-price: uint }
)

(define-constant ERR-INVALID-DATES (err u400))
(define-constant ERR-UNAVAILABLE (err u401))
(define-constant ERR-UNAUTHORIZED (err u403))
(define-constant ERR-NOT-FOUND (err u404))

(define-public (create-booking (property-id uint) (start-date uint) (end-date uint) (price-per-night uint))
  (let
    (
      (nights (- end-date start-date))
      (total-price (* nights price-per-night))
    )
    (asserts! (> end-date start-date) ERR-INVALID-DATES)
    (try! (stx-transfer? total-price tx-sender (as-contract tx-sender)))
    (map-set bookings
      { property-id: property-id, start-date: start-date }
      { guest: tx-sender, end-date: end-date, total-price: total-price }
    )
    (ok true)
  )
)

(define-public (cancel-booking (property-id uint) (start-date uint))
  (let
    (
      (booking (unwrap! (map-get? bookings { property-id: property-id, start-date: start-date }) ERR-NOT-FOUND))
    )
    (asserts! (is-eq tx-sender (get guest booking)) ERR-UNAUTHORIZED)
    (try! (as-contract (stx-transfer? (get total-price booking) tx-sender (get guest booking))))
    (map-delete bookings { property-id: property-id, start-date: start-date })
    (ok true)
  )
)

(define-read-only (get-booking (property-id uint) (start-date uint))
  (ok (map-get? bookings { property-id: property-id, start-date: start-date }))
)

