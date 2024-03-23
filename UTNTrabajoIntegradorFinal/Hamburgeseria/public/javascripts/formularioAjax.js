document.addEventListener('DOMContentLoaded', function() {
    var form = document.getElementById('contact-form');
    var submitButton = document.getElementById('submit-btn');
    var successMessage = document.getElementById('success-message');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Evita el envío del formulario por defecto

        // Realiza la solicitud AJAX
        var xhr = new XMLHttpRequest();
        xhr.open('POST', '/', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    // Si la solicitud es exitosa, muestra el mensaje de éxito y oculta el formulario
                    successMessage.style.display = 'block';
                    form.reset();
                    setTimeout(function() {
                        successMessage.style.display = 'none';
                    }, 5000); // Oculta el mensaje después de 5 segundos
                } else {
                    // Si hay un error en la solicitud, muestra un mensaje de error
                    console.error('Error al enviar el formulario:', xhr.status);
                }
            }
        };
        // Obtiene los datos del formulario y envía la solicitud
        var formData = new FormData(form);
        xhr.send(JSON.stringify(Object.fromEntries(formData)));
    });
});