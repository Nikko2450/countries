import { useEffect, useState } from "react";
import "./App.sass";
import { Search } from "./components/Search/Search";
import { Table } from "./components/Table/Table";
import { Container } from "./components/Container/Container";

const url = "https://restcountries.com/v3.1/all";

function App() {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`${url}`, {
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .then((value) => {
        setData(value);
      })
      .catch((message) => {
        setError(message);
      });
  }, []);

  return (
    <div className="app">
      <Container>
        <div className="app__wrapper">
          <Search placeholder="Search by name" onChange={(value) => {}} />
          <Search placeholder="Search by language" />
          <Search placeholder="Search by Capital" />
          <Search placeholder="Search by language" />
        </div>
        <Table data={data} />
      </Container>
    </div>
  );
}

export default App;
