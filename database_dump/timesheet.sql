-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3308
-- Время создания: Май 18 2020 г., 21:11
-- Версия сервера: 8.0.18
-- Версия PHP: 7.3.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `timesheet`
--
CREATE DATABASE IF NOT EXISTS `timesheet` DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;
USE `timesheet`;

-- --------------------------------------------------------

--
-- Структура таблицы `job`
--

DROP TABLE IF EXISTS `job`;
CREATE TABLE IF NOT EXISTS `job` (
  `job_name` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `id` int(64) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`),
  UNIQUE KEY `SECOND` (`job_name`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Дамп данных таблицы `job`
--

INSERT INTO `job` (`job_name`, `id`) VALUES
('Техник', 1),
('Программист', 2),
('Бухгалтер', 3);

-- --------------------------------------------------------

--
-- Структура таблицы `people`
--

DROP TABLE IF EXISTS `people`;
CREATE TABLE IF NOT EXISTS `people` (
  `name` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `sec_name` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `date_of_birth` date NOT NULL,
  `job` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `local` varchar(8) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'false',
  `adress` varchar(128) COLLATE utf8_unicode_ci NOT NULL,
  `img` varchar(64) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL DEFAULT 'standart.jpg',
  `id` int(64) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_2` (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=64 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Дамп данных таблицы `people`
--

INSERT INTO `people` (`name`, `sec_name`, `date_of_birth`, `job`, `local`, `adress`, `img`, `id`) VALUES
('Егор', 'Монахов', '1998-08-26', 'Техник', '', 'г. СПб, на улице', '40.jpg', 40),
('Гоша', 'Кравчук', '1994-02-16', 'Программист', '1', 'г. Спб, ул. Куцинская. д.25', 'standart.jpg', 62),
('Алиса', 'Крауберг', '1998-09-29', 'Бухгалтер', '1', 'штат Вашингтон, г. Сиетл, ул. Сенека, д. 415', '63.jpg', 63);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
