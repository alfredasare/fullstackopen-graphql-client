import {useState} from "react";
import {useQuery, useApolloClient, useSubscription} from "@apollo/client";
import Persons from "./components/Persons";
import PeronForm from "./components/PersonForm";
import {ALL_PERSONS, PERSON_ADDED} from "./graphql/queries";
import Notify from "./components/Notify";
import PhoneForm from "./components/PhoneForm";
import LoginForm from "./components/LoginForm";

function App() {
    //Poll
    // const result = useQuery(ALL_PERSONS, {
    //   pollInterval: 2000
    // });

    const [errorMessage, setErrorMessage] = useState(null);
    const [token, setToken] = useState(null);
    const result = useQuery(ALL_PERSONS);
    const client = useApolloClient();

    const updateCacheWith = addedPerson => {
        const includedIn = (set, object) => set.map(p => p.id).includes(object.id);

        const dataInStore = client.readQuery({query: ALL_PERSONS});
        if (!includedIn(dataInStore.allPersons, addedPerson)) {
            client.writeQuery({
                query: ALL_PERSONS,
                data: {
                    allPersons: dataInStore.allPersons.concat(addedPerson)
                }
            });
        }
    };

    useSubscription(PERSON_ADDED, {
        onSubscriptionData: ({subscriptionData}) => {
            const addedPerson = subscriptionData.data.personAdded;
            setErrorMessage(`${addedPerson.name} added`);
            updateCacheWith(addedPerson);
        }
    });

    if (result.loading) {
        return <div>Loading...</div>
    }

    const logout = async () => {
        setToken(null);
        localStorage.removeItem('phonenumbers-user-token');
        await client.resetStore();
    };

    if (!token) {
        return (
            <div>
                <Notify errorMessage={errorMessage}/>
                <h2>Login</h2>
                <LoginForm
                    setToken={setToken}
                    setError={setErrorMessage}
                />
            </div>
        );
    }

    return (
        <>
            <button onClick={logout}>
                logout
            </button>
            <Notify errorMessage={errorMessage}/>
            <Persons persons={result.data.allPersons}/>
            <PeronForm setError={setErrorMessage} updateCacheWith={updateCacheWith}/>
            <PhoneForm setError={setErrorMessage}/>
        </>
    );
}

export default App;
