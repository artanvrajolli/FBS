import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import InventoryTable from '../components/InventoryTable';

vi.mock('../data/mockData', () => ({
  inventoryStatusOptions: []
}));

describe('InventoryTable Component', () => {
  const mockCategory = {
    id: 1,
    name: "Test Category",
    items: [
      {
        nr: 1,
        item: "TEST001",
        quantity: 10,
        description: "This is a test item description",
        notes: "Test notes"
      },
      {
        nr: 2,
        item: "TEST002",
        quantity: 5,
        description: "This is a very long description that should be truncated because it exceeds the maximum length limit",
        notes: "Another test note"
      }
    ]
  };

  it('renders table headers correctly', () => {
    render(<InventoryTable category={mockCategory} onEditItem={() => {}} />);
    
    expect(screen.getByText('Nr.')).toBeInTheDocument();
    expect(screen.getByText('Item')).toBeInTheDocument();
    expect(screen.getByText('Quantity')).toBeInTheDocument();
    expect(screen.getByText('Description')).toBeInTheDocument();
    expect(screen.getByText('Notes')).toBeInTheDocument();
  });

  it('renders all items from category', () => {
    render(<InventoryTable category={mockCategory} onEditItem={() => {}} />);
    
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('TEST001')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
    
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('TEST002')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('truncates long descriptions', () => {
    render(<InventoryTable category={mockCategory} onEditItem={() => {}} />);
    
    const truncatedText = screen.getByText(/This is a very long description that should be.../);
    expect(truncatedText).toBeInTheDocument();
    expect(truncatedText.textContent).toMatch(/\.\.\.$/);
  });

  it('shows full text in title attribute for truncated content', () => {
    render(<InventoryTable category={mockCategory} onEditItem={() => {}} />);
    
    const descriptionCell = screen.getByTitle("This is a very long description that should be truncated because it exceeds the maximum length limit");
    expect(descriptionCell).toBeInTheDocument();
  });

  it('calls onEditItem when row is double-clicked', async () => {
    const user = userEvent.setup();
    const mockOnEditItem = vi.fn();
    
    render(<InventoryTable category={mockCategory} onEditItem={mockOnEditItem} />);
    
    const firstRow = screen.getByText('TEST001').closest('tr');
    await user.dblClick(firstRow);
    
    expect(mockOnEditItem).toHaveBeenCalledWith(mockCategory.items[0], mockCategory.id);
  });

  it('renders help text at bottom', () => {
    render(<InventoryTable category={mockCategory} onEditItem={() => {}} />);
    
    expect(screen.getByText(/Double-click on any cell to edit the item/)).toBeInTheDocument();
    expect(screen.getByText(/Hover over description\/notes to see full text/)).toBeInTheDocument();
  });

  it('handles empty items array', () => {
    const emptyCategory = { id: 1, name: "Empty Category", items: [] };
    
    render(<InventoryTable category={emptyCategory} onEditItem={() => {}} />);
    
    expect(screen.getByText('Nr.')).toBeInTheDocument();
    
    const tbody = document.querySelector('tbody');
    expect(tbody.children).toHaveLength(0);
  });

  it('handles items with missing data gracefully', () => {
    const categoryWithIncompleteData = {
      id: 1,
      name: "Test Category",
      items: [
        { nr: 1, item: "TEST001", quantity: 10 }
      ]
    };
    
    render(<InventoryTable category={categoryWithIncompleteData} onEditItem={() => {}} />);
    
    expect(screen.getByText('TEST001')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
  });
}); 