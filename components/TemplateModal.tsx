import React from 'react';

const TemplateModal: React.FC<{ children: React.ReactNode, onClose: () => void }> = ({ children, onClose }) => {
    return (
        <div 
            className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 animate-fade-in" 
            onClick={onClose} 
            role="dialog" 
            aria-modal="true" 
            aria-labelledby="template-modal-title"
        >
            <div 
                className="bg-gray-950 rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col border border-gray-800"
                onClick={e => e.stopPropagation()}
            >
                <div className="sticky top-0 bg-gray-950/80 backdrop-blur-sm p-6 border-b border-gray-800 flex justify-between items-center z-10 flex-shrink-0">
                     <h2 id="template-modal-title" className="text-2xl font-bold text-white">Templates</h2>
                     <button 
                        onClick={onClose} 
                        className="p-2 text-gray-400 hover:text-white rounded-full hover:bg-gray-800 transition-colors" 
                        aria-label="Close templates dialog"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                     </button>
                </div>
                <div className="p-6 md:p-8 flex-grow overflow-y-hidden">
                    {children}
                </div>
            </div>
        </div>
    )
};

export default TemplateModal;


