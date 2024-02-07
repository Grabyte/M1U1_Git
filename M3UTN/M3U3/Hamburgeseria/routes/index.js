var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/', async (req, res, next) => {

  if (!req.body.nombre || !req.body.apellido || !req.body.email || !req.body.telefono || !req.body.mensaje) {
    return res.render('index', {
      error: 'Todos los campos son obligatorios'
    });
  }

var nombre = req.body.nombre;
var apellido = req.body.apellido;
var email = req.body.email;
var telefono = req.body.telefono;
var mensaje = req.body.mensaje;

var obj = {
  to: 'riki.torrena@gmail.com',
  subject: 'Contacto desde la web',
  html: nombre +" "+ apellido + " Se contacto a traves del formulario y quiere más información a este mail: " + email + ". <br>Además, hizo el siguiente comentario: " + mensaje + "<br> Su telefono es " + telefono
} //cierra el var del obj

var transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
}); //Cierra el transporter

try {
  var info = await transporter.sendMail(obj);
  res.render('index', {
    message: 'Mensaje enviado correctamente'
  });
} catch (error) {
  console.error("Error al enviar el correo:", error);
  res.render('index', {
    error: 'Hubo un error al enviar el mensaje, por favor inténtalo de nuevo más tarde'
  });
}

}); //cierra la petision del post

module.exports = router;
