var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var novedadesModels = require('../models/novedadesModels');
var cloudinary = require('cloudinary').v2;

// Función para transformar las novedades y agregar la URL de la imagen
const transformarNovedades = novedades => {
  return novedades.splice(0, 5).map(novedad => {
    const imagen = novedad.img_id ? cloudinary.url(novedad.img_id, { crop: 'fill' }) : '';
    return { ...novedad, imagen };
  });
};

/* GET home page. */
router.get('/', async function(req, res, next) {
  try {
    var novedades = await novedadesModels.getNovedades();
    novedades = transformarNovedades(novedades);
    res.render('index', { novedades });
  } catch (error) {
    // Manejar el error
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  // Verifica la validez de los datos del formulario
  if (!req.body.nombre || !req.body.apellido || !req.body.email || !req.body.telefono || !req.body.mensaje) {
    try {
      const novedades = await novedadesModels.getNovedades();
      res.render('index', {
        error: 'Todos los campos son obligatorios',
        novedades: transformarNovedades(novedades)
      });
    } catch (error) {
      // Manejar el error
      next(error);
    }
  }

  // Obtén los datos del formulario
  var nombre = req.body.nombre;
  var apellido = req.body.apellido;
  var email = req.body.email;
  var telefono = req.body.telefono;
  var mensaje = req.body.mensaje;

  // Crear objeto para el correo electrónico
  var obj = {
    to: 'riki.torrena@gmail.com',
    subject: 'Contacto desde la web',
    html: nombre + " " + apellido + " se contactó a través del formulario y quiere más información a este correo: " + email + ". <br>Además, dejó el siguiente comentario: " + mensaje + "<br> Su teléfono es " + telefono
  };

  // Crear transporte para enviar el correo electrónico
  var transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  try {
    // Envía el correo electrónico
    var info = await transporter.sendMail(obj);
    // Renderiza la página 'index' con un mensaje de éxito y los datos de 'novedades'
    res.render('index', {
      message: 'Mensaje enviado correctamente',
      novedades: transformarNovedades(await novedadesModels.getNovedades())
    });
  } catch (error) {
    console.error("Error al enviar el correo:", error);
    // Renderiza la página 'index' con un mensaje de error y los datos de 'novedades'
    res.render('index', {
      error: 'Hubo un error al enviar el mensaje, por favor inténtalo de nuevo más tarde',
      novedades: transformarNovedades(await novedadesModels.getNovedades())
    });
  }
});

module.exports = router;
