
import { useState } from 'react';
import { BookOpen, Smile } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface JournalEntry {
  title: string;
  content: string;
  mood?: string;
}

interface AddJournalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (entry: JournalEntry) => void;
}

const AddJournalModal = ({ isOpen, onClose, onSubmit }: AddJournalModalProps) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    mood: ''
  });

  const moodEmojis = ['💡', '😊', '🤔', '🎯', '✨', '📝', '🚀', '💭', '🔥', '⚡'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.content) return;

    const entryData: JournalEntry = {
      title: formData.title,
      content: formData.content,
      mood: formData.mood || undefined
    };

    onSubmit(entryData);
    setFormData({ title: '', content: '', mood: '' });
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
            <BookOpen className="w-5 h-5 text-purple-400" />
            Quick Journal Entry
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-medium text-gray-200">
              Title *
            </Label>
            <Input
              id="title"
              placeholder="What's on your mind?"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              className="glass-card border-white/20 text-white placeholder-gray-400"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="mood" className="text-sm font-medium text-gray-200 flex items-center gap-2">
              <Smile className="w-4 h-4" />
              Mood (optional)
            </Label>
            <div className="flex flex-wrap gap-2">
              {moodEmojis.map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => handleInputChange('mood', emoji)}
                  className={`text-2xl p-2 rounded-lg transition-all duration-200 ${
                    formData.mood === emoji 
                      ? 'bg-purple-600/30 ring-2 ring-purple-400' 
                      : 'hover:bg-white/10'
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="content" className="text-sm font-medium text-gray-200">
              Content *
            </Label>
            <Textarea
              id="content"
              placeholder="Write your thoughts, ideas, or notes here..."
              value={formData.content}
              onChange={(e) => handleInputChange('content', e.target.value)}
              className="glass-card border-white/20 text-white placeholder-gray-400 min-h-[120px]"
              rows={4}
              required
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white"
            >
              <BookOpen className="w-4 h-4 mr-2" />
              Save Entry
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

export default AddJournalModal;
