export function HslOperatorToName(id) {
    switch (id) {
        case 6:
            return "Oy Pohjolan Liikenne Ab"
        case 12:
            return "Helsingin Bussiliikenne Oy"
        case 17:
            return "Tammelundin Liikenne Oy"
        case 18:
            return "Pohjolan Kaupunkiliikenne Oy"
        case 20:
            return "Bus Travel Åbergin Linja Oy"
        case 21:
            return "Bus Travel Oy Reissu Ruoti"
        case 22:
            return "Nobina Finland Oy"
        case 30:
            return "Savonlinja Oy"
        case 36:
            return "Nurmijärven Linja Oy"
        case 40:
            return "HKL-Raitioliikenne"
        case 45:
            return "Transdev Vantaa Oy"
        case 47:
            return "Taksikuljetus Oy"
        case 50:
            return "HKL-Metroliikenne"
        case 51:
            return "Korsisaari Oy"
        case 54:
            return "V-S Bussipalvelut Oy"
        case 55:
            return "Transdev Helsinki Oy"
        case 58:
            return "Koillisen Liikennepalvelut Oy"
        case 60:
            return "Suomenlinnan Liikenne Oy"
        case 59:
            return "Tilausliikenne Nikkanen Oy"
        case 89:
            return "Metropolia"
        case 90:
            return "VR Oy"
        default:
            return "-"
    }
}

export function HslVehType(type) {
    switch (type) {
        case "HSL/bus":
            return "Bussi"
        case "HSL/tram":
            return "Raitiovaunu"
        case "HSL/metro":
            return "Metro"
        case "HSL/train":
            return "Lähijuna"
        case "HSL/ferry":
            return "Lautta"
        case "HSL/ubus":
            return "bussi"
        case "HSL/robot":
            return "Robottibussi"
        default:
            return null
    }
}

export function HslLocationSources(type) {
    //GPS, ODO, MAN or N/A
    switch (type) {
        case "GPS":
            return "GPS"
        case "ODO":
            return "Matkamittari"
        case "MAN":
            return "Manuaalinen"
        default:
            return "Ei saatavilla"
    }
}