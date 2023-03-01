import React from 'react';
import App from '../App';
import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import mockData from './mockData.js'; // como estamos com exṕort default, o nome é um Alias//


describe('App test', () => {
  beforeEach(async () => {
    jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve(mockData),
    }));
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('Testa se os elementos estão na tela', async () => {
    act(() => {
      render(<App />);
    });


    expect(await screen.findByTestId('name-filter')).toBeInTheDocument();
    expect(await screen.findByTestId('value-filter')).toBeInTheDocument();
    expect(await screen.findByTestId('column-filter')).toBeInTheDocument();
    expect(await screen.findByTestId('comparison-filter')).toBeInTheDocument();
    expect(await screen.findByTestId('button-filter')).toBeInTheDocument();
  })
  it('testa se vêm 10 planetas da API', async () => {
    render(<App />)

    const table = await screen.findByRole('table');
    expect(table).toBeInTheDocument();
    
    await screen.findAllByText( /rotation_period/i );
    await screen.findAllByText( /orbital_period/i );
    await screen.findAllByText( /diameter/i );
    await screen.findAllByText( /surface_water/i );
    await screen.findAllByText( /population/i );
    await screen.findAllByText( /films/i );
    await screen.findByText( /name/i );
    await screen.findByText( /climate/i );
    await screen.findByText( /gravity/i );
    await screen.findByText( /terrain/i );
    await screen.findByText( /created/i );
    await screen.findByText( /edited/i );
    await screen.findByText( /url/i );

    const allRow = await screen.findAllByRole('row');
    expect(allRow.length).toBe(11);

  })

  it('testa se o filtro de nomes é acionado com apenas uma letra', async () => {
    act(() => {
      render(<App />);
    })

    const nameFilter = await screen.findByTestId('name-filter');
    const buttonFilter = await screen.findByTestId('button-filter');
    userEvent.type(nameFilter, 'T');
    userEvent.click(buttonFilter);


    const rows = await screen.findAllByRole('row');
    expect(rows.length).toBe(3);
  })

  it('testa o filtro de números', async () => {
    act(() => {
      render(<App />);
    })

    const valueFilter = await screen.findByTestId('value-filter');
    const columnFilter = await screen.findByTestId('column-filter');
    const comparisonFilter = await screen.findByTestId('comparison-filter');
    const buttonFilter = await screen.findByTestId('button-filter');

    userEvent.type(valueFilter, '40');
    userEvent.selectOptions(columnFilter, 'surface_water');
    userEvent.selectOptions(comparisonFilter, 'menor que');
    userEvent.click(buttonFilter);

    const allRow = await screen.findAllByRole('row');
    expect(allRow.length).toBe(7);
  });


})