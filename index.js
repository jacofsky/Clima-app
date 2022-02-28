const { inquireMenu, pausa, leerInput, listarLugares } = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");
require('dotenv').config()




const main = async() => {

    const busquedas = new Busquedas()
    let opt;

    
    do {
        
        opt = await inquireMenu()
        switch (opt) {
            case 1:

            // Mostart mensaje

            const termino = await leerInput('Ciudad: ')

            const lugares = await busquedas.ciudad(termino)

            const id = await listarLugares(lugares)

            if (id === '0') continue

            const {nombre, lat, lng} = lugares.find(l => l.id === id)

            busquedas.agregarHistorial(nombre)

            const {desc, min, max, temp} = await busquedas.climaLugar(lat, lng)
            
            // Clima

            // Mostar resultados

            console.clear()
            console.log('\nInformacion de la ciudad\n')

            console.log('Ciudad:', nombre)
            console.log('Lat:', lat)
            console.log('Lng:', lng)
            console.log('Temperatura:',temp)
            console.log('Minima:',min)
            console.log('Maxima:',max)
            console.log('Como esta el clima:',desc)



                
                break;
    
            case 2:


                console.log('\n')
                busquedas.historialCapitalizado.forEach((lugar, i) => {
                    const idx = `${i + 1}.`.green
                    console.log(`${idx} ${lugar}`)
                })
                console.log('\n')

                
                break;
            
            default:
                break;
        }

        if (opt !== 0) await pausa()
    } while (opt !== 0);

   
}

main()


