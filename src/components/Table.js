import React, { useContext } from 'react';
import StarContext from '../context/StarContext';

function Table() {
  const { state } = useContext(StarContext);

  return (

    <table>
      <thead>
        <tr>
          {state?.results?.length > 0 && Object.keys(state.results[0])
            .map((key) => <th key={ key }>{ key }</th>)}
        </tr>
      </thead>
      <tbody>
        {state?.results?.map((planet) => (
          <tr key={ planet.name }>
            {Object.values(planet).map((value) => (
              <td key={ value }>{ value }</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>

  );
}

export default Table;
