
import { Calendar, BookOpen } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface JournalEntry {
  id: string;
  title: string;
  content: string;
  mood?: string;
  createdAt: string;
}

interface JournalCardProps {
  entry: JournalEntry;
}

const JournalCard = ({ entry }: JournalCardProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Card className="playful-card group">
      <CardHeader className="pb-3">
        <CardTitle className="text-white text-lg flex items-center gap-2 group-hover:text-purple-300 transition-colors">
          {entry.mood && <span className="text-2xl animate-bounce">{entry.mood}</span>}
          {entry.title}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="pt-0">
        <CardDescription className="text-gray-300 mb-3 line-clamp-3 leading-relaxed">
          {entry.content}
        </CardDescription>
        
        <div className="flex items-center justify-between text-xs text-gray-400">
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {formatDate(entry.createdAt)}
          </div>
          <div className="flex items-center gap-1 text-purple-400 font-medium">
            <BookOpen className="w-3 h-3" />
            Journal
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default JournalCard;
