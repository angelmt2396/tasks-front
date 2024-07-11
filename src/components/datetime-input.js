import React from 'react';

export default function DateTimeInput({ label, name, value, onChange, disabled = false, min = "" }) {
    return (
        <div className="mb-4 md:mb-0">
            <label className="block text-gray-700 mb-2">{label}</label>
            <input
                type="datetime-local"
                name={name}
                value={value}
                onChange={onChange}
                disabled={disabled}
                min={min}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
    );
}
