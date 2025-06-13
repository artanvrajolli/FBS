import { useState, useEffect, useRef } from "react"
import DropHead from '../assets/DropHead.svg'

export const SelectInput = ({ options, onSelect, optionRenderer, mode = "multi" }) => {
    const [isOpen, setIsOpen] = useState(false);
    const wrapperRef = useRef(null);

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    function handleClickOutside(event) {
        if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    }
    optionRenderer ??= DefaultOptionRenderer;
    return (
        <div className="select-wrapper" ref={wrapperRef}>
            <div className={`select-input-wrapper ${isOpen ? 'open' : ''}`} onClick={() => setIsOpen(!isOpen)}>
                <SelectedOptionLabel options={options} mode={mode} />
                <img src={DropHead} alt="Drop Head" className={`select-input-icon ${isOpen ? 'open' : ''}`} />
            </div>
            {isOpen && (
                <div className="select-options-wrapper">
                    {options.map((option) => (
                        <div key={option.value} onClick={() => onSelect(option)}>
                            {optionRenderer(option)}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

function DefaultOptionRenderer({ label }) {
    return (
        <div className="select-option">{label}</div>
    )
}

function SelectedOptionLabel({ options, mode }) {
    const selectedOption = options.find(option => option?.selected);
    if (mode === "single" && selectedOption) {
        return (
            <span className="category-item">
                <span className="category-item-dot" style={{ backgroundColor: selectedOption?.color }}></span>
                {selectedOption?.label}
            </span>
        )
    }
    return (
        <div className="select-input-label">Select</div>
    )
}