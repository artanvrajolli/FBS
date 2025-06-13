import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search } from 'lucide-react';
import JobSiteModal from '../components/JobSiteModal';
import { statusOptions } from '../data/mockData';
import InfoIcon from '../assets/InfoIcon.svg';
import ButtonIcon from '../components/ButtonIcon';

const JobSitesPage = ({ jobSites, onAddJobSite, onUpdateJobSite }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [editingJobSite, setEditingJobSite] = useState(null);

    const filteredJobSites = jobSites.filter(site =>
        site.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const statusCounts = statusOptions.reduce((acc, status) => {
        acc[status.value] = jobSites.filter(site => site.status === status.value).length;
        return acc;
    }, {});

    const handleCreateJobSite = () => {
        setEditingJobSite(null);
        setShowModal(true);
    };

    const handleEditJobSite = (jobSite) => {
        setEditingJobSite(jobSite);
        setShowModal(true);
    };

    const handleSaveJobSite = (jobSiteData) => {
        if (editingJobSite) {
            onUpdateJobSite({ ...editingJobSite, ...jobSiteData });
        } else {
            onAddJobSite(jobSiteData);
        }
        setShowModal(false);
        setEditingJobSite(null);
    };

    const getStatusClassName = (status) => {
        return status.toLowerCase().replace(' ', '-');
    };

    return (
        <div className="job-sites-page">
            <div className="status-summary">
                <div className="status-card on-road">
                    {statusCounts['On Road']} On Road
                </div>
                <div className="status-card completed">
                    {statusCounts['Completed']} Completed
                </div>
                <div className="status-card on-hold">
                    {statusCounts['On Hold']} On Hold
                </div>
            </div>

            <div className="job-sites-content">

            <div className="page-header">
                Title
            </div>

            <div className="info-text-control">
                <span className="info-text-control-text">
                    <img src={InfoIcon} alt="Info" />
                    Informative piece of text that can be used regarding this modal.
                </span>
             

                <div className="input-wrapper">
                    <div className="search-input-wrapper">
                        <Search color="#EAEAEA" size={20} className="search-icon" />
                        <input
                            type="text"
                            placeholder="Search a driver..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="search-input"
                        />
                    </div>
                    <ButtonIcon icon={
                        <Plus size={20} />
                    } bg="#71cf48" color="#fff" onClick={handleCreateJobSite}>Create</ButtonIcon>
                </div>
            </div>
            

            <div className="job-sites-table">
                <div className="table-header">
                    <div className="table-header-name">Jobsite Name</div>
                    <div>Status</div>
                </div>

                {filteredJobSites.map((jobSite) => (
                    <div key={jobSite.id} className="job-site-row">
                        <div className="job-site-row-name">
                            <Link
                                to={`/inventory/${jobSite.id}`}
                                className="job-site-name"
                                onClick={(e) => {
                                    if (e.detail === 2) {
                                        e.preventDefault();
                                        handleEditJobSite(jobSite);
                                    }
                                }}
                            >
                                {jobSite.name}
                            </Link>
                        </div>
                        <div>
                            <span className={`status-badge ${getStatusClassName(jobSite.status)}`}>
                                {jobSite.status}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
            </div>

            {showModal && (
                <JobSiteModal
                    jobSite={editingJobSite}
                    onSave={handleSaveJobSite}
                    onClose={() => {
                        setShowModal(false);
                        setEditingJobSite(null);
                    }}
                />
            )}
        </div>
    );
};

export default JobSitesPage; 