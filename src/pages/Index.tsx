
import { useState } from 'react';
import { Plus, Link as LinkIcon, BookOpen, Search, Tag, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import LinkCard from '@/components/LinkCard';
import JournalCard from '@/components/JournalCard';
import AddLinkModal from '@/components/AddLinkModal';
import AddJournalModal from '@/components/AddJournalModal';

interface SavedLink {
  id: string;
  title: string;
  url: string;
  description: string;
  tags: string[];
  createdAt: string;
}

interface JournalEntry {
  id: string;
  title: string;
  content: string;
  mood?: string;
  createdAt: string;
}

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddLinkOpen, setIsAddLinkOpen] = useState(false);
  const [isAddJournalOpen, setIsAddJournalOpen] = useState(false);
  
  // Sample data for demonstration
  const [savedLinks, setSavedLinks] = useState<SavedLink[]>([
    {
      id: '1',
      title: 'React Documentation',
      url: 'https://react.dev',
      description: 'The official React documentation with guides and API reference.',
      tags: ['development', 'react', 'documentation'],
      createdAt: '2024-01-15T10:30:00Z'
    },
    {
      id: '2',
      title: 'Tailwind CSS Components',
      url: 'https://tailwindui.com',
      description: 'Beautiful UI components built with Tailwind CSS.',
      tags: ['design', 'css', 'components'],
      createdAt: '2024-01-14T15:45:00Z'
    }
  ]);

  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([
    {
      id: '1',
      title: 'Project Ideas',
      content: 'Working on OpVault has been exciting. Need to implement the AI assistant next and add better filtering options.',
      mood: '💡',
      createdAt: '2024-01-15T09:15:00Z'
    }
  ]);

  const filteredLinks = savedLinks.filter(link =>
    link.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    link.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    link.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleAddLink = (linkData: Omit<SavedLink, 'id' | 'createdAt'>) => {
    const newLink: SavedLink = {
      ...linkData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    setSavedLinks(prev => [newLink, ...prev]);
  };

  const handleAddJournal = (journalData: Omit<JournalEntry, 'id' | 'createdAt'>) => {
    const newEntry: JournalEntry = {
      ...journalData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    setJournalEntries(prev => [newEntry, ...prev]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold mb-4 gradient-text animate-fade-in">
            OpVault
          </h1>
          <p className="text-xl text-gray-300 animate-fade-in">
            Your personal productivity and resource organization hub
          </p>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-4 mb-8 justify-center">
          <Button 
            onClick={() => setIsAddLinkOpen(true)}
            className="glass-card hover-lift bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border-blue-500/30"
            size="lg"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Link
          </Button>
          <Button 
            onClick={() => setIsAddJournalOpen(true)}
            className="glass-card hover-lift bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 border-purple-500/30"
            size="lg"
          >
            <BookOpen className="w-5 h-5 mr-2" />
            Quick Journal
          </Button>
        </div>

        {/* Search */}
        <div className="mb-8 max-w-md mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Search links and notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="glass-card pl-10 text-white placeholder-gray-400 border-white/20"
            />
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="glass-card hover-lift">
            <CardHeader className="pb-3">
              <CardTitle className="text-blue-400 flex items-center gap-2">
                <LinkIcon className="w-5 h-5" />
                Saved Links
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">{savedLinks.length}</div>
              <p className="text-gray-400">Total resources</p>
            </CardContent>
          </Card>

          <Card className="glass-card hover-lift">
            <CardHeader className="pb-3">
              <CardTitle className="text-purple-400 flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Journal Entries
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">{journalEntries.length}</div>
              <p className="text-gray-400">Thoughts captured</p>
            </CardContent>
          </Card>

          <Card className="glass-card hover-lift">
            <CardHeader className="pb-3">
              <CardTitle className="text-green-400 flex items-center gap-2">
                <Tag className="w-5 h-5" />
                Tags
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">
                {Array.from(new Set(savedLinks.flatMap(link => link.tags))).length}
              </div>
              <p className="text-gray-400">Categories</p>
            </CardContent>
          </Card>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Saved Links */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
              <LinkIcon className="w-6 h-6 text-blue-400" />
              Saved Links
            </h2>
            
            {filteredLinks.length === 0 ? (
              <Card className="glass-card">
                <CardContent className="pt-6 text-center">
                  <LinkIcon className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                  <p className="text-gray-400">No links found. Add your first link to get started!</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {filteredLinks.map((link) => (
                  <LinkCard key={link.id} link={link} />
                ))}
              </div>
            )}
          </div>

          {/* Journal Entries */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-purple-400" />
              Quick Journal
            </h2>
            
            {journalEntries.length === 0 ? (
              <Card className="glass-card">
                <CardContent className="pt-6 text-center">
                  <BookOpen className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                  <p className="text-gray-400">No journal entries yet. Capture your first thought!</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {journalEntries.map((entry) => (
                  <JournalCard key={entry.id} entry={entry} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      <AddLinkModal 
        isOpen={isAddLinkOpen} 
        onClose={() => setIsAddLinkOpen(false)}
        onSubmit={handleAddLink}
      />
      <AddJournalModal 
        isOpen={isAddJournalOpen} 
        onClose={() => setIsAddJournalOpen(false)}
        onSubmit={handleAddJournal}
      />
    </div>
  );
};

export default Index;
