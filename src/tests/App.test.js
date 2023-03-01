import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import mockData from './mockData.js'; // como estamos com exṕort default, o nome é um Alias//


describe('App', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue(
      { json: jest.fn().mockResolvedValue(mockData) },
    );
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });
  it('testa se os elementos são renderizados de acordo.', () => {
    render(<App />)
    expect(screen.getByTestId('name-filter')).toBeInTheDocument()
  });

 
});