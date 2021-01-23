export const colorTheme = {
    TextBlack: "#323232",
    "HSL/bus": "#35b6f3",
    "HSL/ferry": "#1150ee",
    "HSL/tram": "#3fa426",
    "HSL/metro": "#e54a0c",
    "HSL/train": "#9e0eec",

    "Rata/": "#aaeec4",
    "Rata/Long-distance": "#99ec62",
    "Rata/Commuter": "#9e0eec",
    "Rata/Cargo": "#ec8516",
    "Rata/Locomotive": "#ff3131",
    "Rata/Test drive": "#cd0202",
    "Rata/On-track machines": "#ef7b15",
    "Rata/Shunting": "#d6e508",

    other: "#ea0c26"
}

export function getContrastYIQ(hexcolor = "#ffffff") {
    let r = parseInt(hexcolor.substr(1, 2), 16)
    let g = parseInt(hexcolor.substr(3, 2), 16)
    let b = parseInt(hexcolor.substr(5, 2), 16)
    let yiq = ((r*299)+(g*587)+(b*114))/1000
    return (yiq >= 160) ? colorTheme.TextBlack : "white"
}