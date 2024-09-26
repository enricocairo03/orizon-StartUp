-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Creato il: Set 26, 2024 alle 10:57
-- Versione del server: 10.4.32-MariaDB
-- Versione PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `orizon`
--
CREATE DATABASE IF NOT EXISTS `orizon` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `orizon`;

-- --------------------------------------------------------

--
-- Struttura della tabella `ordine_utenti`
--

DROP TABLE IF EXISTS `ordine_utenti`;
CREATE TABLE `ordine_utenti` (
  `id_utente` int(11) NOT NULL,
  `id_ordini` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `ordine_utenti`
--

INSERT INTO `ordine_utenti` (`id_utente`, `id_ordini`) VALUES
(4, 1),
(3, 2),
(2, 3),
(1, 4);

-- --------------------------------------------------------

--
-- Struttura della tabella `ordini`
--

DROP TABLE IF EXISTS `ordini`;
CREATE TABLE `ordini` (
  `id_ordini` int(11) NOT NULL,
  `data_inserimento` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `ordini`
--

INSERT INTO `ordini` (`id_ordini`, `data_inserimento`) VALUES
(1, '2024-09-04'),
(2, '2024-07-15'),
(3, '2024-09-01');

-- --------------------------------------------------------

--
-- Struttura della tabella `ordini_prodotti`
--

DROP TABLE IF EXISTS `ordini_prodotti`;
CREATE TABLE `ordini_prodotti` (
  `id_ordini` int(11) NOT NULL,
  `id_prodotto` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `ordini_prodotti`
--

INSERT INTO `ordini_prodotti` (`id_ordini`, `id_prodotto`) VALUES
(1, 3),
(2, 1),
(3, 2);

-- --------------------------------------------------------

--
-- Struttura della tabella `prodotti`
--

DROP TABLE IF EXISTS `prodotti`;
CREATE TABLE `prodotti` (
  `id_prodotto` int(11) NOT NULL,
  `nome` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `prodotti`
--

INSERT INTO `prodotti` (`id_prodotto`, `nome`) VALUES
(1, 'Viaggio Islanda esplorazione natura incontaminata'),
(2, 'Safari Responsabile-Africa'),
(3, 'Tour in Tenda alla scoperta della Aurora Boreale '),
(4, 'Crociera a basso impatto ambientale');

-- --------------------------------------------------------

--
-- Struttura della tabella `utenti`
--

DROP TABLE IF EXISTS `utenti`;
CREATE TABLE `utenti` (
  `id_utenti` int(11) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `cognome` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `utenti`
--

INSERT INTO `utenti` (`id_utenti`, `nome`, `cognome`, `email`) VALUES
(1, 'Giuseppe', 'Rossi', 'giusepperossi@example.com'),
(2, 'Sara', 'Giglio', 'sara.giglio@example.com'),
(3, 'Antonio', 'Lipari', 'lipari1.antonio@example.com'),
(4, 'Lorenzo', 'Porto', 'portolorenzo9@example.com');

--
-- Indici per le tabelle scaricate
--

--
-- Indici per le tabelle `ordine_utenti`
--
ALTER TABLE `ordine_utenti`
  ADD KEY `Utenti` (`id_utente`);

--
-- Indici per le tabelle `ordini`
--
ALTER TABLE `ordini`
  ADD PRIMARY KEY (`id_ordini`);

--
-- Indici per le tabelle `ordini_prodotti`
--
ALTER TABLE `ordini_prodotti`
  ADD KEY `Prodotti` (`id_prodotto`),
  ADD KEY `Ordini` (`id_ordini`);

--
-- Indici per le tabelle `prodotti`
--
ALTER TABLE `prodotti`
  ADD PRIMARY KEY (`id_prodotto`);

--
-- Indici per le tabelle `utenti`
--
ALTER TABLE `utenti`
  ADD PRIMARY KEY (`id_utenti`);

--
-- AUTO_INCREMENT per le tabelle scaricate
--

--
-- AUTO_INCREMENT per la tabella `ordini`
--
ALTER TABLE `ordini`
  MODIFY `id_ordini` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT per la tabella `prodotti`
--
ALTER TABLE `prodotti`
  MODIFY `id_prodotto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT per la tabella `utenti`
--
ALTER TABLE `utenti`
  MODIFY `id_utenti` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Limiti per le tabelle scaricate
--

--
-- Limiti per la tabella `ordine_utenti`
--
ALTER TABLE `ordine_utenti`
  ADD CONSTRAINT `Utenti` FOREIGN KEY (`id_utente`) REFERENCES `utenti` (`id_utenti`);

--
-- Limiti per la tabella `ordini_prodotti`
--
ALTER TABLE `ordini_prodotti`
  ADD CONSTRAINT `Ordini` FOREIGN KEY (`id_ordini`) REFERENCES `ordini` (`id_ordini`) ON DELETE CASCADE,
  ADD CONSTRAINT `Prodotti` FOREIGN KEY (`id_prodotto`) REFERENCES `prodotti` (`id_prodotto`) ON DELETE CASCADE;
COMMIT;

--Query
-- Questo è solo un esempio, in un contesto reale dovrebbe essere eseguito tramite applicazione.
SELECT o.id_ordini, o.data_inserimento, GROUP_CONCAT(DISTINCT p.nome) AS prodotti, GROUP_CONCAT(DISTINCT u.nome) AS utenti FROM ordini o LEFT JOIN ordini_prodotti op ON o.id_ordini = op.id_ordini 
LEFT JOIN prodotti p ON op.id_prodotto = p.id_prodotto
 LEFT JOIN ordine_utenti ou ON o.id_ordini = ou.id_ordini 
LEFT JOIN utenti u ON ou.id_utente = u.id_utenti

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
