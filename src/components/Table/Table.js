import { TableRow } from "./TableRow/TableRow";
import { SortButtons } from "../SortButtons/SortButtons";
import { memo } from "react";

const Table = ({ data, onSortApply }) => {
  const handleClick = (column, direction) => {
    onSortApply({ column, direction });
  };

  return (
    <table className="table">
      <thead>
        <tr className="table__row">
          <th className="table__cell">
            <div className="table__wrapper">
              <span>name</span>
              <SortButtons
                onClickUp={() => handleClick("name", "up")}
                onCkickDown={() => handleClick("name", "down")}
              />
            </div>
          </th>
          <th className="table__cell">
            <div className="table__wrapper">
              <span>capital</span>
              <SortButtons
                onClickUp={() => handleClick("capital", "up")}
                onCkickDown={() => handleClick("capital", "down")}
              />
            </div>
          </th>
          <th className="table__cell">
            <div className="table__wrapper">
              <span>population</span>
              <SortButtons
                onClickUp={() => handleClick("population", "up")}
                onCkickDown={() => handleClick("population", "down")}
              />
            </div>
          </th>
          <th className="table__cell">
            <div className="table__wrapper">
              <span>area</span>
              <SortButtons
                onClickUp={() => handleClick("area", "up")}
                onCkickDown={() => handleClick("area", "down")}
              />
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
              fullName={item.name.official}
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

export const TableMemo = memo(Table);
