const inquirer = require('inquirer')
require('colors')

const menuOpts = [
    {
        type: 'list',
        name: 'opcion',
        message: 'Que desea hacer?\n',
        choices: [
            {
                value: 1,
                name: `${'1.'.green} Buscar ciudad`
            }, 
            {
                value: 2,
                name: `${'2.'.green} Historial`
            },
            {
                value: 0,
                name: `${'0.'.green} Salir`
            },
        ]

    }
]

const pausaOpt = [
    {
        type: 'input',
        name: 'enter',
        message: `Presione ${'ENTER'.green} para continuar`
    }
]


const inquireMenu = async() => {
    
    console.clear()

    console.log('==========================='.green)
    console.log(' Seleccione una opcion'.white)
    console.log('===========================\n'.green)

    const {opcion} = await inquirer.prompt(menuOpts)

    return opcion
    
}

const pausa = async() => {
    await inquirer.prompt(pausaOpt)
}

const leerInput = async(message) => {

    console.clear()
    const question = [ {
        type: 'input',
        name: 'desc',
        message,
        validate(value = '') {
            if (value.trim().length === 0) {
                return 'Por favor ingrese un valor'
            }
            return true
        }
    }]

    const {desc} = await inquirer.prompt(question)

    return desc.trim()
}

const listarLugares = async(lugares = []) => {

    const choices = lugares.map((lugar, i) => {
        const idx = `${i + 1}.`.green
        return { value: lugar.id, name: `${idx} ${lugar.nombre}`}
    })

    choices.unshift({
        value: '0',
        name: '0.'.green + ' Canclear'
    })

    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Seleccione lugar',
            choices
        }
    ]

    console.log('\n')
    const { id } = await inquirer.prompt(preguntas)
    console.log('\n')
    
    return id

}

const confirmar = async(message) => {

    const question = [ {
        type: 'confirm',
        name: 'ok',
        message
    }]

    const {ok} =  await inquirer.prompt(question)
    return ok

}

const mostrarListadoChecklist = async(tareas = []) => {

    const choices = tareas.map((tarea, i) => {
        i += 1
        return { 
            value: tarea.id, 
            name: `${i}. ${tarea.desc}`, 
            checked: (tarea.completadoEn) ? true : false
        }
    })

    choices.unshift({
        value: '0',
        name: '0.'.green + ' Canclear'
    })

    const pregunta = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Seleccione',
            choices
        }
    ]

    console.log('\n')
    const { ids } = await inquirer.prompt(pregunta)
    console.log('\n')
    
    return ids

}


module.exports = {
    inquireMenu,
    pausa,
    leerInput,
    listarLugares,
    confirmar,
    mostrarListadoChecklist
}

