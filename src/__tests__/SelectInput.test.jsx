import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SelectInput } from '../components/SelectInput';

vi.mock('../assets/DropHead.svg', () => ({
  default: 'mocked-drop-head-svg'
}));

describe('SelectInput Component', () => {
  const mockOptions = [
    { value: 1, label: 'Option 1', color: '#ff0000' },
    { value: 2, label: 'Option 2', color: '#00ff00' },
    { value: 3, label: 'Option 3', color: '#0000ff', selected: true }
  ];

  it('renders with default "Select" label when no option is selected', () => {
    const options = [
      { value: 1, label: 'Option 1' },
      { value: 2, label: 'Option 2' }
    ];
    
    render(<SelectInput options={options} onSelect={() => {}} />);
    
    expect(screen.getByText('Select')).toBeInTheDocument();
  });

  it('shows selected option in single mode', () => {
    render(<SelectInput options={mockOptions} onSelect={() => {}} mode="single" />);
    
    expect(screen.getByText('Option 3')).toBeInTheDocument();
  });

  it('opens dropdown when clicked', async () => {
    const user = userEvent.setup();
    
    render(<SelectInput options={mockOptions} onSelect={() => {}} />);
    
    expect(screen.queryByText('Option 1')).not.toBeInTheDocument();
    
    await user.click(screen.getByText('Select'));
    
    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
  });

  it('calls onSelect when option is clicked', async () => {
    const user = userEvent.setup();
    const mockOnSelect = vi.fn();
    
    render(<SelectInput options={mockOptions} onSelect={mockOnSelect} />);
    
    await user.click(screen.getByText('Select'));
    
    await user.click(screen.getByText('Option 1'));
    
    expect(mockOnSelect).toHaveBeenCalledWith(mockOptions[0]);
  });

  it('closes dropdown when clicking outside', async () => {
    const user = userEvent.setup();
    
    render(
      <div>
        <SelectInput options={mockOptions} onSelect={() => {}} />
        <div data-testid="outside">Outside element</div>
      </div>
    );
    
    await user.click(screen.getByText('Select'));
    expect(screen.getByText('Option 1')).toBeInTheDocument();
    
    await user.click(screen.getByTestId('outside'));
    expect(screen.queryByText('Option 1')).not.toBeInTheDocument();
  });

  it('uses custom option renderer when provided', async () => {
    const user = userEvent.setup();
    const customRenderer = ({ label, value }) => (
      <div data-testid={`custom-option-${value}`}>Custom: {label}</div>
    );
    
    render(
      <SelectInput 
        options={mockOptions} 
        onSelect={() => {}} 
        optionRenderer={customRenderer}
      />
    );
    
    await user.click(screen.getByText('Select'));
    
    expect(screen.getByTestId('custom-option-1')).toBeInTheDocument();
    expect(screen.getByText('Custom: Option 1')).toBeInTheDocument();
  });

  it('applies correct CSS classes', () => {
    render(<SelectInput options={mockOptions} onSelect={() => {}} />);
    
    expect(document.querySelector('.select-wrapper')).toBeInTheDocument();
    expect(document.querySelector('.select-input-wrapper')).toBeInTheDocument();
    expect(document.querySelector('.select-input-icon')).toBeInTheDocument();
  });
}); 