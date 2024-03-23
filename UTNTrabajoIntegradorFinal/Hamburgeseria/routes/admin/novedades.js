var express = require('express');
var router = express.Router();
var novedadesModels = require('../../models/novedadesModels');

var util = require('util');
var cloudinary = require('cloudinary').v2;
const uploader = util.promisify(cloudinary.uploader.upload);
const destroy = util.promisify(cloudinary.uploader.destroy);



/*GET para listar las novedades */

router.get('/', async function(req, res, next) {

    var novedades = await novedadesModels.getNovedades();

    novedades = novedades.map(novedad => {
        if (novedad.img_id) {
            const imagen = cloudinary.image(novedad.img_id, {
                width: 50,
                height: 50,
                crop: 'fill'
            });
            return {
                ...novedad, //va a traer todo lo que esta en novedades "Titulo" "Subtitulo" "cuerpo"
                imagen  // y le va a adicionar la imagen.
            }
        } else {
            return {
                ...novedad,
                imagen: ''
            }
        }
    });

    res.render('admin/novedades', {
        layout:'admin/layout',
        nombre:req.session.nombre,
        novedades
        });
    });

    //Para eliminar novedades
router.get('/eliminar/:id', async(req,res, next) => {
    const id = req.params.id;

    let novedad = await novedadesModels.getNovedadById(id);
    if (novedad.img_id) {
        await (destroy(novedad.img_id));
    }

    await novedadesModels.deleteNovedadesById(id);
    res.redirect('/admin/novedades');
}); //cierra el get eliminar

    //para ir a la vista de agregar novedades
router.get('/agregar', (req, res, next) => {
    res.render('admin/agregar',{
        layout: 'admin/layout'
    });
}); //cierra el get agregar

router.get('/modificar/:id', async (req, res, next) => {
    var id = req.params.id;

    var novedad = await novedadesModels.getNovedadById(id);
    res.render('admin/modificar', {
        layout: 'admin/layout',
        novedad
    });
});

    //Metodo post para agregar informacion a la bd desde "agregar"
router.post('/agregar', async (req, res, next) =>{
    try{

        var img_id = "";
        if(req.files && Object.keys(req.files).length > 0) {
            imagen = req.files.imagen;
            img_id = (await uploader(imagen.tempFilePath)).public_id;
        }

        if (req.body.titulo != "" && req.body.subtitulo != "" && req.body.cuerpo != ""){
            await novedadesModels.insertNovedades({...req.body, img_id});
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
        let img_id = req.body.img_original;
        let borrar_img_vieja = false;

        if(req.body.img_delete === "1") {
            img_id = null;
            borrar_img_vieja = true;
        } else {
            if (req.files && Object.keys(req.files).length > 0){
                imagen = req.files.imagen;
                img_id = (await uploader(imagen.tempFilePath)).public_id;
                borrar_img_vieja = true;
            }
        }
        if (borrar_img_vieja && req.body.img_original) {
            await (destroy(req.body.img_original));
        }

        var obj = {
            titulo: req.body.titulo,
            subtitulo: req.body.subtitulo,
            cuerpo: req.body.cuerpo,
            img_id
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
