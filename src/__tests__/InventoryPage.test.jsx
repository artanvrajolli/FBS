import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { render } from './test-utils';
import InventoryPage from '../pages/InventoryPage';

vi.mock('../components/InventoryTable', () => ({
  default: ({ category, onEditItem }) => (
    <div data-testid="inventory-table">
      <div>Category: {category.name}</div>
      <button onClick={() => onEditItem({ nr: 1, item: 'TEST001' }, category.id)}>
        Edit Item
      </button>
    </div>
  )
}));

vi.mock('../components/InventoryModal', () => ({
  default: ({ item, onSave, onClose }) => (
    <div data-testid="inventory-modal">
      <div>Editing: {item.item}</div>
      <button onClick={() => onSave({ ...item, updated: true })}>Save</button>
      <button onClick={onClose}>Close</button>
    </div>
  )
}));

vi.mock('../assets/EmptyBox.svg', () => ({
  default: 'mocked-empty-box'
}));

vi.mock('../assets/BackArrow.svg', () => ({
  default: 'mocked-back-arrow'
}));

vi.mock('../assets/WhiteCheck.svg', () => ({
  default: 'mocked-white-check'
}));

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useParams: () => ({ jobSiteId: '1' })
  };
});

describe('InventoryPage Component', () => {
  const mockJobSites = [
    { id: 1, name: 'Test Job Site', status: 'On Road', address: 'Test Address' },
    { id: 2, name: 'Another Site', status: 'Completed', address: 'Another Address' }
  ];

  const mockInventoryData = {
    '1': {
      categories: [
        {
          id: 1,
          name: 'Sidewalk Shed',
          items: [
            { nr: 1, item: 'TEST001', quantity: 10, description: 'Test item', notes: 'Test notes' }
          ]
        },
        {
          id: 2,
          name: 'Scaffold',
          items: [
            { nr: 2, item: 'TEST002', quantity: 5, description: 'Scaffold item', notes: 'Scaffold notes' }
          ]
        }
      ]
    }
  };

  const defaultProps = {
    jobSites: mockJobSites,
    inventoryData: mockInventoryData,
    onUpdateInventory: vi.fn()
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders job site name in sidebar', () => {
    render(
      <MemoryRouter>
        <InventoryPage {...defaultProps} />
      </MemoryRouter>
    );
    
    expect(screen.getByText('Test Job Site')).toBeInTheDocument();
  });

  it('renders service options in sidebar', () => {
    render(
      <MemoryRouter>
        <InventoryPage {...defaultProps} />
      </MemoryRouter>
    );
    
    expect(screen.getByText('Sidewalk Shed')).toBeInTheDocument();
    expect(screen.getByText('Scaffold')).toBeInTheDocument();
  });

  it('shows "No Service Selected" state initially', () => {
    render(
      <MemoryRouter>
        <InventoryPage {...defaultProps} />
      </MemoryRouter>
    );
    
    expect(screen.getByText('No Service Selected')).toBeInTheDocument();
    expect(screen.getByText('Please select a service on your left to proceed.')).toBeInTheDocument();
  });

  it('displays inventory table when service is selected', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <InventoryPage {...defaultProps} />
      </MemoryRouter>
    );
    
    await user.click(screen.getByText('Sidewalk Shed'));
    
    expect(screen.getByTestId('inventory-table')).toBeInTheDocument();
    expect(screen.getByText('Category: Sidewalk Shed')).toBeInTheDocument();
  });

  it('highlights selected service with correct styling', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <InventoryPage {...defaultProps} />
      </MemoryRouter>
    );
    
    const sidewalkShedItem = screen.getByText('Sidewalk Shed').closest('.service-item');
    await user.click(screen.getByText('Sidewalk Shed'));
    
    expect(sidewalkShedItem).toHaveClass('selected');
    expect(sidewalkShedItem).toHaveStyle({ backgroundColor: '#1264a3', color: '#fff' });
  });

  it('opens inventory modal when edit item is triggered', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <InventoryPage {...defaultProps} />
      </MemoryRouter>
    );
    
    await user.click(screen.getByText('Sidewalk Shed'));
    await user.click(screen.getByText('Edit Item'));
    
    expect(screen.getByTestId('inventory-modal')).toBeInTheDocument();
    expect(screen.getByText('Editing: TEST001')).toBeInTheDocument();
  });

  it('calls onUpdateInventory when item is saved', async () => {
    const user = userEvent.setup();
    const mockOnUpdateInventory = vi.fn();
    render(
      <MemoryRouter>
        <InventoryPage {...defaultProps} onUpdateInventory={mockOnUpdateInventory} />
      </MemoryRouter>
    );
    
    await user.click(screen.getByText('Sidewalk Shed'));
    await user.click(screen.getByText('Edit Item'));
    await user.click(screen.getByText('Save'));
    
    expect(mockOnUpdateInventory).toHaveBeenCalledWith('1', expect.any(Object));
  });

  it('navigates back when Go Back button is clicked', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <InventoryPage {...defaultProps} />
      </MemoryRouter>
    );
    
    await user.click(screen.getByText('Go Back'));
    
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  it('handles job site not found', () => {
    render(
      <MemoryRouter>
        <InventoryPage 
          jobSites={[]} 
          inventoryData={{}} 
          onUpdateInventory={vi.fn()} 
        />
      </MemoryRouter>
    );
    
    expect(screen.getByText('Job site not found')).toBeInTheDocument();
  });

  it('shows "No Data Available" when selected service has no inventory', async () => {
    const user = userEvent.setup();
    const inventoryDataWithoutScaffold = {
      '1': {
        categories: [
          {
            id: 1,
            name: 'Sidewalk Shed',
            items: [
              { nr: 1, item: 'TEST001', quantity: 10, description: 'Test item', notes: 'Test notes' }
            ]
          }
        ]
      }
    };

    render(
      <MemoryRouter>
        <InventoryPage 
          {...defaultProps} 
          inventoryData={inventoryDataWithoutScaffold} 
        />
      </MemoryRouter>
    );
    
    await user.click(screen.getByText('Scaffold'));
    
    expect(screen.getByText('No Data Available')).toBeInTheDocument();
    expect(screen.getByText('No inventory data available for Scaffold.')).toBeInTheDocument();
  });

  it('closes modal when Close button is clicked', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <InventoryPage {...defaultProps} />
      </MemoryRouter>
    );
    
    await user.click(screen.getByText('Sidewalk Shed'));
    await user.click(screen.getByText('Edit Item'));
    
    expect(screen.getByTestId('inventory-modal')).toBeInTheDocument();
    
    await user.click(screen.getByText('Close'));
    
    expect(screen.queryByTestId('inventory-modal')).not.toBeInTheDocument();
  });
}); 