const { Router } = require('express');
const EstadoEquipo = require('../models/EstadoEquipo');
const { validarEstadoEquipo } = require('../helpers/validar-estadoEquipo');

const router = Router();

router.get('/', async function(req, res) {
    try {
        const estado = await EstadoEquipo.find();
        res.send(estado);
    }catch(error) {
        console.log(estado);
        res.status(500).send('Ocurrió un error');
    }
});

router.post('/', async function(req, res) {
    try {
        const validaciones = validarEstadoEquipo(req);

        if (validaciones.length > 0) {
            return res.status(400).send(validaciones);
        }

        let estado = new EstadoEquipo();
        estado.nombre = req.body.nombre;
        estado.estado = req.body.estado,
        estado.fechaCreacion = new Date();
        estado.fechaActualizacion = new Date();
        estado = await estado.save();
        res.send(estado);

    }catch(error) {
        console.log(error);
        res.status(500).send('Ocurrió un error');
    }
});

router.put('/:estadoId', async function(req, res) {
    try {
        let estado = await EstadoEquipo.findById(req.params.estadoId);
        if (!estado) {
            return res.status(400).send('Estado no existe');
        }
        estado.nombre = req.body.nombre;
        estado.estado = req.body.estado,
        estado.fechaActualizacion = new Date();
        estado = await estado.save();
        res.send(estado);

    }catch(error) {
        console.log(error);
        res.status(500).send('Ocurrió un error');
    }
});

module.exports = router;