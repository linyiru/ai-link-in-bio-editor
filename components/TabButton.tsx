import React from 'react';

const TabButton: React.FC<{isActive: boolean, onClick: () => void, children: React.ReactNode}> = ({ isActive, onClick, children }) => (
    <button
        onClick={onClick}
        className={`w-full py-2.5 px-1 flex items-center justify-center gap-2 text-sm font-semibold rounded-md transition-colors ${isActive ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white'}`}
    >
        {children}
    </button>
);

export default TabButton;


