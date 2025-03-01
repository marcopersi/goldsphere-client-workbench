import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Checkout from '../components/features/Products/Checkout';

const mockSelectedProducts = [
  { id: '1', productname: 'Product 1', price: '100.00' },
  { id: '2', productname: 'Product 2', price: '200.00' }
];

const mockCustodians = [
  { id: 'home_delivery', custodyservicename: 'none, home delivery', fee: '20.00', paymentfrequency: 'one time' },
  { id: 'custodian_1', custodyservicename: 'Custodian 1', fee: '10.00', paymentfrequency: 'monthly' }
];

jest.mock('../hooks/useCustodyServices', () => () => [mockCustodians, jest.fn()]);
jest.mock('../hooks/useCountdown', () => () => 10);

describe('Checkout', () => {
  it('renders correctly', () => {
    render(<Checkout selectedProducts={mockSelectedProducts} onClose={jest.fn()} onConfirm={jest.fn()} />);
    expect(screen.getByText('checkout')).toBeInTheDocument();
    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('Product 2')).toBeInTheDocument();
  });

  it('handles quantity change', () => {
    render(<Checkout selectedProducts={mockSelectedProducts} onClose={jest.fn()} onConfirm={jest.fn()} />);
    const quantityInput = screen.getAllByRole('spinbutton')[0];
    fireEvent.change(quantityInput, { target: { value: '2' } });
    expect(quantityInput.value).toBe('2');
  });

  it('handles custody service change', () => {
    render(<Checkout selectedProducts={mockSelectedProducts} onClose={jest.fn()} onConfirm={jest.fn()} />);
    const custodyServiceSelect = screen.getAllByRole('combobox')[0];
    fireEvent.change(custodyServiceSelect, { target: { value: 'custodian_1' } });
    expect(custodyServiceSelect.value).toBe('custodian_1');
  });

  it('calls onClose when cancel button is clicked', () => {
    const onClose = jest.fn();
    render(<Checkout selectedProducts={mockSelectedProducts} onClose={onClose} onConfirm={jest.fn()} />);
    fireEvent.click(screen.getByText('cancel'));
    expect(onClose).toHaveBeenCalled();
  });

  it('calls onConfirm when confirm button is clicked', () => {
    const onConfirm = jest.fn();
    render(<Checkout selectedProducts={mockSelectedProducts} onClose={jest.fn()} onConfirm={onConfirm} />);
    fireEvent.click(screen.getByText('confirm'));
    expect(onConfirm).toHaveBeenCalled();
  });
});