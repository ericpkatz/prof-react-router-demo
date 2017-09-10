import React from 'react';

const ThingList = ({ things })=> {
  return (
    <div>
      <h2>Things</h2>
      <ul className='list-group'>
        {
          things.map( thing => {
            return (
              <li className='list-group-item' key={ thing.id }>{ thing.name }</li>
            )
          })
        }
      </ul>
    </div>
  );
};

export default ThingList;
