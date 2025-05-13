export function calculateAge(birthDate: Date, referenceDate: Date) {
  // Clone dates to avoid modifying the originals
  const birth = new Date(birthDate)
  const reference = new Date(referenceDate)

  // Calculate years
  let years = reference.getFullYear() - birth.getFullYear()

  // Calculate months
  let months = reference.getMonth() - birth.getMonth()

  // If the reference date's month and day are earlier than the birth date's month and day,
  // then subtract a year from the years
  if (months < 0 || (months === 0 && reference.getDate() < birth.getDate())) {
    years--
    months += 12
  }

  // Calculate days
  let days = reference.getDate() - birth.getDate()

  if (days < 0) {
    // Get the last day of the previous month
    const lastMonth = new Date(reference.getFullYear(), reference.getMonth(), 0)
    days += lastMonth.getDate()
    months--

    if (months < 0) {
      months += 12
      years--
    }
  }

  // Calculate hours
  const millisecondsInHour = 1000 * 60 * 60
  const hourDiff = reference.getHours() - birth.getHours()
  const hours = hourDiff < 0 ? 24 + hourDiff : hourDiff

  return {
    years,
    months,
    days,
    hours,
  }
}
