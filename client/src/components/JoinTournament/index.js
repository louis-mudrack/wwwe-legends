import { useState, useEffect } from 'react';
import { useContext } from 'react';
import { UserContext } from '../../App';
import { useParams } from 'react-router-dom';
import useForm from '../../hooks/useForm';

export default function App() {
    const { name } = useParams();
    const user = useContext(UserContext);
    const initialValues = {
        username: '',
    };

    const { values, handleInputChange, handleSubmit } = useForm(initialValues, `/api/tournament/join/${name}`);
    const [tournament, setTournament] = useState(null);

    useEffect(() => {
        fetch(`/api/tournament/${name}`)
            .then((response) => response.json())
            .then((data) => {
                setTournament(data.data.doc);
            })
            .catch((error) => console.error(error));
    }, [name]);

    return (
        <div>
            <form onSubmit={handleSubmit} data-method="POST">
                <label className={user && "hidden"}>
                    Your Name:
                    <input name="username" value={values.name} onChange={handleInputChange} required />
                </label>
                <button type="submit">Join Tournament</button>
            </form>

            {tournament && (
                <div>
                    <h2>Registered Participants ({tournament.participants.length}):</h2>
                    <ul>
                        {tournament.participants.map((participant, index) => (
                            <li key={index}>{participant.name}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
