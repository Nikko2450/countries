import { Link } from "react-router-dom";

export const TableRow = ({
  imgSrc,
  name,
  fullName,
  currencies,
  population,
  capital,
  area,
  continents,
  alt,
}) => {
  return (
    <tr className="table-row">
      <td className="table-row__cell">
        <div className="table-row__wrapper">
          <img className="table-row__img" src={imgSrc} alt={alt} />
          <Link
            className="table-row__desc hover"
            to={`/country/${fullName.toLowerCase()}`}
          >
            {name}
          </Link>
        </div>
      </td>
      <td className="table-row__cell">
        <p className="table-row__desc">{capital}</p>
      </td>
      <td className="table-row__cell">
        <p className="table-row__desc">{population}</p>
      </td>
      <td className="table-row__cell">
        <p className="table-row__desc">{area}</p>
      </td>
      <td className="table-row__cell">
        <p className="table-row__desc">{continents}</p>
      </td>
      <td className="table-row__cell">
        <p className="table-row__desc">
          {!!currencies ? currencies.join(", ") : ""}
        </p>
      </td>
    </tr>
  );
};
