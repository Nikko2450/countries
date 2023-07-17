import { useEffect, useState } from "react";
import { Search } from "../../components/Search/Search";
import { TableMemo } from "../../components/Table/Table";
import { Container } from "../../components/Container/Container";

const url = "https://restcountries.com/v3.1/all";

export const Main = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [sortedData, setSortedData] = useState([]);
  const [filterList, setFilterList] = useState({
    name: "",
    language: "",
    capital: "",
    continent: "",
  });
  const [sortVaule, setSortVaule] = useState({ column: "", direction: "" });
  const [error, setError] = useState("");

  const handleChange = (value, key) => {
    setFilterList((prev) => ({ ...prev, [key]: value }));
  };

  const handleSortAlphabetically = (a, b) => {
    if (a > b) {
      return sortVaule.direction === "up" ? -1 : 1;
    }

    if (a < b) {
      return sortVaule.direction === "up" ? 1 : -1;
    }

    return 0;
  };

  const handleSortByNumbers = (a, b) => {
    return sortVaule.direction === "up" ? a - b : b - a;
  };

  useEffect(() => {
    fetch(url, {
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .then((value) => {
        setData(value);
        setFilteredData(value);
        setSortedData(value);
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

  useEffect(() => {
    setSortedData(
      filteredData.sort((a, b) => {
        if (sortVaule.column === "name") {
          return handleSortAlphabetically(a.name.common, b.name.common);
        }

        if (sortVaule.column === "capital") {
          if (!a.capital) {
            return sortVaule.direction === "up" ? -1 : 1;
          }

          if (!b.capital) {
            return sortVaule.direction === "up" ? 1 : -1;
          }

          return handleSortAlphabetically(a.capital[0], b.capital[0]);
        }

        if (sortVaule.column === "population") {
          return handleSortByNumbers(a.population, b.population);
        }

        if (sortVaule.column === "area") {
          return handleSortByNumbers(a.area, b.area);
        }

        return;
      })
    );
  }, [sortVaule, filteredData]);

  return (
    <div className="main">
      <Container>
        <div className="main__wrapper">
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
        <TableMemo
          data={sortedData}
          onSortApply={(sort) => setSortVaule(sort)}
        />
      </Container>
    </div>
  );
};
