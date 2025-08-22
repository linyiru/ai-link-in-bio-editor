import React, { useState } from 'react';
import { COMMON_LINK_ICONS } from '../constants/icons';
import * as LucideIcons from 'lucide-react';

interface IconPickerProps {
  selectedIcon?: string;
  onIconSelect: (iconName: string) => void;
  onClose: () => void;
}

const IconPicker: React.FC<IconPickerProps> = ({ selectedIcon, onIconSelect, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredIcons = COMMON_LINK_ICONS.filter(icon =>
    icon.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
    icon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleIconSelect = (iconName: string) => {
    onIconSelect(iconName);
    onClose();
  };

  const renderIcon = (iconName: string) => {
    const IconComponent = (LucideIcons as any)[iconName];
    if (!IconComponent) return null;
    return <IconComponent size={20} />;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full max-h-[500px] overflow-hidden flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Choose an Icon</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <LucideIcons.X size={20} />
          </button>
        </div>

        <div className="mb-4">
          <div className="relative">
            <LucideIcons.Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search icons..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-4 gap-2 overflow-y-auto flex-1">
          {filteredIcons.map((icon) => (
            <button
              key={icon.name}
              onClick={() => handleIconSelect(icon.name)}
              className={`flex flex-col items-center p-3 rounded-lg border-2 transition-all hover:bg-gray-50 ${
                selectedIcon === icon.name
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              title={icon.label}
            >
              <div className="text-gray-700 mb-1">
                {renderIcon(icon.name)}
              </div>
              <span className="text-xs text-gray-500 text-center leading-tight">
                {icon.label}
              </span>
            </button>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-gray-200">
          <button
            onClick={() => handleIconSelect('')}
            className="w-full py-2 px-4 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors text-sm"
          >
            Remove Icon
          </button>
        </div>
      </div>
    </div>
  );
};

export default IconPicker;