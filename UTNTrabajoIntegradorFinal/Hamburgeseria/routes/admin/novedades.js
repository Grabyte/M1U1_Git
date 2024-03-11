var express = require('express');
var router = express.Router();
var novedadesModels = require('../../models/novedadesModels');



/*GET para ir hacia la pagina de novedades */

router.get('/', async function(req, res, next) {

    var novedades = await novedadesModels.getNovedades();

    res.render('admin/novedades', {
        layout:'admin/layout',
        nombre:req.session.nombre,
        novedades
        });
    });

    //Para eliminar novedades
router.get('/eliminar/:id', async(req,res, next) => {
    const id = req.params.id;
    await novedadesModels.deleteNovedadesById(id);
    res.redirect('/admin/novedades');
}); //cierra el get eliminar

router.get('/agregar', (req, res, next) => {
    res.render('admin/agregar',{
        layout: 'admin/layout'
    });
}); //cierra el get

router.get('/modificar/:id', async (req, res, next) => {
    var id = req.params.id;

    var novedad = await novedadesModels.getNovedadById(id);
    res.render('admin/modificar', {
        layout: 'admin/layout',
        novedad
    });
});

router.post('/agregar', async (req, res, next) =>{
    try{
        if (req.body.titulo != "" && req.body.subtitulo != "" && req.body.cuerpo != ""){
            await novedadesModels.insertNovedades(req.body);
            res.redirect('/admin/novedades')
        } else {
            res.render('admin/agregar', {
                layout: 'admin/layout',
                error: true,
                message: 'Todos los campos son requeridos'
            })
        }
    } catch (error) {
        console.log(error)
        res.render('admin/agregar',{
            layout: 'admin/layout',
            error: true,
            message: 'No se cargo la novedad pipipi'
        })
    }
});

router.post('/modificar', async (req, res, next) =>{
    try{
        var obj = {
            titulo: req.body.titulo,
            subtitulo: req.body.subtitulo,
            cuerpo: req.body.cuerpo
        }

        var id = req.body.id;

        console.log(obj) // para ver si trae datos
        await novedadesModels.modificarNovedadById(obj, id);
        res.redirect('/admin/novedades');
    } catch (error) {
        console.log(error)
        res.render('admin/modificar',{
            layout: 'admin/layout',
            error: true,
            message: 'No se modifico la novedad'
        })
    }
});

module.exports = router;
