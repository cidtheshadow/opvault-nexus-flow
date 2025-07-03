
import { useState } from 'react';
import { ExternalLink, Tag, Calendar, MoreVertical } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface SavedLink {
  id: string;
  title: string;
  url: string;
  description: string;
  tags: string[];
  createdAt: string;
}

interface LinkCardProps {
  link: SavedLink;
}

const LinkCard = ({ link }: LinkCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const openLink = () => {
    window.open(link.url, '_blank', 'noopener,noreferrer');
  };

  return (
    <Card 
      className="glass-card hover-lift cursor-pointer transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={openLink}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-white text-lg mb-2 flex items-center gap-2">
              {link.title}
              <ExternalLink 
                className={`w-4 h-4 text-blue-400 transition-all duration-200 ${
                  isHovered ? 'translate-x-1 -translate-y-1' : ''
                }`} 
              />
            </CardTitle>
            <CardDescription className="text-gray-300 text-sm">
              {link.description}
            </CardDescription>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            className="opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={(e) => {
              e.stopPropagation();
              // Handle menu actions
            }}
          >
            <MoreVertical className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="flex flex-wrap gap-2 mb-3">
          {link.tags.map((tag) => (
            <Badge 
              key={tag} 
              variant="secondary" 
              className="bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 text-xs"
            >
              <Tag className="w-3 h-3 mr-1" />
              {tag}
            </Badge>
          ))}
        </div>
        
        <div className="flex items-center justify-between text-xs text-gray-400">
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {formatDate(link.createdAt)}
          </div>
          <div className="text-blue-400 hover:text-blue-300 transition-colors">
            {new URL(link.url).hostname}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LinkCard;
