function datetime() {
    let date_ob = new Date();

    // current date
    // adjust 0 before single digit date
    let date = ("0" + date_ob.getDate()).slice(-2);

    // current month
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

    // current year
    let year = date_ob.getFullYear();

    // current hours
    let hours = date_ob.getHours();

    // current minutes
    let minutes = date_ob.getMinutes();

    // current seconds
    let seconds = date_ob.getSeconds();

    return year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds
}

function datetimeshort() {
    let date_ob = new Date();

    // current date
    // adjust 0 before single digit date
    let date = ("0" + date_ob.getDate()).slice(-2);

    // current month
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

    // current year
    let year = date_ob.getFullYear();

    return year + "-" + month + "-" + date
}

function trimstring(fecha) {

    if (fecha.length > 10) {
        let caracter = fecha.indexOf('T')
        let cadena = fecha.slice(0,caracter)

        return cadena
    }
    
    return fecha
}

module.exports = {
    datetime,
    datetimeshort,
    trimstring
}