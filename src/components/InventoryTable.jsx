import { inventoryStatusOptions } from '../data/mockData';

const InventoryTable = ({ category, onEditItem }) => {
  const handleCellDoubleClick = (item) => {
    onEditItem(item, category.id);
  };

  const truncateText = (text, maxLength = 50) => {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  return (
    <div className="inventory-table-container">
      <table className="inventory-table">
        <thead>
          <tr>
            <th>Nr.</th>
            <th>Item</th>
            <th>Quantity</th>
            <th>Description</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {category.items.map((item) => (
            <tr key={item.nr} onDoubleClick={() => handleCellDoubleClick(item)}>
              <td className="editable-cell">{item.nr}</td>
              <td className="editable-cell">{item.item}</td>
              <td className="editable-cell">{item.quantity}</td>
              <td className="editable-cell" title={item.description}>
                {truncateText(item.description)}
              </td>
              <td className="editable-cell" title={item.notes}>
                {truncateText(item.notes)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <div style={{ marginTop: '20px', fontSize: '0.9em', color: '#666' }}>
        <p>Double-click on any cell to edit the item. Hover over description/notes to see full text.</p>
      </div>
    </div>
  );
};

export default InventoryTable; 