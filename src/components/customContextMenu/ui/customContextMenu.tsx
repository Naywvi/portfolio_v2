"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Copy, ExternalLink, RotateCcw, ArrowLeft, ArrowRight, Bookmark, Share, Search, Mail, Bird, LucideIcon } from 'lucide-react';

// Types TypeScript
interface Position {
  x: number;
  y: number;
}

interface MenuItemBase {
  icon: LucideIcon;
  label: string;
  action: () => void;
  shortcut?: string;
}

interface MenuSeparator {
  separator: true;
}

type MenuItem = MenuItemBase | MenuSeparator;

interface CustomContextMenuProps {
  className?: string;
}

const CustomContextMenu: React.FC<CustomContextMenuProps> = ({ className }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [selectedText, setSelectedText] = useState<string>('');
  const menuRef = useRef<HTMLDivElement>(null);

  // Handler pour LinkedIn
  const shareOnLinkedIn = (): void => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent("Je partage ce magnifique site ! 🚀✨ Un portfolio vraiment impressionnant avec des animations et un design moderne. À découvrir absolument !");
    const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}&text=${text}`;
    window.open(linkedinUrl, '_blank', 'width=600,height=400');
  };

  // Handler pour le contact
  const scrollToContact = (): void => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.open('mailto:nagib.lakhdari.pro@gmail.com');
    }
  };

  // Handler pour le popup oiseau
  const showBirdPopup = (): void => {
    const popup = window.open('', '_blank', 'width=600,height=600,scrollbars=yes,resizable=yes');
    if (popup) {
      popup.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Mon oiseau 🐦</title>
            <meta charset="UTF-8">
            <style>
              body { 
                margin: 0; 
                padding: 20px; 
                background: linear-gradient(135deg, #8b5cf6 0%, #06b6d4 100%);
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                min-height: calc(100vh - 40px);
              }
              .container {
                background: rgba(255,255,255,0.1);
                backdrop-filter: blur(15px);
                border-radius: 20px;
                padding: 30px;
                text-align: center;
                border: 1px solid rgba(255,255,255,0.2);
                box-shadow: 0 20px 40px rgba(0,0,0,0.1);
              }
              img { 
                max-width: 100%; 
                max-height: 400px;
                height: auto; 
                border-radius: 15px; 
                box-shadow: 0 15px 35px rgba(0,0,0,0.3);
                transition: all 0.3s ease;
                object-fit: cover;
              }
              img:hover {
                transform: scale(1.05) rotate(1deg);
              }
              h2 { 
                color: white; 
                margin-bottom: 20px; 
                text-shadow: 2px 2px 8px rgba(0,0,0,0.5);
                font-size: 24px;
                font-weight: 600;
              }
              .close-btn {
                margin-top: 20px;
                background: rgba(255,255,255,0.2);
                border: 1px solid rgba(255,255,255,0.3);
                color: white;
                padding: 12px 24px;
                border-radius: 25px;
                cursor: pointer;
                font-size: 16px;
                font-weight: 500;
                transition: all 0.3s ease;
                backdrop-filter: blur(10px);
              }
              .close-btn:hover {
                background: rgba(255,255,255,0.3);
                transform: translateY(-2px);
                box-shadow: 0 10px 20px rgba(0,0,0,0.2);
              }
              .description {
                color: rgba(255,255,255,0.9);
                margin-top: 15px;
                font-size: 14px;
                line-height: 1.6;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <h2>🐦 Ma Perruche Calopsitte 🐦</h2>
              <img src="https://www.fermedebeaumont.com/31210-very_large_default/perruche-calopsitte-grise-nymphicus-hollandicus-domestica-oiseau-de-race-vente-elevage.jpg" alt="Perruche Calopsitte" onerror="this.alt='Image non disponible 🐦'" />
              <p class="description">
                Une magnifique perruche calopsitte grise !<br>
                Ces oiseaux sont connus pour leur intelligence et leur sociabilité.
              </p>
              <button class="close-btn" onclick="window.close()">Fermer</button>
            </div>
          </body>
        </html>
      `);
    }
  };

  useEffect(() => {
    const handleContextMenu = (e: MouseEvent): void => {
      // Si Shift est maintenu, laisse passer le menu natif
      if (e.shiftKey) {
        return;
      }

      e.preventDefault();

      // Récupère le texte sélectionné
      const selection = window.getSelection()?.toString() || '';
      setSelectedText(selection);

      // Position du menu avec vérification des limites
      const menuWidth = 240;
      const menuHeight = 400; // estimation

      let x = e.clientX;
      let y = e.clientY;

      // Ajuste la position si le menu dépasse
      if (x + menuWidth > window.innerWidth) {
        x = window.innerWidth - menuWidth - 10;
      }
      if (y + menuHeight > window.innerHeight) {
        y = window.innerHeight - menuHeight - 10;
      }

      setPosition({ x, y });
      setIsVisible(true);
    };

    const handleClick = (e: MouseEvent): void => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsVisible(false);
      }
    };

    const handleScroll = (): void => {
      setIsVisible(false);
    };

    const handleKeyDown = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') {
        setIsVisible(false);
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('click', handleClick);
    document.addEventListener('scroll', handleScroll, true);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('click', handleClick);
      document.removeEventListener('scroll', handleScroll, true);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const menuItems: MenuItem[] = [
    ...(selectedText ? [
      { icon: Copy, label: 'Copier', action: (): void => { void navigator.clipboard.writeText(selectedText); }, shortcut: 'Ctrl+C' },
      { icon: Search, label: 'Rechercher', action: (): void => { void window.open(`https://google.com/search?q=${encodeURIComponent(selectedText)}`, '_blank'); } },
      { separator: true as const }
    ] : []),
    { icon: ArrowLeft, label: 'Précédent', action: (): void => window.history.back(), shortcut: 'Alt+←' },
    { icon: ArrowRight, label: 'Suivant', action: (): void => window.history.forward(), shortcut: 'Alt+→' },
    { icon: RotateCcw, label: 'Actualiser', action: (): void => window.location.reload(), shortcut: 'Ctrl+R' },
    { separator: true as const },
    { icon: Mail, label: 'Me contacter', action: scrollToContact },
    { icon: Share, label: 'Partager sur LinkedIn', action: shareOnLinkedIn },
    { icon: ExternalLink, label: 'Ouvrir dans un nouvel onglet', action: (): void => { void window.open(window.location.href, '_blank'); } },
    { separator: true as const },
    { icon: Bird, label: 'Mon oiseau 🐦', action: showBirdPopup },
  ];

  const handleItemClick = (action: () => void): void => {
    try {
      action();
    } catch (error) {
      console.error('Erreur lors de l\'exécution de l\'action:', error);
    }
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Overlay transparent pour fermer le menu */}
      <div className="fixed inset-0 z-40" onClick={() => setIsVisible(false)} />

      {/* Menu contextuel */}
      <div
        ref={menuRef}
        className={`fixed z-50 min-w-[240px] max-w-[300px] bg-[#1a1a1a]/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl ${className || ''}`}
        style={{
          left: position.x,
          top: position.y,
          animation: 'fadeInScale 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards'
        }}
      >
        {/* Effet de brillance en haut */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-[1px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />

        <div className="py-2">
          {menuItems.map((item, index) => {
            if ('separator' in item && item.separator) {
              return (
                <div
                  key={`separator-${index}`}
                  className="my-1 mx-3 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"
                />
              );
            }

            const menuItem = item as MenuItemBase;
            return (
              <button
                key={`item-${index}`}
                onClick={() => handleItemClick(menuItem.action)}
                className="w-full px-4 py-2.5 flex items-center gap-3 text-white/80 hover:text-white hover:bg-gradient-to-r hover:from-purple-500/20 hover:to-blue-500/20 transition-all duration-200 group text-left rounded-lg mx-1"
                title={menuItem.label}
              >
                <menuItem.icon className="w-4 h-4 text-white/60 group-hover:text-purple-400 transition-colors duration-200 flex-shrink-0" />

                <span className="flex-1 text-sm font-medium truncate">
                  {menuItem.label}
                </span>

                {menuItem.shortcut && (
                  <span className="text-xs text-white/40 font-mono bg-white/5 px-2 py-1 rounded border border-white/10 flex-shrink-0">
                    {menuItem.shortcut}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Footer avec infos */}
        <div className="border-t border-white/10 px-4 py-2">
          <div className="text-xs text-white/40 text-center">
            Nagib Lakhdari • {new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
            <div className="mt-1 text-purple-400/60">Shift + Clic droit = Menu natif</div>
          </div>
        </div>
      </div>

      {/* Styles CSS intégrés */}
      <style jsx>{`
        @keyframes fadeInScale {
          0% {
            opacity: 0;
            transform: scale(0.95) translateY(-10px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>
    </>
  );
};

export default CustomContextMenu;