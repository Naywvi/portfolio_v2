'use client';
import { useEffect, useState } from 'react';
import './cursor.css';

interface CursorPosition {
  x: number;
  y: number;
}

export function CustomCursor(): JSX.Element {
  const [cursorPos, setCursorPos] = useState<CursorPosition>({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const [isClicking, setIsClicking] = useState<boolean>(false);
  const [isPointer, setIsPointer] = useState<boolean>(false);

  useEffect(() => {
    // Mise à jour de la position du curseur
    const updateCursorPos = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };

    // Détection du clic
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    // Détection des éléments cliquables
    const handleMouseEnter = (e: Event) => {
      const target = e.target as HTMLElement;
      const computedStyle = window.getComputedStyle(target);

      setIsHovering(true);
      setIsPointer(computedStyle.cursor === 'pointer' ||
        target.tagName === 'A' ||
        target.tagName === 'BUTTON');
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
      setIsPointer(false);
    };

    // Sélecteurs d'éléments interactifs
    const interactiveElements = document.querySelectorAll(
      'a, button, [role="button"], input, textarea, select, label, ' +
      '.clickable, [onclick], [tabindex]:not([tabindex="-1"])'
    );

    // Event listeners
    document.addEventListener('mousemove', updateCursorPos);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnter as EventListener);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    // Cleanup
    return () => {
      document.removeEventListener('mousemove', updateCursorPos);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);

      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter as EventListener);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <>
      {/* Curseur principal - Flèche */}
      <svg
        className={`custom-cursor-arrow ${isClicking ? 'clicking' : ''} ${isPointer ? 'pointer' : ''}`}
        style={{
          left: `${cursorPos.x}px`,
          top: `${cursorPos.y}px`,
        }}
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Ombre portée */}
        <path
          d="M5.5 3.5L18.5 11.5L11.5 13L9 20.5L5.5 3.5Z"
          fill="rgba(0,0,0,0.3)"
          transform="translate(1, 1)"
        />
        {/* Curseur principal */}
        <path
          d="M5.5 3.5L18.5 11.5L11.5 13L9 20.5L5.5 3.5Z"
          fill="white"
          stroke="black"
          strokeWidth="0.5"
        />
        {/* Highlight */}
        <path
          d="M6.5 5.5L15.5 11.5L11 12.5L9.5 17.5L6.5 5.5Z"
          fill="rgba(255,255,255,0.4)"
        />
      </svg>

      {/* Cercle de hover - uniquement sur les éléments interactifs */}
      {isHovering && (
        <div
          className={`custom-cursor-ring ${isPointer ? 'pointer-ring' : 'text-ring'}`}
          style={{
            left: `${cursorPos.x}px`,
            top: `${cursorPos.y}px`,
          }}
        />
      )}

      {/* Traînée subtile */}
      <div
        className="custom-cursor-trail"
        style={{
          left: `${cursorPos.x}px`,
          top: `${cursorPos.y}px`,
        }}
      />
    </>
  );
}