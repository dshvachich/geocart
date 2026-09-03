export const formatPrice = (value: number, currency: string) => {
  const formattedValue = Number.isInteger(value)
    ? String(value)
    : value.toFixed(2)

  return `from ${formattedValue} ${currency}`
}

export const formatOffers = (value: number) =>
  `${value} ${value === 1 ? 'offer' : 'offers'}`
