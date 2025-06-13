import { useState, useEffect } from 'react';
import ExitIcon from '../assets/ExitIcon.svg';
import InfoIcon from '../assets/InfoIcon.svg';
import ButtonIcon from './ButtonIcon';
import { Plus } from 'lucide-react';

const InventoryModal = ({ item, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    nr: 0,
    item: '',
    quantity: 0,
    description: '',
    notes: ''
  });

  useEffect(() => {
    if (item) {
      setFormData({
        nr: item.nr || 0,
        item: item.item || '',
        quantity: item.quantity || 0,
        description: item.description || '',
        notes: item.notes || ''
      });
    }
  }, [item]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.item.trim() && formData.item.length >= 6 && formData.item.length <= 8) {
      onSave({
        ...item,
        ...formData,
        nr: parseInt(formData.nr),
        quantity: parseInt(formData.quantity)
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

  const isItemValid = formData.item.trim().length >= 6 && formData.item.trim().length <= 8;

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal">
        <div className="modal-header">
          <div className="modal-title">
            {item ? 'Edit Inventory Item' : 'Add New Inventory Item'}
          </div>
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
            <div className="container-form-row-main">
            <div className="form-group">
              <label className="form-label" htmlFor="item">
                Item
              </label>
              <input
                type="text"
                id="item"
                name="item"
                className="form-input"
                value={formData.item}
                onChange={handleChange}
                placeholder="e.g., SP001A (6-8 characters)"
                minLength="6"
                maxLength="8"
                required
              />
              {formData.item && !isItemValid && (
                <small className="error-text">Item ID must be 6-8 characters long</small>
              )}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="quantity">
                Quantity
              </label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                className="form-input"
                value={formData.quantity}
                onChange={handleChange}
                min="0"
                required
              />
            </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="description">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                className="form-input"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter item description..."
                rows="3"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="notes">
                Notes
              </label>
              <textarea
                id="notes"
                name="notes"
                className="form-input"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Enter additional notes..."
                rows="3"
              />
            </div>
          </form>
        </div>

        <div className="modal-footer">
          <ButtonIcon bg="#71cf48" color="#fff" icon={<Plus size={20} />} onClick={handleSubmit} disabled={!isItemValid || !formData.description.trim()}>
            Save Changes
          </ButtonIcon>
        </div>
      </div>
    </div>
  );
};

export default InventoryModal; 