import { useEffect } from "react";
import { TableRow } from "./TableRow/TableRow";

export const Table = ({ data }) => {
  return (
    <table>
      <thead>
        <tr className="table__row">
          <th className="table__cell">
            <div className="table__wrapper">
              <span>name</span>
              <a href="#" className="table__img">
                <img src="sort.svg" alt="sort" />
              </a>
            </div>
          </th>
          <th className="table__cell">
            <div className="table__wrapper">
              <span>capital</span>
              <a href="#" className="table__img">
                <img src="sort.svg" alt="sort" />
              </a>
            </div>
          </th>
          <th className="table__cell">
            <div className="table__wrapper">
              <span>population</span>
              <a href="#" className="table__img">
                <img src="sort.svg" alt="sort" />
              </a>
            </div>
          </th>
          <th className="table__cell">
            <div className="table__wrapper">
              <span>area</span>
              <a href="#" className="table__img">
                <img src="sort.svg" alt="sort" />
              </a>
            </div>
          </th>
          <th className="table__cell">continents</th>
          <th className="table__cell">currencies</th>
        </tr>
      </thead>

      <tbody>
        {data.length ? (
          data.map((item) => (
            <TableRow
              key={item.name.common}
              name={item.name.common}
              imgSrc={item.flags.svg}
              capital={item.capital}
              population={item.population}
              area={item.area}
              continents={item.continents}
              currencies={
                item?.currencies
                  ? Object.values(item.currencies).map(
                      (currency) => currency.name
                    )
                  : null
              }
              alt={item.flags.alt}
            />
          ))
        ) : (
          <tr>
            <td>Empty</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};
