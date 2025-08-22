import React, { useState } from 'react';
import { useUserData } from '../hooks/useUserData';
import type { ThemeSettings, BorderRadius, FontFamily, BackgroundPattern } from '../types';
import { DEFAULT_THEME_SETTINGS, COLOR_PALETTES, BACKGROUND_COLORS, BACKGROUND_PATTERNS, BORDER_RADIUS_OPTIONS, FONT_FAMILY_OPTIONS } from '../constants';
import { SunIcon } from './icons';

interface EditorProps {
  userData: ReturnType<typeof useUserData>[0];
  setUserData: ReturnType<typeof useUserData>[1];
}

const ThemeEditor: React.FC<EditorProps> = ({ userData, setUserData }) => {
    const { themeSettings } = userData;
    const [themeTab, setThemeTab] = useState<'colors' | 'background' | 'effects'>('colors');

    const handleThemeChange = <K extends keyof ThemeSettings>(field: K, value: ThemeSettings[K]) => {
        setUserData(prev => ({
            ...prev,
            themeSettings: { ...prev.themeSettings, [field]: value }
        }));
    };

    const resetDefaults = () => {
        setUserData(prev => ({ ...prev, themeSettings: DEFAULT_THEME_SETTINGS }));
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h3 className="text-lg font-semibold text-white">Theme Settings</h3>
                    <p className="text-sm text-gray-400">Customize the appearance of your page</p>
                </div>
                <button onClick={resetDefaults} className="px-4 py-2 text-sm font-medium bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                    Reset Defaults
                </button>
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <SunIcon className="w-6 h-6 text-gray-400" />
                    <div>
                        <h4 className="font-semibold text-white">Dark Mode</h4>
                        <p className="text-sm text-gray-500">Switch between light and dark theme</p>
                    </div>
                </div>
                <label htmlFor="dark-mode-toggle" className="flex items-center cursor-pointer" title="Toggle dark mode">
                    <div className="relative">
                        <input type="checkbox" id="dark-mode-toggle" className="sr-only" checked={themeSettings.isDarkMode} onChange={(e) => handleThemeChange('isDarkMode', e.target.checked)} aria-label="Toggle dark mode" title="Toggle dark mode" />
                        <div className="block bg-gray-700 w-12 h-7 rounded-full"></div>
                        <div className={`dot absolute left-1 top-1 bg-white w-5 h-5 rounded-full transition-transform ${themeSettings.isDarkMode ? 'translate-x-5' : ''}`}></div>
                    </div>
                </label>
            </div>

            <div className="p-1 flex space-x-1 bg-gray-900 rounded-lg">
                <button onClick={() => setThemeTab('colors')} className={`w-full py-2 text-sm font-semibold rounded-md ${themeTab === 'colors' ? 'bg-gray-800' : 'hover:bg-gray-800/50'}`}>Colors</button>
                <button onClick={() => setThemeTab('background')} className={`w-full py-2 text-sm font-semibold rounded-md ${themeTab === 'background' ? 'bg-gray-800' : 'hover:bg-gray-800/50'}`}>Background</button>
                <button onClick={() => setThemeTab('effects')} className={`w-full py-2 text-sm font-semibold rounded-md ${themeTab === 'effects' ? 'bg-gray-800' : 'hover:bg-gray-800/50'}`}>Effects</button>
            </div>

            {themeTab === 'colors' && (
                <div className="space-y-8 animate-fade-in">
                    <div>
                        <h4 className="font-semibold text-white">Color Theme</h4>
                        <div className="grid grid-cols-4 gap-4 mt-3">
                            {COLOR_PALETTES.map(palette => {
                                const currentModePalette = themeSettings.isDarkMode ? palette.dark : palette.light;
                                return (
                                    <button 
                                        key={palette.id} 
                                        onClick={() => handleThemeChange('colorPaletteId', palette.id)} 
                                        className={`text-center space-y-2 p-3 rounded-lg border-2 transition-colors focus:outline-none ${themeSettings.colorPaletteId === palette.id ? 'border-blue-500 bg-gray-900' : 'border-gray-800 bg-gray-900/50 hover:border-gray-700'}`}
                                    >
                                        <div className="w-10 h-10 mx-auto rounded-full overflow-hidden flex items-center justify-center border border-white/10">
                                            <div style={{ backgroundColor: currentModePalette.primary }} className="w-1/2 h-full"></div>
                                            <div className="w-[3px] h-full bg-gray-900"></div>
                                            <div style={{ backgroundColor: currentModePalette.secondary }} className="w-1/2 h-full"></div>
                                        </div>
                                        <p className="text-sm font-medium capitalize">{palette.name}</p>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
        
                    <div>
                        <h4 className="font-semibold text-white">Theme Preview</h4>
                        <div className="p-4 bg-gray-900 rounded-lg mt-3 space-y-4 border border-gray-800">
                            {(() => {
                                const currentPalette = COLOR_PALETTES.find(p => p.id === themeSettings.colorPaletteId) || COLOR_PALETTES[0];
                                const currentColors = themeSettings.isDarkMode ? currentPalette.dark : currentPalette.light;
                                const previewItems = [
                                    { label: 'Primary', color: currentColors.primary },
                                    { label: 'Secondary', color: currentColors.secondary },
                                    { label: 'Accent', color: currentColors.accent },
                                ];
        
                                return previewItems.map(item => (
                                    <div key={item.label} className="flex items-center gap-4">
                                        <div 
                                            style={{ backgroundColor: item.color }} 
                                            className="w-8 h-8 rounded-full border-2 border-white/10"
                                        ></div>
                                        <span className="text-sm text-gray-300">{item.label}</span>
                                    </div>
                                ));
                            })()}
                        </div>
                    </div>
                </div>
            )}

            {themeTab === 'background' && (
                <div className="space-y-6 animate-fade-in">
                    <div>
                        <h4 className="font-semibold text-white">Page Background Color</h4>
                        <p className="text-sm text-gray-500 mb-3">Choose a background color for your page</p>
                        <div className="grid grid-cols-4 gap-4">
                             {BACKGROUND_COLORS.map(color => (
                                <button key={color.id} onClick={() => handleThemeChange('backgroundColorId', color.id)} className={`w-full h-12 rounded-lg border-2 ${themeSettings.backgroundColorId === color.id ? 'border-blue-500' : 'border-gray-700 hover:border-gray-500'} ${themeSettings.isDarkMode ? color.dark : color.light}`} aria-label={`Select background color ${color.id}`} title={`Select background color ${color.id}`}></button>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h4 className="font-semibold text-white">Background Pattern</h4>
                        <div className="grid grid-cols-2 gap-4 mt-3">
                            {Object.entries(BACKGROUND_PATTERNS).map(([id, pattern]) => (
                                <button key={id} onClick={() => handleThemeChange('backgroundPattern', id as BackgroundPattern)} className={`p-3 rounded-lg border-2 text-left ${themeSettings.backgroundPattern === id ? 'border-blue-500' : 'border-gray-800 bg-gray-900 hover:border-gray-700'}`}>
                                    <div className={`h-16 rounded-md bg-gray-800 mb-2 ${pattern.class}`}></div>
                                    <h5 className="font-medium text-white">{pattern.name}</h5>
                                    <p className="text-xs text-gray-500">{pattern.description}</p>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {themeTab === 'effects' && (
                <div className="space-y-6 animate-fade-in">
                    <div className="flex justify-between items-center bg-gray-900 p-3 rounded-lg border border-gray-800">
                        <div>
                            <h4 className="font-semibold text-white">Card Shadow</h4>
                            <p className="text-sm text-gray-500">Add shadows to cards for depth</p>
                        </div>
                         <label htmlFor="shadow-toggle" className="flex items-center cursor-pointer" title="Toggle card shadow">
                            <div className="relative">
                                <input type="checkbox" id="shadow-toggle" className="sr-only" checked={themeSettings.cardShadow} onChange={(e) => handleThemeChange('cardShadow', e.target.checked)} aria-label="Toggle card shadow" title="Toggle card shadow" />
                                <div className="block bg-gray-700 w-12 h-7 rounded-full"></div>
                                <div className={`dot absolute left-1 top-1 bg-white w-5 h-5 rounded-full transition-transform ${themeSettings.cardShadow ? 'translate-x-5' : ''}`}></div>
                            </div>
                        </label>
                    </div>
                     <div>
                        <h4 className="font-semibold text-white mb-2">Border Radius</h4>
                        <div className="grid grid-cols-4 gap-2">
                             {BORDER_RADIUS_OPTIONS.map(option => (
                                <button key={option.id} onClick={() => handleThemeChange('borderRadius', option.id as BorderRadius)} className={`py-2 text-sm font-semibold rounded-md ${themeSettings.borderRadius === option.id ? 'bg-blue-600 text-white' : 'bg-gray-800 hover:bg-gray-700'}`}>
                                    {option.name}
                                </button>
                            ))}
                        </div>
                    </div>
                     <div>
                        <h4 className="font-semibold text-white mb-2">Font Family</h4>
                        <div className="space-y-3">
                            {FONT_FAMILY_OPTIONS.map(option => (
                                <button key={option.id} onClick={() => handleThemeChange('fontFamily', option.id as FontFamily)} className={`block w-full text-left p-4 rounded-lg border-2 ${themeSettings.fontFamily === option.id ? 'border-blue-500 bg-gray-900' : 'border-gray-800 bg-gray-900 hover:border-gray-700'}`}>
                                    <p className={`text-lg font-medium text-white ${option.class}`}>{option.name}</p>
                                    <p className={`text-sm text-gray-400 mt-1 ${option.class}`}>{option.previewText}</p>
                                    <p className="text-xs text-gray-500 mt-2">{option.description}</p>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ThemeEditor;


