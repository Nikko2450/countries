import { useEffect, useState } from "react";
import "./App.sass";
import { Search } from "./components/Search/Search";
import { Table } from "./components/Table/Table";
import { Container } from "./components/Container/Container";

const url = "https://restcountries.com/v3.1/all";

function App() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filterList, setFilterList] = useState({
    name: "",
    language: "",
    capital: "",
    continent: "",
  });
  const [error, setError] = useState("");

  const handleChange = (value, key) => {
    setFilterList((prev) => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    fetch(`${url}`, {
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .then((value) => {
        setData(value);
        setFilteredData(value);
      })
      .catch((message) => {
        setError(message);
      });
  }, []);

  useEffect(() => {
    setFilteredData(
      data.filter((item) => {
        const lowerCaseCountryFilter = filterList.name.toLowerCase();
        const lowerCaseLanguageFilter = filterList.language.toLowerCase();
        const lowerCaseCapitalFilter = filterList.capital.toLowerCase();
        const loweCaseContinentFilter = filterList.continent.toLowerCase();
        const lowerCaseCountry = item.name.common.toLowerCase();
        const lowerCaseCapital = item.capital
          ? item.capital[0].toLowerCase()
          : "";
        const loweCaseContinent = item.continents[0].toLowerCase();

        return lowerCaseCountry.includes(lowerCaseCountryFilter) &&
          lowerCaseCapital.includes(lowerCaseCapitalFilter) &&
          loweCaseContinent.includes(loweCaseContinentFilter) &&
          item.languages
          ? Object.values(item.languages).findIndex((item) => {
              return item.toLowerCase().includes(lowerCaseLanguageFilter);
            }) != -1
          : false;
      })
    );
  }, [filterList]);

  return (
    <div className="app">
      <Container>
        <div className="app__wrapper">
          <Search
            placeholder="Search by name"
            onChange={(value) => handleChange(value, "name")}
          />
          <Search
            placeholder="Search by language"
            onChange={(value) => handleChange(value, "language")}
          />
          <Search
            placeholder="Search by capital"
            onChange={(value) => handleChange(value, "capital")}
          />
          <Search
            placeholder="Search by continent"
            onChange={(value) => handleChange(value, "continent")}
          />
        </div>
        <Table data={filteredData} />
      </Container>
    </div>
  );
}

export default App;
