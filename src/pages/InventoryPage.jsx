import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import InventoryTable from '../components/InventoryTable';
import InventoryModal from '../components/InventoryModal';
import EmptyBox from '../assets/EmptyBox.svg';
import ButtonIcon from '../components/ButtonIcon';
import BackArrow from '../assets/BackArrow.svg';
import WhiteCheck from '../assets/WhiteCheck.svg';

const InventoryPage = ({ jobSites, inventoryData, onUpdateInventory }) => {
    const { jobSiteId } = useParams();
    const [selectedService, setSelectedService] = useState(null);
    const [editingItem, setEditingItem] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    const jobSite = jobSites.find(site => site.id === parseInt(jobSiteId));
    const inventory = inventoryData[jobSiteId] || { categories: [] };

    const services = [
        { name: 'Sidewalk Shed', color: '#1264a3' },
        { name: 'Scaffold', color: '#7ac14d' }
    ];

    const handleServiceSelect = (service) => {
        setSelectedService(service);
    };

    const handleEditItem = (item, categoryId) => {
        setEditingItem({ ...item, categoryId });
        setShowModal(true);
    };

    const handleSaveItem = (updatedItem) => {
        const updatedInventory = { ...inventory };
        const categoryIndex = updatedInventory.categories.findIndex(
            cat => cat.id === updatedItem.categoryId
        );

        if (categoryIndex >= 0) {
            const itemIndex = updatedInventory.categories[categoryIndex].items.findIndex(
                item => item.nr === updatedItem.nr
            );

            if (itemIndex >= 0) {
                updatedInventory.categories[categoryIndex].items[itemIndex] = updatedItem;
            }
        }

        onUpdateInventory(jobSiteId, updatedInventory);
        setShowModal(false);
        setEditingItem(null);
    };

    if (!jobSite) {
        return <div>Job site not found</div>;
    }

    const selectedServiceData = inventory.categories.find(
        cat => cat.name === selectedService
    );

    return (
        <div className="inventory-page">

            <div className="inventory-content">
                <div className="services-sidebar">
                    <div className="services-sidebar-title">
                        {jobSite.name}
                    </div>
                    <ul className="services-list">
                        {services.map((service) => (    
                            <li
                                key={service.name}
                                className={`service-item ${selectedService === service.name ? 'selected' : ''}`}
                                style={{
                                    backgroundColor: selectedService === service.name ? service.color : '#f8f8fa',
                                    color: selectedService === service.name ? '#fff' : '#333'
                                }}
                                onClick={() => handleServiceSelect(service.name)}
                            >
                                <span>
                                    {service.name}
                                </span>
                                {selectedService === service.name && (
                                    <img src={WhiteCheck} alt="Selected" className="service-check" />
                                )}
                            </li>
                        ))}

                    </ul>
                    <div className="flex-grow"></div>
                    <div style={{paddingBottom: '20px'}}>
                        <ButtonIcon icon={
                            <img src={BackArrow} alt="Back Arrow" />
                        } bg="#1264a3" color="#fff" onClick={() => navigate('/')}>Go Back</ButtonIcon>
                    </div>
                </div>

                <div className="data-grid">
                    {!selectedService && <div className="grid-data-title">Data Grid</div>}
                    {selectedService && <div className="grid-data-title">{selectedService}</div>}
                    {!selectedService ? (
                        <div className="no-service-selected">
                            <div className="box-icon">
                                <img src={EmptyBox}
                                    alt="Empty Box"
                                    className="box-icon-image"
                                />
                            </div>
                            <div>
                                <div className="no-data-title">No Service Selected</div>
                                <div>Please select a service on your left to proceed.</div>
                            </div>
                        </div>
                    ) : selectedServiceData ? (
                        <InventoryTable
                            category={selectedServiceData}
                            onEditItem={handleEditItem}
                        />
                    ) : (
                        <div className="no-service-selected">
                            <div className="box-icon">
                                <img src={EmptyBox}
                                    alt="Empty Box"
                                    className="box-icon-image"
                                />
                            </div>
                            <div>
                                <div className="no-data-title">No Data Available</div>
                                <div>No inventory data available for {selectedService}.</div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {showModal && editingItem && (
                <InventoryModal
                    item={editingItem}
                    onSave={handleSaveItem}
                    onClose={() => {
                        setShowModal(false);
                        setEditingItem(null);
                    }}
                />
            )}
        </div>
    );
};

export default InventoryPage; 