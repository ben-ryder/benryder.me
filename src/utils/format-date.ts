
export function formatDate(date: Date) {
    return date.toLocaleDateString('en-GB', {day: "2-digit", month: "long", year: 'numeric'})
}
