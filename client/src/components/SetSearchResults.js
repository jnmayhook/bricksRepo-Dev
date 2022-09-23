import React from 'react';

function SetSearchResults({ set }) {
  if (!set) {
    return <></>
  }
  return (
    <>
    <h2 className='mt-5 lego-set-header'>Results:</h2>
      <div className='col-9 lego-set-item mt-1'>
        <div className="card">
          <img className="card-img-top" src={set.Image_URL} alt="{set.Name}" />
          <div className="card-body">
            <div className="card-title h3"><span>Set: </span>{set.Item_Number}</div>
            <ul className="lego-set-details">
              <li className="card-text">{set.setName}</li>
              <li className="card-text font-weight-bold"><span></span>{set.Year}</li>
              <li className="card-text"><span>Theme:</span> {set.Theme}</li>
              <li className="card-text"><span>Subtheme:</span> {set.Subtheme}</li>
              <li className="card-text"><span>Pieces:</span> {set.Pieces}</li>
              <li className="card-text"><span>Minifigs:</span> {set.Minifigures}</li>
            </ul>
            <button type="submit" className="btn btn-blue mt-3 save-set">Save Set</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SetSearchResults;