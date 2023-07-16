export const SortButtons = ({ onClickUp, onCkickDown }) => {
  return (
    <div className="sort-buttons">
      <button className="sort-buttons__button " onClick={onClickUp}>
        <img src="sort.svg" alt="sort" />
      </button>
      <button className="sort-buttons__button " onClick={onCkickDown}>
        <img src="sort.svg" alt="sort" />
      </button>
    </div>
  );
};
