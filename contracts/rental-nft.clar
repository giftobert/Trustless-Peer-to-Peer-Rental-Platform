;; Rental NFT Contract

(define-non-fungible-token rental-property uint)

(define-data-var last-token-id uint u0)

(define-map property-details
  { token-id: uint }
  {
    owner: principal,
    name: (string-utf8 100),
    description: (string-utf8 500),
    location: (string-utf8 100),
    price-per-night: uint
  }
)

(define-read-only (get-last-token-id)
  (ok (var-get last-token-id))
)

(define-public (mint-property (name (string-utf8 100)) (description (string-utf8 500)) (location (string-utf8 100)) (price-per-night uint))
  (let
    (
      (token-id (+ (var-get last-token-id) u1))
    )
    (try! (nft-mint? rental-property token-id tx-sender))
    (map-set property-details
      { token-id: token-id }
      {
        owner: tx-sender,
        name: name,
        description: description,
        location: location,
        price-per-night: price-per-night
      }
    )
    (var-set last-token-id token-id)
    (ok token-id)
  )
)

(define-read-only (get-property-details (token-id uint))
  (ok (map-get? property-details { token-id: token-id }))
)

(define-public (update-property-details (token-id uint) (name (string-utf8 100)) (description (string-utf8 500)) (location (string-utf8 100)) (price-per-night uint))
  (let
    (
      (property (unwrap! (map-get? property-details { token-id: token-id }) (err u404)))
    )
    (asserts! (is-eq tx-sender (get owner property)) (err u403))
    (ok (map-set property-details
      { token-id: token-id }
      (merge property { name: name, description: description, location: location, price-per-night: price-per-night })
    ))
  )
)

(define-public (transfer (token-id uint) (sender principal) (recipient principal))
  (begin
    (asserts! (is-eq tx-sender sender) (err u403))
    (try! (nft-transfer? rental-property token-id sender recipient))
    (let
      (
        (property (unwrap! (map-get? property-details { token-id: token-id }) (err u404)))
      )
      (ok (map-set property-details
        { token-id: token-id }
        (merge property { owner: recipient })
      ))
    )
  )
)

