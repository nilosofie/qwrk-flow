import React from 'react';

function Sublist({ sublistId, sublistName, sublistItems }) {
  const sublistItemMap = sublistItems.map(({ sublistItemId, item }) => (
    <li key={sublistItemId}>
      {item} - {sublistItemId}
    </li>
  ));
  return (
    <div className="block">
      <form>
        <div className="block">
          <h2>{sublistName}</h2>
        </div>
        <div className="block">
          <ul>{sublistItemMap}</ul>
        </div>
        <div className="columns is-mobile">
          <div className="column">
            <input type="text" className="input" />
          </div>
          <div className="column is-narrow">
            <button type="submit" className="button is-primary is-outlined">
              add
            </button>
          </div>
        </div>
      </form>
      <hr />
    </div>
  );
}

export default Sublist;
