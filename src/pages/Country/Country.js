import { useParams } from "react-router-dom";
import { Container } from "../../components/Container/Container";
import { useEffect, useState } from "react";

export const Country = () => {
  const { name } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  const url = `https://restcountries.com/v3.1/name/${name}?fullText=true`;

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
          <div className="country__wrapper">
            <div className="country__images">
              <img
                className="country__img"
                src={data.flags.svg}
                alt={data.name?.official ?? data.flags.alt}
              />
              {data.coatOfArms.svg && (
                <img
                  className="country__coatofarms"
                  src={data.coatOfArms.svg}
                  alt="coatOfArms"
                />
              )}
            </div>

            <div className="country__info">
              <h2 className="country__info-title">Сountry Information</h2>
              <ul className="country__list">
                <li className="country__list-wrapper">
                  <p className="country__capital paragraph color-green">
                    Capital: <span>{data.capital}</span>
                  </p>
                </li>
                <li className="country__list-wrapper">
                  <p className="country__area paragraph color-orange">
                    Area: <span>{data.area}</span>
                  </p>
                </li>
                <li className="country__list-wrapper">
                  <p className="country__continents paragraph color-green">
                    Continents: <span>{data.continents}</span>
                  </p>
                </li>
                <li className="country__list-wrapper">
                  <p
                    className={`country__independent paragraph ${
                      data.independent ? "color-gren" : "color-red"
                    }`}
                  >
                    Independent: <span>{data.independent ? "Yes" : "No"}</span>
                  </p>
                </li>
                <li className="country__list-wrapper">
                  <p
                    className={`country__landlocked paragraph ${
                      data.landlocked ? "color-green" : "color-red"
                    }`}
                  >
                    landlocked:{" "}
                    <span>{data.landlocked ? "Have" : "Not have"}</span>
                  </p>
                </li>
                {data.languages ? (
                  <li className="country__list-wrapper paragraph">
                    Language:{" "}
                    {Object.values(data.languages).map((value) => {
                      return (
                        <span
                          key={value}
                          className="country__languages paragraph"
                        >
                          {value}
                        </span>
                      );
                    })}
                  </li>
                ) : null}
                <li className="country__list-wrapper">
                  <a
                    className="country__maps paragraph color-green"
                    href={data.maps ? data.maps.googleMaps : "null"}
                    target="_blank"
                  >
                    Map: <span>Google Maps</span>
                  </a>
                </li>
                <li className="country__list-wrapper color-orange">
                  <p className="country__population paragraph">
                    Population: <span>{data.population}</span>
                  </p>
                </li>
                <li className="country__list-wrapper color-gren">
                  <p className="country__region paragraph">
                    Region: <span>{data.region}</span>
                  </p>
                </li>
                {data.timezones ? (
                  <li className="country__list-wrapper paragraph color-green">
                    Timezones:
                    {Object.values(data.timezones).map((value) => {
                      return (
                        <span className="country__timezones paragraph">
                          {value}
                        </span>
                      );
                    })}
                  </li>
                ) : null}
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </div>
  ) : null;
};
