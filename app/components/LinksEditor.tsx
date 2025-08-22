import React, { useCallback, useEffect, useMemo, useState, forwardRef } from 'react';
import { useUserData } from '../hooks/useUserData';
import type { Link } from '../types';
import { getThemeStyles } from '../utils/themeUtils';
import { PlusIcon, PencilIcon, TrashIcon, WebsiteIcon, TwitterXIcon, GitHubIcon, LinkedInIcon, DragHandleIcon } from './icons';
import { DndContext, closestCenter, PointerSensor, KeyboardSensor, useSensor, useSensors, DragStartEvent, DragEndEvent, DragCancelEvent, DragOverlay } from '@dnd-kit/core';
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import IconPicker from './IconPicker';
import * as LucideIcons from 'lucide-react';

interface EditorProps {
  userData: ReturnType<typeof useUserData>[0];
  setUserData: ReturnType<typeof useUserData>[1];
}

const getLinkIcon = (url: string) => {
    try {
        if (!url) return <WebsiteIcon className="w-6 h-6" />;
        const domain = new URL(url).hostname.replace('www.', '');
        if (domain.includes('github.com')) return <GitHubIcon className="w-6 h-6 p-0.5" />;
        if (domain.includes('twitter.com') || domain.includes('x.com')) return <TwitterXIcon className="w-6 h-6 p-1" />;
        if (domain.includes('linkedin.com')) return <LinkedInIcon className="w-6 h-6 p-0.5" />;
        return <WebsiteIcon className="w-6 h-6" />;
    } catch (e) {
        return <WebsiteIcon className="w-6 h-6" />;
    }
}

interface LinkItemProps {
  link: Link;
  isEditing: boolean;
  themeStyles: ReturnType<typeof getThemeStyles>;
  onEdit: (id: string) => void;
  onSave: (id: string, title: string, url: string, icon?: string) => void;
  onCancel: () => void;
  onDelete: (id: string) => void;
  onToggleActive: (isActive: boolean) => void;
  style?: React.CSSProperties;
  handleAttributes?: any;
  handleListeners?: any;
  showHandle?: boolean;
}

