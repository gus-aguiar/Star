import React, { useContext, useEffect, useState } from 'react';
import StarContext from '../context/StarContext';

function Table() {
  const { state, search, setSearch } = useContext(StarContext);
  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [value, setValue] = useState(0);
  const [filtered, setFiltered] = useState([]);
  const [filters, setFilters] = useState([]);

  const handleFilterAdd = () => {
    const newFilter = {
      column,
      comparison,
      value,
    };
    setFilters([...filters, newFilter]);
  };

  const filteredByName = state
    ?.results
    ?.filter((searchRepo) => searchRepo.name.includes(search));

  const filterPlanets = (arrayFilter) => {
    const filteredByValueAndName = filteredByName.filter((planet) => {
      if (arrayFilter.comparison === 'maior que') {
        return Number(planet[arrayFilter.column]) > Number(arrayFilter.value);
      }
      if (arrayFilter.comparison === 'menor que') {
        return Number(planet[arrayFilter.column]) < Number(arrayFilter.value);
      }
      if (arrayFilter.comparison === 'igual') {
        return Number(planet[arrayFilter.column]) === Number(arrayFilter.value);
      } return filteredByName;
    });
    return setFiltered(filteredByValueAndName);
  };

  const filterUnion = filtered
    .filter((planet) => filteredByName
      .some((p) => p.name === planet
        .name));

  useEffect(() => {
    filters.forEach((filter) => filterPlanets(filter));
  }, [filters]);

  return (
    <div>
      <div>
        <label htmlFor="column-filter">Coluna:</label>
        <select
          id="column-filter"
          value={ column }
          onChange={ (e) => setColumn(e.target.value) }
          data-testid="column-filter"
        >
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
        </select>
        <label htmlFor="comparison-filter">comparação</label>
        <select
          id="comparison-filter"
          value={ comparison }
          onChange={ (e) => setComparison(e.target.value) }
          data-testid="comparison-filter"
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual">igual a</option>
        </select>
        <label htmlFor="value-filter">Valor:</label>
        <input
          id="value-filter"
          type="number"
          value={ value }
          onChange={ (e) => setValue(e.target.value) }
          data-testid="value-filter"
        />
        <button
          onClick={ handleFilterAdd }
          data-testid="button-filter"
        >
          Filter

        </button>
      </div>
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
          {filterUnion.length > 0
            ? filterUnion?.map((planet) => (
              <tr key={ planet.name }>
                {Object.values(planet).map((valor) => (
                  <td key={ valor }>{ valor }</td>
                ))}
              </tr>
            ))
            : filteredByName?.map((planet) => (
              <tr key={ planet.name }>
                {Object.values(planet).map((valor) => (
                  <td key={ valor }>{ valor }</td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>

    </div>

  );
}

export default Table;
