export function prettyDate(time) {
    let x = new Date(time);
    return x.getDay() + "." + x.getMonth() + "." + x.getFullYear();
}

export function prettyTime(time) {
    let x = new Date(time)
    return x.getHours() + ":" + x.getMinutes()
}

export function prettyHslTimeDelay(timeIn) {
    if (!timeIn) {
        return null
    }
    let time = timeIn < 0 ? -timeIn : timeIn
    let hours = Math.floor(time / 3600)
    let minutes = Math.floor((time - hours * 3600) / 60)
    let seconds = time - hours * 3600 - minutes * 60

    return (hours !== 0) ? `${hours} h ${minutes} min ${seconds} s` : `${minutes} min ${seconds} s`
}