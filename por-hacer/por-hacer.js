const fs = require('fs');
let listadoPorHacer = [];
const guardarDB = () => {
    let data = JSON.stringify(listadoPorHacer);
    fs.writeFile('db/data.json', data, (err) => {
        if (err) throw new Error('no se pudo grabar', err);
    })
}

const cargarDB = () => {
    //El json que recibes te lo tramforma a un objeto
    try {
        listadoPorHacer = require('../db/data.json');
    } catch (error) {
        listadoPorHacer = [];
    }
}

const getListado = () => {
    cargarDB()
    return listadoPorHacer
}

const actualizar = (descripcion, completado = true) => {
    cargarDB();

    let index = listadoPorHacer.findIndex(tarea => {
        return tarea.descripcion === descripcion;
    })
    if (index >= 0) {
        listadoPorHacer[index].completado = completado
        guardarDB();
        return true;
    } else { return false }
}

const borrar = (descripcion) => {
    //Filter
    cargarDB();
    let index = listadoPorHacer.findIndex(tarea => {
        return tarea.descripcion === descripcion;
    })
    if (index >= 0) {
        //Borra 1 elemento desde hasta el index
        listadoPorHacer.splice(index, 1)
        guardarDB()
        return true;
    } else { return false; }
}

const crear = (descripcion) => {
    cargarDB();
    let porHacer = {
        descripcion,
        completado: false
    }
    listadoPorHacer.push(porHacer);
    guardarDB()
    return porHacer;
}
module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}