'use client';

import { useEffect, useState } from 'react';
import "~/styles/cursor.css";

interface CursorPosition {
  x: number;
  y: number;
}

export function CustomCursor(): JSX.Element {
  const [cursorPos, setCursorPos] = useState<CursorPosition>({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState<boolean>(false);

  useEffect(() => {
    // Mise à jour de la position du curseur
    const updateCursorPos = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };

    // Détection des éléments cliquables
    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    // Sélecteurs d'éléments cliquables
    const clickableElements = document.querySelectorAll(
  'a, button, [role="button"], input[type="submit"], input[type="button"], .clickable, p, h1, h2, h3, h4, h5, h6, span, div[contenteditable], textarea, input[type="text"], input[type="email"], input[type="password"], .text-selectable'
);

    // Event listeners
    document.addEventListener('mousemove', updateCursorPos);
    
    clickableElements.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    // Cleanup
    return () => {
      document.removeEventListener('mousemove', updateCursorPos);
      clickableElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <div
      className={`custom-cursor ${isHovering ? 'hover' : 'normal'}`}
      style={{
        left: `${cursorPos.x}px`,
        top: `${cursorPos.y}px`,
      }}
    />
  );
};