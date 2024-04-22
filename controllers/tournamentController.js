const Tournament = require('../models/tournamentModel');
const factory = require('./handlerFactory');

exports.createTournament = async (req, res) => {
    try {
        // Format the date to German date
        const date = new Date(req.body.date);
        const formattedDate = date.toLocaleDateString('de-DE').replace(/\./g, '-');

        // Set the tournament's name to the provided name + the formatted date
        const tournamentName = `${req.body.tournamentName}-${formattedDate}`;

        const newTournament = await Tournament.create({
            ...req.body,
            name: tournamentName,
            createdBy: req.user.id,
        });

        res.status(201).json({
            status: 'success',
            data: {
                tournament: newTournament,
            },
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err,
        });
    }
};

exports.joinTournament = async (req, res) => {
    try {
        const participant = req.body.username;

        if (!participant) {
            // If the user didn't provide a username, send an error response
            return res.status(400).json({
                status: 'fail',
                message: 'You must provide a username to register for a tournament',
            });
        }

        const tournament = await Tournament.findOne({ name: req.params.id });

        if (tournament.participants.length >= tournament.maxParticipants) {
            return res.status(400).json({
                status: 'fail',
                message: 'Tournament is full',
            });
        }

        tournament.participants.push(participant);
        await tournament.save();

        res.status(200).json({
            status: 'success',
            data: {
                tournament,
            },
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err,
        });
    }
};

exports.getTournament = factory.getOne(Tournament);
exports.getAllTournaments = factory.getAll(Tournament);
