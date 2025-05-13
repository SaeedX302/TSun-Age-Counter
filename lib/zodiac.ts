export type ZodiacSign = {
  name: string
  symbol: string
  element: string
  dates: string
  emoji: string
  description: string
}

export const getZodiacSign = (date: Date): ZodiacSign => {
  const day = date.getDate()
  const month = date.getMonth() + 1 // JavaScript months are 0-indexed

  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) {
    return {
      name: "Aquarius",
      symbol: "Water Bearer",
      element: "Air",
      dates: "January 20 - February 18",
      emoji: "♒",
      description:
        "Independent and intellectual, Aquarians are known for their innovative thinking and humanitarian nature.",
    }
  } else if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) {
    return {
      name: "Pisces",
      symbol: "Fish",
      element: "Water",
      dates: "February 19 - March 20",
      emoji: "♓",
      description: "Compassionate and artistic, Pisceans are known for their empathy and emotional depth.",
    }
  } else if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) {
    return {
      name: "Aries",
      symbol: "Ram",
      element: "Fire",
      dates: "March 21 - April 19",
      emoji: "♈",
      description: "Energetic and courageous, Aries are natural leaders with a passion for new challenges.",
    }
  } else if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) {
    return {
      name: "Taurus",
      symbol: "Bull",
      element: "Earth",
      dates: "April 20 - May 20",
      emoji: "♉",
      description: "Reliable and practical, Taureans value stability and enjoy life's pleasures.",
    }
  } else if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) {
    return {
      name: "Gemini",
      symbol: "Twins",
      element: "Air",
      dates: "May 21 - June 20",
      emoji: "♊",
      description: "Versatile and curious, Geminis are communicative and enjoy learning about diverse subjects.",
    }
  } else if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) {
    return {
      name: "Cancer",
      symbol: "Crab",
      element: "Water",
      dates: "June 21 - July 22",
      emoji: "♋",
      description: "Intuitive and emotional, Cancerians are nurturing and deeply connected to home and family.",
    }
  } else if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) {
    return {
      name: "Leo",
      symbol: "Lion",
      element: "Fire",
      dates: "July 23 - August 22",
      emoji: "♌",
      description: "Confident and ambitious, Leos are natural performers who enjoy being in the spotlight.",
    }
  } else if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) {
    return {
      name: "Virgo",
      symbol: "Virgin",
      element: "Earth",
      dates: "August 23 - September 22",
      emoji: "♍",
      description: "Analytical and practical, Virgos are detail-oriented perfectionists with a desire to help others.",
    }
  } else if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) {
    return {
      name: "Libra",
      symbol: "Scales",
      element: "Air",
      dates: "September 23 - October 22",
      emoji: "♎",
      description: "Diplomatic and fair, Libras seek balance and harmony in all aspects of life.",
    }
  } else if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) {
    return {
      name: "Scorpio",
      symbol: "Scorpion",
      element: "Water",
      dates: "October 23 - November 21",
      emoji: "♏",
      description: "Passionate and determined, Scorpios are known for their intensity and emotional depth.",
    }
  } else if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) {
    return {
      name: "Sagittarius",
      symbol: "Archer",
      element: "Fire",
      dates: "November 22 - December 21",
      emoji: "♐",
      description: "Optimistic and adventurous, Sagittarians love exploring and philosophical pursuits.",
    }
  } else {
    return {
      name: "Capricorn",
      symbol: "Goat",
      element: "Earth",
      dates: "December 22 - January 19",
      emoji: "♑",
      description:
        "Disciplined and responsible, Capricorns are known for their ambition and practical approach to life.",
    }
  }
}

export const getNextBirthday = (birthDate: Date, referenceDate: Date = new Date()) => {
  const birthMonth = birthDate.getMonth()
  const birthDay = birthDate.getDate()

  // Create a date for this year's birthday
  const thisYearBirthday = new Date(referenceDate.getFullYear(), birthMonth, birthDay)

  // If the birthday has already occurred this year, calculate for next year
  if (thisYearBirthday < referenceDate) {
    thisYearBirthday.setFullYear(referenceDate.getFullYear() + 1)
  }

  // Calculate days until next birthday
  const msPerDay = 1000 * 60 * 60 * 24
  const daysUntil = Math.ceil((thisYearBirthday.getTime() - referenceDate.getTime()) / msPerDay)

  // Calculate age on next birthday
  const nextAge = thisYearBirthday.getFullYear() - birthDate.getFullYear()

  return {
    date: thisYearBirthday,
    daysUntil,
    nextAge,
  }
}

export const getUpcomingMilestones = (age: number, nextBirthday: { nextAge: number; daysUntil: number }) => {
  // Define milestone ages
  const milestones = [18, 21, 25, 30, 40, 50, 60, 70, 80, 90, 100]

  // Find the next milestone
  const nextMilestones = milestones
    .filter((milestone) => milestone > age)
    .slice(0, 3)
    .map((milestone) => {
      const yearsUntil = milestone - age
      const daysUntil = (yearsUntil - 1) * 365 + nextBirthday.daysUntil

      return {
        age: milestone,
        yearsUntil,
        daysUntil,
      }
    })

  return nextMilestones
}
