'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import NavBar from '../../components/NavBar';
import PageBackground from '../../components/PageBackground';

interface Card {
  id: string;
  title: string;
  text: string;
  createdAt: number;
}

export default function CardDetailPage() {
  const router = useRouter();
  const params = useParams();
  const cardId = (params?.id as string) || '';
  const isNewCard = cardId === 'new';
  
  const [titleValue, setTitleValue] = useState('');
  const [textValue, setTextValue] = useState('');
  const [originalTitle, setOriginalTitle] = useState('');
  const [originalText, setOriginalText] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isExiting, setIsExiting] = useState(false);
  const [exitType, setExitType] = useState<'click-outside' | 'save' | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    if (isNewCard) {
      setIsLoading(false);
      return;
    }
    
    try {
      const cards = JSON.parse(localStorage.getItem('cards') || '[]');
      const card = cards.find((c: Card) => c.id === cardId);
      
      if (card) {
        setTitleValue(card.title);
        setTextValue(card.text);
        setOriginalTitle(card.title);
        setOriginalText(card.text);
      }
    } catch (error) {
      console.error('Error loading card:', error);
    } finally {
      setIsLoading(false);
    }
  }, [cardId, isNewCard]);

  const handleClose = useCallback((type: 'click-outside' | 'save' = 'click-outside') => {
    if (isExiting) return;
    setIsExiting(true);
    setExitType(type);
    
    // Mark that we're returning to overview page
    if (typeof window !== 'undefined' && type === 'click-outside') {
      sessionStorage.setItem('returningFromDetail', 'true');
    }
    
    // Wait for exit animation to complete before navigating
    const animationDuration = type === 'click-outside' ? 300 : 300;
    setTimeout(() => {
      // Use replace to avoid adding to history and prevent flicker
      router.replace('/reading');
    }, animationDuration);
  }, [isExiting, router]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        handleClose();
      }
    };

    if (containerRef.current) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClose]);

  const handleSave = () => {
    if (!titleValue.trim() && !textValue.trim()) return;
    
    if (typeof window === 'undefined') return;
    
    try {
      const cards = JSON.parse(localStorage.getItem('cards') || '[]');
      
      if (isNewCard) {
        // Create new card
        const newCard: Card = {
          id: Date.now().toString(),
          title: titleValue,
          text: textValue,
          createdAt: Date.now()
        };
        const updatedCards = [newCard, ...cards];
        localStorage.setItem('cards', JSON.stringify(updatedCards));
      } else {
        // Update existing card
        const cardIndex = cards.findIndex((c: Card) => c.id === cardId);
        
        if (cardIndex !== -1) {
          cards[cardIndex] = {
            ...cards[cardIndex],
            title: titleValue,
            text: textValue
          };
          localStorage.setItem('cards', JSON.stringify(cards));
          setOriginalTitle(titleValue);
          setOriginalText(textValue);
        }
      }
    } catch (error) {
      console.error('Error saving card:', error);
    }
    
    handleClose('save');
  };

  const hasChanges = isNewCard ? true : (titleValue !== originalTitle || textValue !== originalText);
  const hasContent = titleValue.trim().length > 0 || textValue.trim().length > 0;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div 
      onClick={() => handleClose('click-outside')}
      style={{
        width: '100vw',
        minHeight: '100vh',
        background: '#000000',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        overflow: 'auto',
        padding: '20px',
        paddingTop: '100px',
        cursor: 'pointer'
      }}
    >
      <div onClick={(e) => e.stopPropagation()}>
        <NavBar />
      </div>
<PageBackground />
      
      {/* Content Container */}
      <div 
        ref={containerRef}
        onClick={(e) => e.stopPropagation()}
        className={
          isExiting 
            ? exitType === 'click-outside' 
              ? 'card-content-exit-shrink' 
              : 'card-content-exit'
            : 'card-content-enter'
        }
        style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px',
          cursor: 'default'
        }}
      >
        {/* Card - Card Background */}
        <div className="glass-card" style={{
          width: '600px',
          height: '400px',
          background: 'rgba(15, 15, 15, 1)',
          borderRadius: '48px',
          border: '1px solid rgba(247, 247, 247, 0.3)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '16px',
          opacity: 1,
          color: 'rgba(0, 0, 0, 1)',
          backdropFilter: 'blur(60px)',
          WebkitBackdropFilter: 'blur(60px)'
        }}>
          {/* Title Input */}
          <input
            type="text"
            className="custom-input"
            value={titleValue}
            onChange={(e) => setTitleValue(e.target.value)}
            style={{
              width: '540px',
              height: '70px',
              background: 'rgba(217, 217, 217, 0.3)',
              borderRadius: '24px',
              border: 'none',
              outline: 'none',
              padding: '0 20px',
              fontSize: '16px',
              color: '#FFFFFF',
              boxSizing: 'border-box',
              opacity: 0.37
            }}
            placeholder=""
          />
          
          {/* Text Textarea */}
          <textarea
            className="custom-textarea"
            value={textValue}
            onChange={(e) => setTextValue(e.target.value)}
            style={{
              width: '540px',
              height: '250px',
              background: 'rgba(217, 217, 217, 0.3)',
              borderRadius: '24px',
              border: 'none',
              outline: 'none',
              padding: '20px',
              fontSize: '16px',
              color: '#FFFFFF',
              resize: 'none',
              boxSizing: 'border-box',
              fontFamily: 'inherit',
              opacity: 0.37,
              pointerEvents: 'auto'
            }}
            placeholder=""
          />
        </div>
        
        {/* Save/Send Button */}
        {hasContent && (
          <button 
            className="send-button"
            onClick={handleSave}
            style={{
              width: '120px',
              height: '50px',
              borderRadius: '50px',
              background: '#4CAF50',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              cursor: 'pointer',
              color: '#FFFFFF',
              fontSize: '16px',
              fontWeight: '500',
              padding: '0 20px',
              alignSelf: 'flex-end'
            }}
          >
            <span>{isNewCard ? '发送' : '保存'}</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" fill="currentColor"/>
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
