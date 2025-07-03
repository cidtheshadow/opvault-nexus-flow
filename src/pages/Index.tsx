
import { useState } from 'react';
import { Plus, Link as LinkIcon, BookOpen, Search, Tag, Clock, MessageCircle, Sparkles, Heart, Zap, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import LinkCard from '@/components/LinkCard';
import JournalCard from '@/components/JournalCard';
import AddLinkModal from '@/components/AddLinkModal';
import AddJournalModal from '@/components/AddJournalModal';
import ChatModal from '@/components/ChatModal';

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
  const [isChatOpen, setIsChatOpen] = useState(false);
  
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
    <div className="min-h-screen relative overflow-hidden">
      {/* Enhanced floating decorative elements */}
      <div className="absolute top-10 left-5 w-6 h-6 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full opacity-70 animate-bounce" style={{ animationDelay: '0s' }}></div>
      <div className="absolute top-32 right-12 w-4 h-4 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full opacity-60 animate-bounce" style={{ animationDelay: '1.5s' }}></div>
      <div className="absolute bottom-32 left-16 w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full opacity-50 animate-bounce" style={{ animationDelay: '2.5s' }}></div>
      <div className="absolute bottom-16 right-32 w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-65 animate-bounce" style={{ animationDelay: '0.8s' }}></div>
      <div className="absolute top-1/2 left-3 w-5 h-5 bg-gradient-to-r from-green-400 to-teal-500 rounded-full opacity-55 animate-bounce" style={{ animationDelay: '3s' }}></div>
      <div className="absolute top-20 right-1/4 w-7 h-7 bg-gradient-to-r from-indigo-400 to-purple-600 rounded-full opacity-45 animate-bounce" style={{ animationDelay: '1.8s' }}></div>
      
      {/* Geometric shapes */}
      <div className="absolute top-1/4 left-1/4 w-12 h-12 border-2 border-pink-400/30 rotate-45 animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-16 h-16 border-2 border-cyan-400/30 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-3/4 left-1/3 w-10 h-10 bg-gradient-to-r from-purple-500/20 to-pink-500/20 transform rotate-12 animate-pulse" style={{ animationDelay: '2s' }}></div>
      
      <div className="container mx-auto px-6 py-8 relative z-10">
        {/* Dynamic Header with floating elements */}
        <div className="mb-16 text-center relative">
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
            <Star className="w-8 h-8 text-yellow-400 animate-spin" style={{ animationDuration: '4s' }} />
          </div>
          
          <h1 className="text-7xl md:text-8xl font-bold mb-6 gradient-text animate-fade-in flex items-center justify-center gap-6 relative">
            <div className="relative">
              <Sparkles className="w-16 h-16 text-purple-400 animate-pulse absolute -top-4 -left-4" />
              <span className="relative z-10">OpVault</span>
            </div>
            <div className="relative">
              <Heart className="w-12 h-12 text-pink-400 animate-pulse absolute -top-2 -right-2" />
              <Zap className="w-8 h-8 text-yellow-400 animate-bounce absolute -bottom-2 -left-2" />
            </div>
          </h1>
          
          <div className="relative inline-block">
            <p className="text-2xl text-gray-300 animate-fade-in px-8 py-4 rounded-full glass-card">
              Your magical productivity and resource organization hub ✨
            </p>
          </div>
        </div>

        {/* Tilted Quick Actions Grid */}
        <div className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="transform rotate-1 hover:rotate-0 transition-transform duration-300">
              <Button 
                onClick={() => setIsAddLinkOpen(true)}
                className="fun-button text-white border-0 w-full h-20 text-lg"
                size="lg"
              >
                <Plus className="w-6 h-6 mr-3" />
                Add Link 🔗
              </Button>
            </div>
            
            <div className="transform -rotate-1 hover:rotate-0 transition-transform duration-300">
              <Button 
                onClick={() => setIsAddJournalOpen(true)}
                className="fun-button text-white border-0 w-full h-20 text-lg"
                size="lg"
              >
                <BookOpen className="w-6 h-6 mr-3" />
                Quick Journal 📝
              </Button>
            </div>
            
            <div className="transform rotate-1 hover:rotate-0 transition-transform duration-300">
              <Button 
                onClick={() => setIsChatOpen(true)}
                className="fun-button text-white border-0 w-full h-20 text-lg"
                size="lg"
              >
                <MessageCircle className="w-6 h-6 mr-3" />
                Reality Check 🤖
              </Button>
            </div>
          </div>
        </div>

        {/* Creative Search */}
        <div className="mb-12 max-w-lg mx-auto">
          <div className="relative search-magic transform hover:scale-105 transition-transform duration-300">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
            <Input
              placeholder="Search your digital treasure... ✨"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="glass-card pl-12 pr-16 text-white placeholder-gray-400 border-white/20 rounded-3xl h-16 text-lg"
            />
          </div>
        </div>

        {/* Dynamic Stats Cards with staggered layout */}
        <div className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="transform -rotate-2 hover:rotate-0 transition-all duration-300">
              <Card className="stats-card hover-lift h-full">
                <CardHeader className="pb-3">
                  <CardTitle className="text-blue-400 flex items-center gap-3 text-xl">
                    <LinkIcon className="w-7 h-7" />
                    Saved Links
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-5xl font-bold text-white mb-3">{savedLinks.length}</div>
                  <p className="text-gray-400 text-lg">Total resources 🚀</p>
                </CardContent>
              </Card>
            </div>

            <div className="transform rotate-1 hover:rotate-0 transition-all duration-300 md:mt-8">
              <Card className="stats-card hover-lift h-full">
                <CardHeader className="pb-3">
                  <CardTitle className="text-purple-400 flex items-center gap-3 text-xl">
                    <BookOpen className="w-7 h-7" />
                    Journal Entries
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-5xl font-bold text-white mb-3">{journalEntries.length}</div>
                  <p className="text-gray-400 text-lg">Thoughts captured 💭</p>
                </CardContent>
              </Card>
            </div>

            <div className="transform -rotate-1 hover:rotate-0 transition-all duration-300">
              <Card className="stats-card hover-lift h-full">
                <CardHeader className="pb-3">
                  <CardTitle className="text-green-400 flex items-center gap-3 text-xl">
                    <Tag className="w-7 h-7" />
                    Tags
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-5xl font-bold text-white mb-3">
                    {Array.from(new Set(savedLinks.flatMap(link => link.tags))).length}
                  </div>
                  <p className="text-gray-400 text-lg">Categories 🏷️</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Asymmetric Content Layout */}
        <div className="grid grid-cols-1 xl:grid-cols-5 gap-8">
          {/* Links Section - takes more space */}
          <div className="xl:col-span-3 space-y-8">
            <div className="relative">
              <h2 className="text-4xl font-bold text-white mb-6 flex items-center gap-3">
                <div className="relative">
                  <LinkIcon className="w-8 h-8 text-blue-400" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-cyan-400 rounded-full animate-ping"></div>
                </div>
                Saved Links 🌟
              </h2>
              <div className="absolute -top-2 -right-2 w-16 h-16 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full animate-pulse"></div>
            </div>
            
            {filteredLinks.length === 0 ? (
              <Card className="playful-card">
                <CardContent className="pt-8 text-center py-16">
                  <div className="relative inline-block">
                    <LinkIcon className="w-20 h-20 text-gray-500 mx-auto mb-6 animate-pulse" />
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full animate-bounce"></div>
                  </div>
                  <p className="text-gray-400 text-xl">No links found. Add your first link to get started! 🎯</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                {filteredLinks.map((link, index) => (
                  <div 
                    key={link.id} 
                    className={`transform ${index % 2 === 0 ? 'xl:translate-x-4' : 'xl:-translate-x-4'} hover:translate-x-0 transition-transform duration-300`}
                  >
                    <LinkCard link={link} />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Journal Section - sidebar style */}
          <div className="xl:col-span-2 space-y-8">
            <div className="relative">
              <h2 className="text-4xl font-bold text-white mb-6 flex items-center gap-3">
                <div className="relative">
                  <BookOpen className="w-8 h-8 text-purple-400" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-pink-400 rounded-full animate-ping"></div>
                </div>
                Quick Journal 📖
              </h2>
              <div className="absolute -top-2 -left-2 w-12 h-12 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full animate-pulse"></div>
            </div>
            
            {journalEntries.length === 0 ? (
              <Card className="playful-card">
                <CardContent className="pt-8 text-center py-16">
                  <div className="relative inline-block">
                    <BookOpen className="w-20 h-20 text-gray-500 mx-auto mb-6 animate-pulse" />
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-purple-400 rounded-full animate-bounce"></div>
                  </div>
                  <p className="text-gray-400 text-xl">No journal entries yet. Capture your first thought! 💫</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                {journalEntries.map((entry, index) => (
                  <div 
                    key={entry.id}
                    className={`transform ${index % 2 === 0 ? 'rotate-1' : '-rotate-1'} hover:rotate-0 transition-transform duration-300`}
                  >
                    <JournalCard entry={entry} />
                  </div>
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
      <ChatModal 
        isOpen={isChatOpen} 
        onClose={() => setIsChatOpen(false)}
      />
    </div>
  );
};

export default Index;
