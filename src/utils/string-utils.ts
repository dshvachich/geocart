export const formatPrice = (
  value: number,
  currency: string,
  fromLabel = 'from',
) => {
  const formattedValue = Number.isInteger(value)
    ? String(value)
    : value.toFixed(2)

  return `${fromLabel} ${formattedValue} ${currency}`
}
