import useForm from '../../hooks/useForm';

export default function App() {
    const initialValues = {
        tournamentName: '',
        date: '',
        name: '',
        maxParticipants: '',
    };

    const { values, handleInputChange, handleSubmit } = useForm(initialValues, '/api/tournament/create');

    return (
        <form onSubmit={handleSubmit} data-method="POST">
            <label>
                Tournament Name:
                <input name="tournamentName" value={values.tournamentName} onChange={handleInputChange} required />
            </label>
            <label>
                Date:
                <input type="date" name="date" value={values.date} onChange={handleInputChange} required />
            </label>
            <label>
                Max Participants:
                <input
                    type="number"
                    name="maxParticipants"
                    value={values.maxParticipants}
                    onChange={handleInputChange}
                    required
                />
            </label>
            <button type="submit">Create Tournament</button>
        </form>
    );
}
