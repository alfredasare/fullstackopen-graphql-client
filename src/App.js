import {useState} from "react";
import {useQuery} from "@apollo/client";
import Persons from "./components/Persons";
import PeronForm from "./components/PersonForm";
import {ALL_PERSONS} from "./graphql/queries";
import Notify from "./components/Notify";
import PhoneForm from "./components/PhoneForm";

function App() {
  //Poll
  // const result = useQuery(ALL_PERSONS, {
  //   pollInterval: 2000
  // });

  const [errorMessage, setErrorMessage] = useState(null);

  const result = useQuery(ALL_PERSONS);

  if (result.loading) {
    return <div>Loading...</div>
  }

  return (
    <>
      <Notify errorMessage={errorMessage}/>
      <Persons persons={result.data.allPersons}/>
      <PeronForm setError={setErrorMessage}/>
      <PhoneForm setError={setErrorMessage}/>
    </>
  );
}

export default App;
