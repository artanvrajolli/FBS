import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from './test-utils';
import JobSitesPage from '../pages/JobSitesPage';

vi.mock('../components/JobSiteModal', () => ({
  default: ({ jobSite, onSave, onClose }) => (
    <div data-testid="job-site-modal">
      <button onClick={() => onSave({ name: 'New Site', status: 'On Road', address: 'Test Address' })}>
        Save
      </button>
      <button onClick={onClose}>Close</button>
      {jobSite && <div data-testid="editing-job-site">{jobSite.name}</div>}
    </div>
  )
}));

vi.mock('../data/mockData', () => ({
  statusOptions: [
    { value: 'On Road', label: 'On Road' },
    { value: 'Completed', label: 'Completed' },
    { value: 'On Hold', label: 'On Hold' },
    { value: 'In Progress', label: 'In Progress' }
  ]
}));

vi.mock('../assets/InfoIcon.svg', () => ({
  default: 'mocked-info-icon'
}));

describe('JobSitesPage Component', () => {
  const mockJobSites = [
    { id: 1, name: 'Test Site 1', status: 'On Road', address: 'Address 1' },
    { id: 2, name: 'Test Site 2', status: 'Completed', address: 'Address 2' },
    { id: 3, name: 'Another Site', status: 'On Hold', address: 'Address 3' }
  ];

  const defaultProps = {
    jobSites: mockJobSites,
    onAddJobSite: vi.fn(),
    onUpdateJobSite: vi.fn()
  };

  it('renders status summary with correct counts', () => {
    renderWithRouter(<JobSitesPage {...defaultProps} />);
    
    expect(screen.getByText('1 On Road')).toBeInTheDocument();
    expect(screen.getByText('1 Completed')).toBeInTheDocument();
    expect(screen.getByText('1 On Hold')).toBeInTheDocument();
  });

  it('renders all job sites in the table', () => {
    renderWithRouter(<JobSitesPage {...defaultProps} />);
    
    expect(screen.getByText('Test Site 1')).toBeInTheDocument();
    expect(screen.getByText('Test Site 2')).toBeInTheDocument();
    expect(screen.getByText('Another Site')).toBeInTheDocument();
  });

  it('filters job sites based on search term', async () => {
    const user = userEvent.setup();
    renderWithRouter(<JobSitesPage {...defaultProps} />);
    
    const searchInput = screen.getByPlaceholderText('Search a driver...');
    await user.type(searchInput, 'Test');
    
    expect(screen.getByText('Test Site 1')).toBeInTheDocument();
    expect(screen.getByText('Test Site 2')).toBeInTheDocument();
    expect(screen.queryByText('Another Site')).not.toBeInTheDocument();
  });

  it('opens create modal when Create button is clicked', async () => {
    const user = userEvent.setup();
    renderWithRouter(<JobSitesPage {...defaultProps} />);
    
    const createButton = screen.getByText('Create');
    await user.click(createButton);
    
    expect(screen.getByTestId('job-site-modal')).toBeInTheDocument();
  });

  it('calls onAddJobSite when creating a new job site', async () => {
    const user = userEvent.setup();
    const mockOnAddJobSite = vi.fn();
    renderWithRouter(<JobSitesPage {...defaultProps} onAddJobSite={mockOnAddJobSite} />);
    
    await user.click(screen.getByText('Create'));
    await user.click(screen.getByText('Save'));
    
    expect(mockOnAddJobSite).toHaveBeenCalledWith({
      name: 'New Site',
      status: 'On Road',
      address: 'Test Address'
    });
  });

  it('opens edit modal when job site is double-clicked', async () => {
    const user = userEvent.setup();
    renderWithRouter(<JobSitesPage {...defaultProps} />);
    
    const jobSiteLink = screen.getByText('Test Site 1');
    await user.dblClick(jobSiteLink);
    
    expect(screen.getByTestId('job-site-modal')).toBeInTheDocument();
    expect(screen.getByTestId('editing-job-site')).toHaveTextContent('Test Site 1');
  });

  it('calls onUpdateJobSite when editing an existing job site', async () => {
    const user = userEvent.setup();
    const mockOnUpdateJobSite = vi.fn();
    renderWithRouter(<JobSitesPage {...defaultProps} onUpdateJobSite={mockOnUpdateJobSite} />);
    
    await user.dblClick(screen.getByText('Test Site 1'));
    await user.click(screen.getByText('Save'));
    
    expect(mockOnUpdateJobSite).toHaveBeenCalledWith({
      ...mockJobSites[0],
      name: 'New Site',
      status: 'On Road',
      address: 'Test Address'
    });
  });

  it('closes modal when Close button is clicked', async () => {
    const user = userEvent.setup();
    renderWithRouter(<JobSitesPage {...defaultProps} />);
    
    await user.click(screen.getByText('Create'));
    expect(screen.getByTestId('job-site-modal')).toBeInTheDocument();
    
    await user.click(screen.getByText('Close'));
    expect(screen.queryByTestId('job-site-modal')).not.toBeInTheDocument();
  });

  it('renders correct status badges for job sites', () => {
    renderWithRouter(<JobSitesPage {...defaultProps} />);
    
    const statusBadges = document.querySelectorAll('.status-badge');
    expect(statusBadges).toHaveLength(3);
    
    expect(screen.getByText('On Road')).toHaveClass('status-badge', 'on-road');
    expect(screen.getByText('Completed')).toHaveClass('status-badge', 'completed');
    expect(screen.getByText('On Hold')).toHaveClass('status-badge', 'on-hold');
  });

  it('renders empty state when no job sites match search', async () => {
    const user = userEvent.setup();
    renderWithRouter(<JobSitesPage {...defaultProps} />);
    
    const searchInput = screen.getByPlaceholderText('Search a driver...');
    await user.type(searchInput, 'nonexistent');
    
    expect(screen.queryByText('Test Site 1')).not.toBeInTheDocument();
    expect(screen.queryByText('Test Site 2')).not.toBeInTheDocument();
    expect(screen.queryByText('Another Site')).not.toBeInTheDocument();
  });
}); 