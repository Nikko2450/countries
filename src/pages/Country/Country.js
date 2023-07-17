import { useParams } from "react-router-dom";
import { Container } from "../../components/Container/Container";
import { useEffect, useState } from "react";

export const Country = () => {
  const { name } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  const url = `https://restcountries.com/v3.1/name/${name}`;

  useEffect(() => {
    if (name) {
      fetch(url, {
        method: "GET",
      })
        .then((response) => {
          return response.json();
        })
        .then((value) => {
          setData(value[0]);
        })
        .catch((massage) => {
          setError(massage);
        });
    }
  }, [name]);

  return data ? (
    <div>
      <Container>
        <div className="country">
          <h1 className="country__title">{data.name?.official}</h1>
          <img
            className="country__img"
            src={data.flags.svg}
            alt={data.name?.official ?? data.flags.alt}
          />
          {data.coatOfArms.svg && (
            <img
              className="country__img"
              src={data.coatOfArms.svg}
              alt="coatOfArms"
            />
          )}
        </div>
        <div className="country__info">
          <p className="country__capital">Capital: {data.capital}</p>
          <p className="country__area">Area: {data.area}</p>
          <p className="country__continents">Continents: {data.continents}</p>
          <p className="country__independent">
            Independent: {data.independent === true ? "Yes" : "No"}
          </p>
          <p className="country__landlocked">
            landlocked: {data.landlocked === true ? "Have" : "Not have"}
          </p>
          {data.languages
            ? Object.values(data.languages).map((value) => {
                return (
                  <p key={value} className="country__languages">
                    {value}
                  </p>
                );
              })
            : ""}
          <a
            className="coutry__maps"
            href={data.maps ? data.maps.googleMaps : "Not Google Maps"}
          >
            Google Maps
          </a>
          <p className="coutry__population">Population: {data.population}</p>
          <p className="coutry__region">Region: {data.region}</p>
          <p className="coutry__timezones">Timezones: {data.timezones}</p>
        </div>
      </Container>
    </div>
  ) : null;
};
