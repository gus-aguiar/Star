import React, { useContext } from 'react';
import StarContext from '../context/StarContext';

function Table() {
  const { state, search, setSearch } = useContext(StarContext);

  const filteredByName = state
    ?.results
    ?.filter((searchRepo) => searchRepo.name.includes(search));

  return (
    <div>
      <input
        type="text"
        name="filtros"
        placeholder="Pesquisar"
        data-testid="name-filter"
        onChange={ (e) => setSearch(e.target.value) }
      />
      <table>
        <thead>
          <tr>
            {state?.results?.length > 0 && Object.keys(state.results[0])
              .map((key) => <th key={ key }>{ key }</th>)}
          </tr>
        </thead>
        <tbody>
          {filteredByName?.map((planet) => (
            <tr key={ planet.name }>
              {Object.values(planet).map((value) => (
                <td key={ value }>{ value }</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>

  );
}

export default Table;
