import React, { useState } from 'react';
import type { ThemeSettings } from '../types';
import { TEMPLATE_CATEGORIES } from '../templates';
import TemplatePreview from './TemplatePreview';

const TemplatesEditor: React.FC<{ onApply: (themeSettings: ThemeSettings) => void }> = ({ onApply }) => {
    const [activeCategory, setActiveCategory] = useState(TEMPLATE_CATEGORIES[0].id);
    
    const selectedCategory = TEMPLATE_CATEGORIES.find(cat => cat.id === activeCategory);

    return (
        <div className="flex gap-8 h-[70vh]">
            <aside className="w-1/4 xl:w-1/5 pr-4 border-r border-gray-800 space-y-2 overflow-y-auto">
                <h3 className="text-base font-semibold text-white px-2 mb-4">Categories</h3>
                {TEMPLATE_CATEGORIES.map(category => (
                    <button
                        key={category.id}
                        onClick={() => setActiveCategory(category.id)}
                        className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-colors ${
                            activeCategory === category.id
                                ? 'bg-blue-600 text-white font-semibold'
                                : 'text-gray-300 hover:bg-gray-800'
                        }`}
                    >
                        {category.name}
                    </button>
                ))}
            </aside>

            <main className="w-3/4 xl:w-4/5 overflow-y-auto pl-4">
                {selectedCategory && (
                    <>
                        <h4 className="font-bold text-white text-2xl mb-2">{selectedCategory.name}</h4>
                        <p className="text-gray-400 mb-6 max-w-2xl">{selectedCategory.description}</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {selectedCategory.templates.map(template => (
                                <div key={template.id} className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden group transition-all hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/10">
                                    <TemplatePreview themeSettings={template.themeSettings} />
                                    <div className="p-4">
                                        <h4 className="font-semibold text-white text-lg">{template.name}</h4>
                                        <p className="text-sm text-gray-400 mt-1 mb-4">{template.description}</p>
                                        <button
                                            onClick={() => onApply(template.themeSettings)}
                                            className="w-full py-2.5 px-4 text-sm font-semibold rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-950"
                                        >
                                            Apply Template
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </main>
        </div>
    );
};

export default TemplatesEditor;


