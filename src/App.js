import {useQuery} from "@apollo/client";
import Persons from "./components/Persons";
import PeronForm from "./components/PersonForm";
import {ALL_PERSONS} from "./graphql/queries";

function App() {
  //Poll
  // const result = useQuery(ALL_PERSONS, {
  //   pollInterval: 2000
  // });

  const result = useQuery(ALL_PERSONS);

  if (result.loading) {
    return <div>Loading...</div>
  }

  return (
    <>
      <Persons persons={result.data.allPersons}/>
      <PeronForm />
    </>
  );
}

export default App;
