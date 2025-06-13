import { useState, useEffect } from 'react';
import { X, Info, Check } from 'lucide-react';
import { statusOptions, categoriesOptions } from '../data/mockData';
import InfoIcon from '../assets/InfoIcon.svg';
import ExitIcon from '../assets/ExitIcon.svg';
import { SelectInput } from './SelectInput';
import WhiteCheck from '../assets/WhiteCheck.svg';
import ButtonIcon from './ButtonIcon';


const JobSiteModal = ({ jobSite, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    status: 'On Road',
    address: '',
    categories: []
  });

  useEffect(() => {
    if (jobSite) {
      setFormData({
        name: jobSite.name || '',
        status: jobSite.status || 'On Road',
        address: jobSite.address || ''
      });
    }
  }, [jobSite]);

  useEffect(() => {
    return () => {
      categoriesOptions.map(o => o.selected = false);
      statusOptions.map(o => o.selected = false);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name.trim()) {
      onSave({
        ...formData,
        address: formData.address || formData.name
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const optionRenderer = (option) => {
    return <div style={{
      backgroundColor: option?.selected ? option.color : 'white',
      color: option?.selected ? 'white' : 'black',
    }} className="render-option-label">
      {option.label}
      {option.selected && <img src={WhiteCheck} alt="White Check" />}
    </div>
  }

  const handleSelectCategories = (option) => {
    let targetOption = categoriesOptions.find(o => o.value === option.value);
    targetOption.selected = !targetOption.selected;
    setFormData(prev => ({
      ...prev,
      categories: categoriesOptions.filter(o => o.selected).map(o => o.value)
    }));
  }

  const handleRemoveCategory = (category) => {
    let targetOption = categoriesOptions.find(o => o.value === category);
    targetOption.selected = false;
    setFormData(prev => ({
      ...prev,
      categories: prev.categories.filter(c => c !== category)
    }));
  }

  const handleSelectedStatus = (option) => {
    statusOptions.map(o => o.selected = false);
    let targetOption = statusOptions.find(o => o.value === option.value);
    targetOption.selected = true;
    setFormData(prev => ({ ...prev, status: targetOption.value }));
  }


  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal">
        <div className="modal-header">
          <h2 className="modal-title">
            {jobSite ? 'Edit Job Site' : 'Title'}
          </h2>
          <button className="close-btn" onClick={onClose}>
            <img src={ExitIcon} alt="Exit" />
          </button>
        </div>

        <div className="modal-body">
          <span className="info-text-control-text">
            <img src={InfoIcon} alt="Info" />
            Informative piece of text that can be used regarding this modal.
          </span>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="form-input"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter job site name"
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group form-group-half">
                <label className="form-label" htmlFor="address">
                  Category Included
                </label>
                <SelectInput options={[...categoriesOptions].map(o => ({ ...o, selected: formData.categories.includes(o.value) }))} onSelect={handleSelectCategories} optionRenderer={optionRenderer} />
              </div>

              <div className="form-group form-group-half">
                <label className="form-label" htmlFor="status">
                  Status
                </label>
                <SelectInput options={statusOptions} onSelect={handleSelectedStatus} optionRenderer={optionRenderer} mode="single" />
              </div>
            </div>
            <div className="list-categories-wrapper">
              {formData.categories.map(category => (
                <span key={category} className="category-item">
                  <span className="category-item-dot" style={{ backgroundColor: categoriesOptions.find(o => o.value === category)?.color }}></span>
                  {category}
                  <span onClick={() => handleRemoveCategory(category)} className="category-item-remove"><X size={20} /></span>
                </span>
              ))}
            </div>
          </form>
        </div>

        <div className="modal-footer">
          <ButtonIcon bg="#fe4c4a" color="white" icon={<X />} text="Cancel Changes" onClick={onClose}>
            Cancel Changes
          </ButtonIcon>
          <ButtonIcon bg="#71cf48" color="white" icon={<Check />} text="Save Changes" onClick={handleSubmit} disabled={!formData.name.trim()}>
            Save Changes
          </ButtonIcon>
        </div>
      </div>
    </div>
  );
};

export default JobSiteModal; 