const { Router } = require('express');
const TipoEquipo = require('../models/TipoEquipo');
const { validarTipoEquipo } = require('../helpers/validar-tipoEquipo');

const router = Router();

router.get('/', async function(req, res) {
    try {
        const tipo = await TipoEquipo.find();
        res.send(tipo);

    }catch(error) {
        console.log(error);
        res.status(500).send('Ocurrió un error');
    }
});

router.post('/', async function(req, res) {
    try {

        const validaciones = validarTipoEquipo(req);

        if (validaciones.length > 0) {
            return res.status(400).send(validaciones);
        }

        let tipo = new TipoEquipo();
        tipo.nombre = req.body.nombre;
        tipo.estado = req.body.estado,
        tipo.fechaCreacion = new Date();
        tipo.fechaActualizacion = new Date();
        tipo = await tipo.save();
        res.send(tipo);

    }catch(error) {
        console.log(error);
        res.status(500).send('Ocurrió un error');
    }
});

router.put('/:tipoId', async function(req, res) {
    try {
        let tipo = await TipoEquipo.findById(req.params.tipoId);
        if (!tipo) {
            return res.status(400).send('Tipo equipo no existe');
        }
        tipo.nombre = req.body.nombre;
        tipo.estado = req.body.estado,
        tipo.fechaActualizacion = new Date();
        tipo = await tipo.save();
        res.send(tipo);

    }catch(error) {
        console.log(error);
        res.status(500).send('Ocurrió un error');
    }
});

module.exports = router;