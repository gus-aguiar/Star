import React, { useContext, useEffect, useState } from 'react';
import StarContext from '../context/StarContext';

function Table() {
  const arrayColumn = [
    'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water',
  ];

  const { state, search, setSearch } = useContext(StarContext);
  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [value, setValue] = useState(0);
  const [filtered, setFiltered] = useState([]);
  const [filters, setFilters] = useState([]);
  const [arrayCol, setArrayCol] = useState(arrayColumn);

  const handleFilterAdd = () => {
    const newFilter = {
      column,
      comparison,
      value,
    };
    setFilters([...filters, newFilter]);
  };

  const handleClick = () => {
    const newArray = arrayCol.filter((e) => e !== column);
    setArrayCol(newArray);
    setColumn('population');
    setComparison('maior que');
    setValue('0');
    handleFilterAdd();
  };

  const filteredByName = filtered.length > 0 ? filtered : state
    ?.results
    ?.filter((searchRepo) => searchRepo
      .name
      .toLowerCase()
      .includes(search.toLowerCase()));

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
          {arrayCol?.map((e) => (
            <option value={ e } key={ e }>{e}</option>
          ))}
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
          onClick={ handleClick }
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
      {filters.map((filter, index) => (
        <div data-testid="filter" key={ index }>
          <button
            data-testid="filter"
            onClick={ () => {
              const cloneArray = [...filters];
              cloneArray.splice(index, 1);
              setFilters(cloneArray);
              setArrayCol([...arrayCol, filter.column]);
              setFiltered([...state.results]);
            } }
          >
            𝙭
          </button>
          <span>
            {filter.column}
            {' '}
            {filter.comparison}
            {' '}
            {filter.value}
          </span>
        </div>
      ))}
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