const LinkItem = forwardRef<HTMLDivElement, LinkItemProps>(({ link, isEditing, themeStyles, onEdit, onSave, onCancel, onDelete, onToggleActive, style, handleAttributes, handleListeners, showHandle = true }, ref) => {
    const [editTitle, setEditTitle] = useState(link.title);
    const [editUrl, setEditUrl] = useState(link.url);
    const [editIcon, setEditIcon] = useState(link.icon || '');
    const [showIconPicker, setShowIconPicker] = useState(false);

    useEffect(() => {
        if (isEditing) {
            setEditTitle(link.title);
            setEditUrl(link.url);
            setEditIcon(link.icon || '');
        }
    }, [isEditing, link.title, link.url, link.icon]);

    const handleSave = () => {
        onSave(link.id, editTitle, editUrl, editIcon);
    };

    const renderIcon = (iconName: string) => {
        if (!iconName) return <LucideIcons.Link size={20} />;
        const IconComponent = (LucideIcons as any)[iconName];
        return IconComponent ? <IconComponent size={20} /> : <LucideIcons.Link size={20} />;
    };

    return (
        <div ref={ref} style={style} {...handleAttributes} className={`bg-gray-900 rounded-lg transition-all hover:bg-gray-800/50 ${isEditing ? 'border border-blue-500' : ''}`}>
            <div className={`flex items-center gap-4 ${isEditing ? 'p-4' : 'p-3'}`}>
                <button
                    {...handleListeners}
                    className={`p-1 cursor-grab text-gray-500 hover:text-white transition-colors focus:outline-none ${(!showHandle || isEditing) ? 'hidden' : ''}`}
                    aria-label="Drag to reorder"
                    title="Drag to reorder"
                >
                    <DragHandleIcon className="w-5 h-5"/>
                </button>

                {isEditing ? (
                    <div className="w-full space-y-4">
                        <input
                            type="text"
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                            className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-md text-white"
                            placeholder="Link title"
                            aria-label="Link title"
                        />
                        <input
                            type="url"
                            value={editUrl}
                            onChange={(e) => setEditUrl(e.target.value)}
                            className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-md text-white"
                            placeholder="Link URL"
                            aria-label="Link URL"
                        />
                        <div className="space-y-2">
                            <label className="text-sm text-gray-300">Icon</label>
                            <button
                                type="button"
                                onClick={() => setShowIconPicker(true)}
                                className="flex items-center gap-2 w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white hover:bg-gray-700 transition-colors"
                            >
                                <div className="text-gray-300">
                                    {renderIcon(editIcon)}
                                </div>
                                <span className="flex-1 text-left">
                                    {editIcon || 'Choose icon...'}
                                </span>
                                <LucideIcons.ChevronDown size={16} className="text-gray-400" />
                            </button>
                        </div>
                        <div className="flex justify-end gap-2">
                            <button onClick={onCancel} className="px-3 py-1.5 text-sm font-medium text-gray-300 bg-gray-700 rounded-md hover:bg-gray-600">Cancel</button>
                            <button onClick={handleSave} className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${themeStyles.buttonClass}`}>Save</button>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className={`flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full transition-colors ${themeStyles.iconWrapperClass}`}>
                            {renderIcon(link.icon || '')}
                        </div>
                        <div className="flex-grow overflow-hidden">
                            <p className="font-semibold text-white truncate">{link.title}</p>
                            <p className="text-sm text-gray-400 truncate">{link.url}</p>
                        </div>
                        <div className="flex-shrink-0 flex items-center gap-3 ml-auto">
                             <label htmlFor={`toggle-${link.id}`} className="flex items-center cursor-pointer">
                                <div className="relative">
                                    <input type="checkbox" id={`toggle-${link.id}`} className="sr-only" checked={link.isActive} onChange={(e) => onToggleActive(e.target.checked)} aria-label={`Toggle ${link.title || 'link'} active`} title={`Toggle ${link.title || 'link'} active`} />
                                    <div className={`block w-10 h-6 rounded-full transition ${link.isActive ? 'bg-blue-500' : 'bg-gray-700'}`}></div>
                                    <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${link.isActive ? 'translate-x-4' : 'translate-x-0'}`}></div>
                                </div>
                            </label>
                            <button onClick={() => onEdit(link.id)} className={`p-1 text-gray-400 transition-colors ${themeStyles.accentHoverTextClass}`} aria-label="Edit link" title="Edit link">
                                <PencilIcon className="w-5 h-5" />
                            </button>
                            <button onClick={() => onDelete(link.id)} className="p-1 text-red-500/80 hover:text-red-500 transition-colors" aria-label="Delete link" title="Delete link">
                                <TrashIcon className="w-5 h-5" />
                            </button>
                        </div>
                    </>
                )}
            </div>
            {showIconPicker && (
                <IconPicker
                    selectedIcon={editIcon}
                    onIconSelect={setEditIcon}
                    onClose={() => setShowIconPicker(false)}
                />
            )}
        </div>
    );
});
LinkItem.displayName = 'LinkItem';

interface SortableLinkItemProps extends Omit<LinkItemProps, 'onToggleActive'> {
    id: string;
    onToggleActive: (isActive: boolean) => void;
}

const SortableLinkItem: React.FC<SortableLinkItemProps> = (props) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: props.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.1 : 1,
        zIndex: isDragging ? 50 : 'auto',
    } as React.CSSProperties;

    return (
        <LinkItem
            ref={setNodeRef}
            style={style}
            handleAttributes={attributes}
            handleListeners={listeners}
            {...props}
        />
    );
};

