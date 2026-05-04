'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import NavBar from '../components/NavBar';
import PageBackground from '../components/PageBackground';

interface Card {
  id: string;
  title: string;
  text: string;
  createdAt: number;
}

export default function ReadingPage() {
  const router = useRouter();
  const [cards, setCards] = useState<Card[]>([]);
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedCards = JSON.parse(localStorage.getItem('cards') || '[]');
        setCards(savedCards);
        setIsReady(true);
        // Check if we're returning from detail page
        const returningFromDetail = sessionStorage.getItem('returningFromDetail');
        if (returningFromDetail === 'true') {
          // Wait for detail page to fully disappear before animating cards
          setTimeout(() => {
            setShouldAnimate(true);
            sessionStorage.removeItem('returningFromDetail');
            // Reset animation after it completes
            setTimeout(() => setShouldAnimate(false), 500);
          }, 350); // Wait slightly longer than exit animation (300ms)
        }
      } catch (error) {
        console.error('Error loading cards:', error);
        setCards([]);
        setIsReady(true);
      }
    }
  }, []);

  const handleCardClick = (cardId: string) => {
    router.push(`/cards/${cardId}`);
  };

  const handleCreateNew = () => {
    router.push('/cards/new');
  };

  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div 
      ref={containerRef}
      style={{
        width: '100vw',
        minHeight: '100vh',
        background: '#000000',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'auto',
        padding: '20px',
        paddingTop: '100px'
      }}
    >
      <NavBar />
      <PageBackground />
      
      {/* Content Container */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        width: '100%',
        maxWidth: '1400px',
        padding: '20px',
        minHeight: '60vh'
      }}>
        {/* Create New Card Button */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '30px'
        }}>
          <button
            onClick={handleCreateNew}
            style={{
              width: '200px',
              height: '60px',
              borderRadius: '50px',
              background: '#4CAF50',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              cursor: 'pointer',
              color: '#FFFFFF',
              fontSize: '18px',
              fontWeight: '500',
              padding: '0 30px'
            }}
          >
            <span>+ 新建卡片</span>
          </button>
        </div>

        {/* Cards Grid */}
        {isReady && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '30px',
          justifyContent: 'center'
        }}>
          {cards.map((card, index) => (
            <div
              key={card.id}
              onClick={() => handleCardClick(card.id)}
              className={`glass-card ${shouldAnimate ? 'card-fade-in' : ''}`}
              style={{
                width: '100%',
                minHeight: '250px',
                background: 'rgba(15, 15, 15, 1)',
                borderRadius: '32px',
                border: '1px solid rgba(247, 247, 247, 0.3)',
                padding: '30px',
                cursor: 'pointer',
                backdropFilter: 'blur(60px)',
                WebkitBackdropFilter: 'blur(60px)',
                transition: 'transform 0.2s, box-shadow 0.2s',
                display: 'flex',
                flexDirection: 'column',
                gap: '15px',
                animationDelay: shouldAnimate ? `${index * 0.05}s` : '0s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.02)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{
                fontSize: '20px',
                fontWeight: '600',
                color: '#FFFFFF',
                opacity: 0.9,
                minHeight: '30px',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}>
                {card.title || '无标题'}
              </div>
              <div style={{
                fontSize: '14px',
                color: '#FFFFFF',
                opacity: 0.7,
                flex: 1,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 4,
                WebkitBoxOrient: 'vertical'
              }}>
                {card.text || '无内容'}
              </div>
            </div>
          ))}
        </div>
        )}

        {isReady && cards.length === 0 && (
          <div style={{
            textAlign: 'center',
            color: '#FFFFFF',
            opacity: 0.5,
            marginTop: '100px',
            fontSize: '18px'
          }}>
            还没有卡片，点击上方按钮创建第一个卡片
          </div>
        )}
        </div>
    </div>
  );
}
