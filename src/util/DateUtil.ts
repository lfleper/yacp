
const weekdayEnglish = ['Su.', 'Mo.', 'Tu.', 'We.', 'Th.', 'Fr.', 'Sa.']

/**
 * Check if a given date corresponds to today's date.
 * 
 * @param date Date to be checked.
 * @returns True, if the date is the same as today's date.
 */
export function isToday(date: Date): boolean {
    const today = new Date()
    return date.getDate() == today.getDate() &&
        date.getMonth() == today.getMonth() &&
        date.getFullYear() == today.getFullYear()
}

/**
 * Check if a date corresponds to the previous day. 
 * 
 * @param date Date to be checked.
 * @returns True, if the date is the same as yesterday's date.
 */
export function isYesterday(date: Date): boolean {
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)

    return date.getDate() == yesterday.getDate() &&
        date.getMonth() == yesterday.getMonth() &&
        date.getFullYear() == yesterday.getFullYear()
}

/**
 * Returns the time of a Date object as a string.
 * 
 * @param date The date object from which the time is to be read.
 * @param locale User locale.
 * @returns The time as string.
 */
export function getTimeAsString(date: Date, locale: string): string {
    return date.toLocaleTimeString(locale, {
        hour12: false,
        hour: 'numeric',
        minute: 'numeric'
    })
}

/**
 * Check if a given day is in the current week.
 * 
 * @param date Date to be checked.
 * @returns True, if the date is in the current week.
 */
export function isDateInThisWeek(date: Date): boolean {
    const now = new Date()

    const weekDay = (now.getDay() + 6) % 7 // Make sure Sunday is 6, not 0
    const monthDay = now.getDate()
    const mondayThisWeek = monthDay - weekDay
  
    const startOfThisWeek = new Date(+now)
    startOfThisWeek.setDate(mondayThisWeek)
    startOfThisWeek.setHours(0, 0, 0, 0)
  
    const startOfNextWeek = new Date(+startOfThisWeek)
    startOfNextWeek.setDate(mondayThisWeek + 7)
  
    return date >= startOfThisWeek && date < startOfNextWeek
}

export function getDayNameByDayNumber(day: number): string {
    return weekdayEnglish[day]
}

