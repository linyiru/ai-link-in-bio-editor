// Common icons for links - using Lucide icon names
export const COMMON_LINK_ICONS = [
  { name: 'Link', label: 'Website' },
  { name: 'Youtube', label: 'YouTube' },
  { name: 'Instagram', label: 'Instagram' },
  { name: 'Twitter', label: 'Twitter/X' },
  { name: 'Facebook', label: 'Facebook' },
  { name: 'Linkedin', label: 'LinkedIn' },
  { name: 'Github', label: 'GitHub' },
  { name: 'Mail', label: 'Email' },
  { name: 'MessageCircle', label: 'Chat' },
  { name: 'Phone', label: 'Phone' },
  { name: 'MapPin', label: 'Location' },
  { name: 'Calendar', label: 'Calendar' },
  { name: 'Music', label: 'Music' },
  { name: 'Camera', label: 'Photography' },
  { name: 'ShoppingBag', label: 'Shop' },
  { name: 'Heart', label: 'Favorite' },
  { name: 'Star', label: 'Featured' },
  { name: 'BookOpen', label: 'Blog' },
  { name: 'Video', label: 'Video' },
  { name: 'Headphones', label: 'Podcast' },
  { name: 'Briefcase', label: 'Portfolio' },
  { name: 'Globe', label: 'Website' },
  { name: 'Zap', label: 'Featured' },
  { name: 'Coffee', label: 'Support' }
] as const;

export type IconName = typeof COMMON_LINK_ICONS[number]['name'];