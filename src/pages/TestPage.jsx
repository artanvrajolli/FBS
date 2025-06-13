import { useState } from 'react'
import { SelectInput } from '../components/SelectInput'

export const TestPage = () => {
    const [colorOptions, setColorOptions] = useState([
        { label: 'Red Option', value: 'red', color: '#ff6b6b', selected: false },
        { label: 'Blue Option', value: 'blue', color: '#4dabf7', selected: false },
        { label: 'Green Option', value: 'green', color: '#69db7c', selected: false },
        { label: 'Purple Option', value: 'purple', color: '#9775fa', selected: false },
        { label: 'Orange Option', value: 'orange', color: '#ffa726', selected: false },
    ]);

    const [statusOptions, setStatusOptions] = useState([
        { label: 'Available', value: 'available', color: '#28a745', selected: false },
        { label: 'In Use', value: 'in-use', color: '#007bff', selected: false },
        { label: 'Maintenance', value: 'maintenance', color: '#ffc107', selected: false },
        { label: 'Out of Stock', value: 'out-of-stock', color: '#dc3545', selected: false },
    ]);

    const [simpleOptions, setSimpleOptions] = useState([
        { label: 'Option Alpha', value: 'alpha', selected: false },
        { label: 'Option Beta', value: 'beta', selected: false },
        { label: 'Option Gamma', value: 'gamma', selected: false },
    ]);

    const colorOptionRenderer = (option) => {
        return (
            <div style={{
                cursor: 'pointer', 
                backgroundColor: option?.selected ? option.color : 'white',
                color: option?.selected ? 'white' : '#333',
                padding: '8px 12px',
                borderBottom: '1px solid #eee',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.2s ease'
            }}>
                <div 
                    style={{
                        width: '12px',
                        height: '12px',
                        borderRadius: '50%',
                        backgroundColor: option.color,
                        border: option?.selected ? '2px solid white' : '2px solid #ddd'
                    }}
                />
                {option.label}
                {option.selected && <span style={{ marginLeft: 'auto', fontWeight: 'bold' }}>✓</span>}
            </div>
        )
    }

    const statusOptionRenderer = (option) => {
        return (
            <div style={{
                cursor: 'pointer',
                backgroundColor: option?.selected ? option.color + '20' : 'white',
                color: option?.selected ? option.color : '#333',
                padding: '10px 12px',
                borderBottom: '1px solid #eee',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderLeft: option?.selected ? `4px solid ${option.color}` : '4px solid transparent',
                fontWeight: option?.selected ? '600' : '400'
            }}>
                {option.label}
                {option.selected && <span style={{ color: option.color, fontWeight: 'bold' }}>✓</span>}
            </div>
        )
    }

    const simpleOptionRenderer = (option) => {
        return (
            <div style={{
                cursor: 'pointer',
                backgroundColor: option?.selected ? '#f8f9fa' : 'white',
                color: option?.selected ? '#007bff' : '#333',
                padding: '8px 12px',
                borderBottom: '1px solid #eee',
                fontWeight: option?.selected ? '500' : '400'
            }}>
                {option.label} {option.selected ? '(Selected)' : ''}
            </div>
        )
    }

    const handleColorSelect = (option) => {
        const updatedOptions = colorOptions.map(opt => 
            opt.value === option.value 
                ? { ...opt, selected: !opt.selected }
                : opt
        );
        setColorOptions(updatedOptions);
    }

    const handleStatusSelect = (option) => {
        const updatedOptions = statusOptions.map(opt => 
            opt.value === option.value 
                ? { ...opt, selected: !opt.selected }
                : opt
        );
        setStatusOptions(updatedOptions);
    }

    const handleSimpleSelect = (option) => {
        const updatedOptions = simpleOptions.map(opt => 
            opt.value === option.value 
                ? { ...opt, selected: !opt.selected }
                : opt
        );
        setSimpleOptions(updatedOptions);
    }

    const resetAll = () => {
        setColorOptions(prev => prev.map(opt => ({ ...opt, selected: false })));
        setStatusOptions(prev => prev.map(opt => ({ ...opt, selected: false })));
        setSimpleOptions(prev => prev.map(opt => ({ ...opt, selected: false })));
    }

    const selectedCount = {
        colors: colorOptions.filter(opt => opt.selected).length,
        status: statusOptions.filter(opt => opt.selected).length,
        simple: simpleOptions.filter(opt => opt.selected).length
    }

    return (
        <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ marginBottom: '30px', textAlign: 'center' }}>
                <h1 style={{ color: '#333', marginBottom: '10px' }}>SelectInput Component Test Page</h1>
                <p style={{ color: '#666', fontSize: '16px' }}>
                    Testing different configurations and renderers for the SelectInput component
                </p>
                <button 
                    onClick={resetAll}
                    style={{
                        backgroundColor: '#dc3545',
                        color: 'white',
                        border: 'none',
                        padding: '10px 20px',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        marginTop: '10px'
                    }}
                >
                    Reset All Selections
                </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '30px' }}>
                <div style={{ 
                    backgroundColor: 'white', 
                    padding: '20px', 
                    borderRadius: '8px', 
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    border: '1px solid #e1e5e9'
                }}>
                    <h3 style={{ marginBottom: '15px', color: '#333' }}>
                        Color Options Test
                        <span style={{ 
                            backgroundColor: '#007bff', 
                            color: 'white', 
                            padding: '2px 8px', 
                            borderRadius: '12px', 
                            fontSize: '12px', 
                            marginLeft: '10px' 
                        }}>
                            {selectedCount.colors} selected
                        </span>
                    </h3>
                    <p style={{ marginBottom: '15px', color: '#666', fontSize: '14px' }}>
                        Multi-select with color indicators and custom styling
                    </p>
                    
                    <SelectInput
                        options={colorOptions}
                        optionRenderer={colorOptionRenderer}
                        onSelect={handleColorSelect}
                    />

                    {selectedCount.colors > 0 && (
                        <div style={{ marginTop: '15px' }}>
                            <strong>Selected:</strong>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginTop: '5px' }}>
                                {colorOptions.filter(opt => opt.selected).map(opt => (
                                    <span 
                                        key={opt.value}
                                        style={{
                                            backgroundColor: opt.color,
                                            color: 'white',
                                            padding: '4px 8px',
                                            borderRadius: '12px',
                                            fontSize: '12px'
                                        }}
                                    >
                                        {opt.label}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <div style={{ 
                    backgroundColor: 'white', 
                    padding: '20px', 
                    borderRadius: '8px', 
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    border: '1px solid #e1e5e9'
                }}>
                    <h3 style={{ marginBottom: '15px', color: '#333' }}>
                        Status Options Test
                        <span style={{ 
                            backgroundColor: '#28a745', 
                            color: 'white', 
                            padding: '2px 8px', 
                            borderRadius: '12px', 
                            fontSize: '12px', 
                            marginLeft: '10px' 
                        }}>
                            {selectedCount.status} selected
                        </span>
                    </h3>
                    <p style={{ marginBottom: '15px', color: '#666', fontSize: '14px' }}>
                        Status-based options with border indicators
                    </p>
                    
                    <SelectInput
                        options={statusOptions}
                        optionRenderer={statusOptionRenderer}
                        onSelect={handleStatusSelect}
                    />

                    {selectedCount.status > 0 && (
                        <div style={{ marginTop: '15px' }}>
                            <strong>Selected Statuses:</strong>
                            <ul style={{ margin: '5px 0', paddingLeft: '20px' }}>
                                {statusOptions.filter(opt => opt.selected).map(opt => (
                                    <li key={opt.value} style={{ color: opt.color, fontWeight: '500' }}>
                                        {opt.label}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                <div style={{ 
                    backgroundColor: 'white', 
                    padding: '20px', 
                    borderRadius: '8px', 
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    border: '1px solid #e1e5e9'
                }}>
                    <h3 style={{ marginBottom: '15px', color: '#333' }}>
                        Simple Options Test
                        <span style={{ 
                            backgroundColor: '#6c757d', 
                            color: 'white', 
                            padding: '2px 8px', 
                            borderRadius: '12px', 
                            fontSize: '12px', 
                            marginLeft: '10px' 
                        }}>
                            {selectedCount.simple} selected
                        </span>
                    </h3>
                    <p style={{ marginBottom: '15px', color: '#666', fontSize: '14px' }}>
                        Basic text options with minimal styling
                    </p>
                    
                    <SelectInput
                        options={simpleOptions}
                        optionRenderer={simpleOptionRenderer}
                        onSelect={handleSimpleSelect}
                    />

                    {selectedCount.simple > 0 && (
                        <div style={{ marginTop: '15px' }}>
                            <strong>Selected Options:</strong>
                            <div style={{ marginTop: '5px' }}>
                                {simpleOptions.filter(opt => opt.selected).map(opt => (
                                    <div key={opt.value} style={{ 
                                        padding: '2px 0', 
                                        color: '#007bff',
                                        fontSize: '14px'
                                    }}>
                                        • {opt.label}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div style={{ 
                marginTop: '30px', 
                padding: '20px', 
                backgroundColor: '#f8f9fa', 
                borderRadius: '8px',
                border: '1px solid #e1e5e9'
            }}>
                <h3 style={{ marginBottom: '15px', color: '#333' }}>Test Summary</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
                    <div>
                        <strong>Total Selections:</strong>
                        <div style={{ fontSize: '24px', color: '#007bff', fontWeight: 'bold' }}>
                            {selectedCount.colors + selectedCount.status + selectedCount.simple}
                        </div>
                    </div>
                    <div>
                        <strong>Color Options:</strong>
                        <div style={{ fontSize: '18px', color: '#ff6b6b' }}>{selectedCount.colors}/{colorOptions.length}</div>
                    </div>
                    <div>
                        <strong>Status Options:</strong>
                        <div style={{ fontSize: '18px', color: '#28a745' }}>{selectedCount.status}/{statusOptions.length}</div>
                    </div>
                    <div>
                        <strong>Simple Options:</strong>
                        <div style={{ fontSize: '18px', color: '#6c757d' }}>{selectedCount.simple}/{simpleOptions.length}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
