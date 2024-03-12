-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 12-03-2024 a las 04:07:48
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `hamburgeseria`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `novedades`
--

CREATE TABLE `novedades` (
  `id` int(11) NOT NULL,
  `titulo` varchar(250) NOT NULL,
  `subtitulo` text NOT NULL,
  `cuerpo` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `novedades`
--

INSERT INTO `novedades` (`id`, `titulo`, `subtitulo`, `cuerpo`) VALUES
(1, 'Descartan 17 kilos de cocaína en la margen del Río Pescado', 'El estupefaciente se encontraba dentro de dos mochilas que eran trasladadas en una bolsa por un ciudadano, quien arrojó la misma, al oír la voz de alto en nombre de la Institución y se dio a la fuga.\r\n\r\nEl personal de la Fuerza incautó 16 “ladrillos” con la droga.', 'Mientras los efectivos de la Sección “28 de Julio”, que depende del Escuadrón 20 “Orán”, en conjunto con la Unidad de Reconocimiento \"Tucumán\", realizaban ayer tareas de patrullaje pedestre a orillas del Río Pescado, en el sector denominado \"Portón Blanco\", divisaron un ciudadano que trasladaba un bulto sobre su espalda, lo cual llamó la atención de los funcionarios.\r\n\r\nAl advertir la presencia de los gendarmes, el hombre emprendió una huida hacia la zona montuosa, arrojando la bolsa al suelo.\r\n\r\nAnte este hecho, los uniformados efectuaron un rastrillaje en la zona y trasladaron el bulto hasta la Subunidad, donde inspeccionaron el mismo en presencia de testigos.\r\n\r\nLos funcionarios extrajeron dos mochilas, dentro de las cuales había un total de 16 paquetes rectangulares, que contenían una sustancia pulverulenta blancuzca. La misma fue sometida a las pruebas de campo Narcotest y arrojó resultado positivo para cocaína, con un peso de 17 kilos 58 gramos.\r\n\r\nLa Fiscalía Federal de Orán orientó el decomiso del estupefaciente.'),
(5, 'Descartan 17 kilos de cocaína en la margen del Río Pescado', 'El estupefaciente se encontraba dentro de dos mochilas que eran trasladadas en una bolsa por un ciudadano, quien arrojó la misma, al oír la voz de alto en nombre de la Institución y se dio a la fuga.\r\n\r\nEl personal de la Fuerza incautó 16 “ladrillos” con la droga.', 'Mientras los efectivos de la Sección “28 de Julio”, que depende del Escuadrón 20 “Orán”, en conjunto con la Unidad de Reconocimiento \"Tucumán\", realizaban ayer tareas de patrullaje pedestre a orillas del Río Pescado, en el sector denominado \"Portón Blanco\", divisaron un ciudadano que trasladaba un bulto sobre su espalda, lo cual llamó la atención de los funcionarios.\r\n\r\nAl advertir la presencia de los gendarmes, el hombre emprendió una huida hacia la zona montuosa, arrojando la bolsa al suelo.\r\n\r\nAnte este hecho, los uniformados efectuaron un rastrillaje en la zona y trasladaron el bulto hasta la Subunidad, donde inspeccionaron el mismo en presencia de testigos.\r\n\r\nLos funcionarios extrajeron dos mochilas, dentro de las cuales había un total de 16 paquetes rectangulares, que contenían una sustancia pulverulenta blancuzca. La misma fue sometida a las pruebas de campo Narcotest y arrojó resultado positivo para cocaína, con un peso de 17 kilos 58 gramos.\r\n\r\nLa Fiscalía Federal de Orán orientó el decomiso del estupefaciente.'),
(6, 'Robles gata', 'este gato concha e su madre', 'Miaumiaumiaumiaumiau dice el gato, si.'),
(8, 'Robles ¿gato o gata?', 'bolas', 'cola\r\n');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `usuario` varchar(250) NOT NULL,
  `clave` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `usuario`, `clave`) VALUES
(1, 'Gabriel', '81dc9bdb52d04dc20036dbd8313ed055'),
(2, 'Ricardo', 'd93591bdf7860e1e4ee2fca799911215');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `novedades`
--
ALTER TABLE `novedades`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `novedades`
--
ALTER TABLE `novedades`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
