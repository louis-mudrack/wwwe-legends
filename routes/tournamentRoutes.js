const express = require('express');
const tournamentController = require('../controllers/tournamentController');
const authController = require('../controllers/authController');

const router = express.Router();

router.route('/:id').get(tournamentController.getTournament);

router.route('/').get(tournamentController.getAllTournaments);

router
    .route('/create')
    .post(authController.protect, authController.restrictTo('admin', 'moderator', 'eventmanager'), tournamentController.createTournament);

router
    .route('/join/:id')
    .post(tournamentController.joinTournament);

module.exports = router;
