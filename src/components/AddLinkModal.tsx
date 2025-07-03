
import { useState } from 'react';
import { X, Link as LinkIcon, Tag, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface SavedLink {
  title: string;
  url: string;
  description: string;
  tags: string[];
}

interface AddLinkModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (link: SavedLink) => void;
}

const AddLinkModal = ({ isOpen, onClose, onSubmit }: AddLinkModalProps) => {
  const [formData, setFormData] = useState({
    title: '',
    url: '',
    description: '',
    tags: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.url) return;

    const linkData: SavedLink = {
      title: formData.title,
      url: formData.url,
      description: formData.description,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0)
    };

    onSubmit(linkData);
    setFormData({ title: '', url: '', description: '', tags: '' });
    onClose();
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass-card border border-white/20 text-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold flex items-center gap-2">
            <LinkIcon className="w-5 h-5 text-blue-400" />
            Add New Link
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-medium text-gray-200">
              Title *
            </Label>
            <Input
              id="title"
              placeholder="Enter link title..."
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              className="glass-card border-white/20 text-white placeholder-gray-400"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="url" className="text-sm font-medium text-gray-200">
              URL *
            </Label>
            <Input
              id="url"
              type="url"
              placeholder="https://example.com"
              value={formData.url}
              onChange={(e) => handleInputChange('url', e.target.value)}
              className="glass-card border-white/20 text-white placeholder-gray-400"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium text-gray-200">
              Description
            </Label>
            <Textarea
              id="description"
              placeholder="Brief description of this resource..."
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              className="glass-card border-white/20 text-white placeholder-gray-400 min-h-[100px]"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tags" className="text-sm font-medium text-gray-200 flex items-center gap-2">
              <Tag className="w-4 h-4" />
              Tags
            </Label>
            <Input
              id="tags"
              placeholder="development, react, tutorial (comma-separated)"
              value={formData.tags}
              onChange={(e) => handleInputChange('tags', e.target.value)}
              className="glass-card border-white/20 text-white placeholder-gray-400"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
            >
              <LinkIcon className="w-4 h-4 mr-2" />
              Save Link
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="glass-card border-white/20 text-gray-300 hover:bg-white/5"
            >
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddLinkModal;
