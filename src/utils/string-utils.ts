export const formatPrice = (value: number, currency: string) => `from ${value} ${currency}`

export const formatOffers = (value: number) => `${value} ${value === 1 ? 'offer' : 'offers'}`
