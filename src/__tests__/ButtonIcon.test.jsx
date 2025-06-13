import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ButtonIcon from '../components/ButtonIcon';

describe('ButtonIcon Component', () => {
  it('renders with children text', () => {
    render(<ButtonIcon>Click Me</ButtonIcon>);
    
    expect(screen.getByText('Click Me')).toBeInTheDocument();
  });

  it('renders with icon', () => {
    const TestIcon = () => <span data-testid="test-icon">Icon</span>;
    render(
      <ButtonIcon icon={<TestIcon />}>
        Button Text
      </ButtonIcon>
    );
    
    expect(screen.getByTestId('test-icon')).toBeInTheDocument();
    expect(screen.getByText('Button Text')).toBeInTheDocument();
  });

  it('applies custom background color and text color', () => {
    render(
      <ButtonIcon bg="#ff0000" color="#ffffff">
        Styled Button
      </ButtonIcon>
    );
    
    const button = screen.getByText('Styled Button').closest('.btn-icon');
    expect(button).toHaveStyle({
      backgroundColor: '#ff0000',
      color: '#ffffff'
    });
  });

  it('handles click events', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    
    render(
      <ButtonIcon onClick={handleClick}>
        Clickable Button
      </ButtonIcon>
    );
    
    await user.click(screen.getByText('Clickable Button').closest('.btn-icon'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies disabled attribute', () => {
    render(
      <ButtonIcon disabled={true}>
        Disabled Button
      </ButtonIcon>
    );
    
    const button = screen.getByText('Disabled Button').closest('.btn-icon');
    expect(button).toHaveAttribute('disabled');
  });

  it('has correct CSS class structure', () => {
    render(<ButtonIcon>Test</ButtonIcon>);
    
    const button = screen.getByText('Test').closest('.btn-icon');
    expect(button).toHaveClass('btn-icon');
    
    expect(screen.getByText('Test')).toHaveClass('btn-icon-text');
    expect(button.querySelector('.btn-icon-icon')).toBeInTheDocument();
  });
}); 