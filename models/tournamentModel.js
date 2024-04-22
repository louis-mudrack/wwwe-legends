const mongoose = require('mongoose');

const tournamentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A tournament must have a name'],
        unique: true,
    },
    date: {
        type: Date,
        required: [true, 'A tournament must have a date'],
    },
    maxParticipants: {
        type: Number,
        required: true,
    },
    participants: [
        {
            type: String,
            ref: 'User',
        },
    ],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'A tournament must have a creator'],
    }
});

const Tournament = mongoose.model('Tournament', tournamentSchema);

module.exports = Tournament;
