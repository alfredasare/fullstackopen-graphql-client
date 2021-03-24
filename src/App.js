import {gql, useQuery} from "@apollo/client";
import Persons from "./components/Persons";

const ALL_PERSONS = gql`
  query {
    allPersons {
      name
      phone
      id
    }
  }
`;

function App() {
  const result = useQuery(ALL_PERSONS);

  if (result.loading) {
    return <div>Loading...</div>
  }

  return (
    <Persons persons={result.data.allPersons}/>
  );
}

export default App;
