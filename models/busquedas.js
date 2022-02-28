const fs = require('fs')

const axios = require('axios');


class Busquedas {


    historial = []
    dbPath = './db/database.json'


    constructor() {
        this.leerDB()
    }

    get historialCapitalizado() {
        return this.historial.map(lugar => {
            let palabras = lugar.split(' ')
            palabras = palabras.map(p => p[0].toUpperCase() + p.substring(1))

            return palabras.join(' ')
        })
    }

    get paramsMapbox() {

        return {
            'access_token': process.env.MAPBOX_KEY,
            'limit': 5,
            'language': 'es'
        }
        
    }

    get paramsOpenweather() {
        return {
            'appid': process.env.OPENWEATHER_KEY,
            'units': 'metric',
            'lang': 'es'
        }
    }

    async climaLugar (lat, lon) {

        try {

            const instace = axios.create({
                baseURL: 'https://api.openweathermap.org/data/2.5/weather',
                params: {...this.paramsOpenweather, lat, lon}
            })
    
            const {data} = await instace.get()

            return {
                desc: data.weather[0].description,
                min: data.main.temp_min,
                max: data.main.temp_max,
                temp: data.main.temp
            }

            
        } catch (error) {
            console.log(error)
            return []
        }

        


    }


    async ciudad (lugar = '') {
        
        try {


            const instace = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
                params: this.paramsMapbox
            })
        
            const resp = await instace.get()
            
            return resp.data.features.map(lugar => ({
                id: lugar.id,
                nombre: lugar.place_name,
                lng: lugar.center[0],
                lat: lugar.center[1]

            }))
            
        } catch (error) {
            return [];
            
        }


    }

    agregarHistorial(lugar = '') {

        if (this.historial.includes(lugar.toLocaleLowerCase())) {
            return
        }

        this.historial = this.historial.splice(0,5)

        this.historial.unshift(lugar.toLocaleLowerCase())
        
        this.guardarDB()
    }

    guardarDB() {

        const payload = {
            historial: this.historial
        }


        fs.writeFileSync(this.dbPath, JSON.stringify(payload))

    }

    leerDB() {

        // Debe de existir

        if(fs.existsSync(this.dbPath)) {

            const info = fs.readFileSync(this.dbPath, {encoding: 'utf-8'})
            const data = JSON.parse(info)
            this.historial = data.historial

        }


    }


 
}


module.exports = Busquedas