const LinksEditor: React.FC<EditorProps> = ({ userData, setUserData }) => {
    const [newTitle, setNewTitle] = useState('');
    const [newUrl, setNewUrl] = useState('');
    const [editingLinkId, setEditingLinkId] = useState<string | null>(null);
    const { themeSettings } = userData;
    const themeStyles = useMemo(() => getThemeStyles(themeSettings), [themeSettings]);
    const [activeId, setActiveId] = useState<string | null>(null);
    
    const linkIds = useMemo(() => userData.links.map(l => l.id), [userData.links]);
    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
    );

    const handleAddLink = () => {
        if (!newTitle || !newUrl) return;
        const newLink: Link = {
            id: `${Date.now()}`,
            title: newTitle,
            url: newUrl,
            isActive: true,
            icon: 'Link', // Default icon
        };
        setUserData(prev => ({ ...prev, links: [...prev.links, newLink] }));
        setNewTitle('');
        setNewUrl('');
    };

    const handleLinkChange = useCallback(<K extends keyof Link>(id: string, field: K, value: Link[K]) => {
        setUserData(prev => ({
            ...prev,
            links: prev.links.map(link => (link.id === id ? { ...link, [field]: value } : link)),
        }));
    }, [setUserData]);

    const handleDeleteLink = useCallback((id: string) => {
        setUserData(prev => ({ ...prev, links: prev.links.filter(link => link.id !== id) }));
    }, [setUserData]);

    const handleSaveEdit = (id: string, title: string, url: string, icon?: string) => {
        handleLinkChange(id, 'title', title);
        handleLinkChange(id, 'url', url);
        if (icon !== undefined) {
            handleLinkChange(id, 'icon', icon);
        }
        setEditingLinkId(null);
    }
    
    const handleDragStart = useCallback((event: DragStartEvent) => {
        setActiveId(String(event.active.id));
    }, []);

    const handleDragCancel = useCallback((_event: DragCancelEvent) => {
        setActiveId(null);
    }, []);

    const handleDragEnd = useCallback((event: DragEndEvent) => {
        const { active, over } = event;
        if (over && active.id !== over.id) {
            setUserData((prev) => {
                const oldIndex = prev.links.findIndex(link => link.id === active.id);
                const newIndex = prev.links.findIndex(link => link.id === over.id);
                if (oldIndex === -1 || newIndex === -1) return prev;
                return { ...prev, links: arrayMove(prev.links, oldIndex, newIndex) };
            });
        }
        setActiveId(null);
    }, [setUserData]);

    return (
        <div className="space-y-6">
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Link Title</label>
                    <input
                        type="text"
                        placeholder="e.g. My Website"
                        value={newTitle}
                        onChange={e => setNewTitle(e.target.value)}
                        className="w-full px-4 py-2.5 bg-gray-900 border border-gray-700 rounded-lg text-white focus:ring-blue-500 focus:border-blue-500 transition"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">URL</label>
                    <input
                        type="url"
                        placeholder="https://example.com"
                        value={newUrl}
                        onChange={e => setNewUrl(e.target.value)}
                        className="w-full px-4 py-2.5 bg-gray-900 border border-gray-700 rounded-lg text-white focus:ring-blue-500 focus:border-blue-500 transition"
                    />
                </div>
            </div>
            <button
                onClick={handleAddLink}
                className={`w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg transition-colors ${themeStyles.buttonClass}`}
            >
                <PlusIcon className="w-5 h-5" /> Add Link
            </button>

            <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white mt-8">Your Links</h3>
                <DndContext sensors={sensors} collisionDetection={closestCenter} modifiers={[restrictToVerticalAxis]} onDragStart={handleDragStart} onDragCancel={handleDragCancel} onDragEnd={handleDragEnd}>
                    <SortableContext items={linkIds} strategy={verticalListSortingStrategy}>
                        <div className="space-y-4">
                            {userData.links.map((link) => (
                                <SortableLinkItem
                                    key={link.id}
                                    id={link.id}
                                    link={link}
                                    themeStyles={themeStyles}
                                    isEditing={editingLinkId === link.id}
                                    onEdit={() => setEditingLinkId(link.id)}
                                    onSave={handleSaveEdit}
                                    onCancel={() => setEditingLinkId(null)}
                                    onDelete={handleDeleteLink}
                                    onToggleActive={(isActive) => handleLinkChange(link.id, 'isActive', isActive)}
                                />
                            ))}
                        </div>
                    </SortableContext>
                    <DragOverlay>
                        {activeId ? (() => {
                            const activeLink = userData.links.find(l => l.id === activeId);
                            return activeLink ? (
                                <LinkItem
                                    link={activeLink}
                                    isEditing={false}
                                    themeStyles={themeStyles}
                                    onEdit={() => {}}
                                    onSave={() => {}}
                                    onCancel={() => {}}
                                    onDelete={() => {}}
                                    onToggleActive={() => {}}
                                    showHandle={false}
                                />
                            ) : null;
                        })() : null}
                    </DragOverlay>
                </DndContext>
            </div>
        </div>
    );
};

export default LinksEditor;


