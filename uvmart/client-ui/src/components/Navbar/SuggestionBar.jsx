import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { searchItems } from './searchItems.js';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const ScoredLine = styled('div')(() => ({
  height: '1px',
  backgroundImage: 'linear-gradient(to right, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.1) 100%)',
  margin: '0 30px',
  borderRadius: '50%',
}));

function SuggestionBar() {
  const containerRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const scrollIntervalRef = useRef(null);

  const checkScrollPosition = () => {
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth);
    }
  };

  const scroll = (direction) => {
    if (containerRef.current) {
      const scrollAmount = containerRef.current.clientWidth * 0.8;
      containerRef.current.scrollBy({
        left: direction * scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const startAutoScroll = (direction) => {
    stopAutoScroll(); // Clear any existing interval
    scrollIntervalRef.current = setInterval(() => {
      if (containerRef.current) {
        containerRef.current.scrollBy({
          left: direction * 20,
          behavior: 'smooth'
        });
      }
    }, 16);
  };

  if (isHovering) { isHovering}

  const stopAutoScroll = () => {
    if (scrollIntervalRef.current) {
      clearInterval(scrollIntervalRef.current);
      scrollIntervalRef.current = null;
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScrollPosition);
      checkScrollPosition(); // Initial check
      return () => {
        container.removeEventListener('scroll', checkScrollPosition);
        stopAutoScroll();
      };
    }
  }, []);

  return (
    <div 
      className="relative overflow-hidden group"
      onMouseEnter={() => {
        setIsHovering(true);
        checkScrollPosition();
      }}
      onMouseLeave={() => {
        setIsHovering(false);
        stopAutoScroll();
      }}
    >
      {/* Navigation Arrows */}
      {showLeftArrow && (
        <div className="absolute left-0 top-0 bottom-0 flex items-center z-10 bg-gradient-to-r from-white to-transparent w-16">
          <IconButton 
            onClick={() => scroll(-1)}
            onMouseEnter={() => startAutoScroll(-1)}
            onMouseLeave={stopAutoScroll}
            className="!bg-white !bg-opacity-80 hover:!bg-opacity-100 !shadow-md"
          >
            <ChevronLeftIcon />
          </IconButton>
        </div>
      )}

      {showRightArrow && (
        <div className="absolute right-0 top-0 bottom-0 flex items-center z-10 bg-gradient-to-l from-white to-transparent w-16">
          <IconButton 
            onClick={() => scroll(1)}
            onMouseEnter={() => startAutoScroll(1)}
            onMouseLeave={stopAutoScroll}
            className="!bg-white !bg-opacity-80 hover:!bg-opacity-100 !shadow-md"
          >
            <ChevronRightIcon />
          </IconButton>
        </div>
      )}

      {/* Main scrollable container */}
      <div 
        ref={containerRef}
        className="w-full overflow-x-auto whitespace-nowrap scroll-smooth scrollbar-hide py-3 px-4"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <div className="inline-flex items-center space-x-2">
          {searchItems.map((item, index) => (
            <Link
              key={index}
              to={`/products/${item.title.toLowerCase().replace(/\s+/g, '-')}`}
              className={`
                text-sm sm:text-base px-4 py-2 rounded-full 
                transition-all duration-300 ease-in-out whitespace-nowrap
                bg-white bg-opacity-20 hover:bg-opacity-30
                border border-gray-200 border-opacity-30
                backdrop-blur-sm
                shadow-sm hover:shadow-md
                text-gray-800 hover:text-white hover:bg-black
                font-medium
                flex-shrink-0
                transform hover:translate-x-1 hover:scale-105
              `}
            >
              {item.title}
            </Link>
          ))}
        </div>
      </div>

      {/* Scored line effect below the bar */}
      <ScoredLine className="absolute bottom-0 left-0 right-0" />
    </div>
  );
}

export default SuggestionBar;