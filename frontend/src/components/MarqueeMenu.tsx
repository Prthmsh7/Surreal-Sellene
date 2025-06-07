import { useEffect, useRef } from 'react';
import { Box } from '@chakra-ui/react';
import { Menu } from './Menu';
import './MarqueeMenu.css';

const MarqueeMenu = () => {
  const menuRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Add the js class to documentElement
    document.documentElement.className = "js";
    
    // Check for CSS variables support
    const supportsCssVars = () => {
      const e = document.createElement("style");
      e.innerHTML = "root: { --tmp-var: bold; }";
      document.head.appendChild(e);
      const result = !!(window.CSS && window.CSS.supports && window.CSS.supports("font-weight", "var(--tmp-var)"));
      e.parentNode?.removeChild(e);
      return result;
    };

    if (!supportsCssVars()) {
      alert("Please view this demo in a modern browser that supports CSS Variables.");
    }

    // Initialize menu
    if (menuRef.current) {
      new Menu(menuRef.current);
    }
  }, []);

  return (
    <Box as="main" minH="100vh" bg="var(--color-bg)">
      <Box className="menu-wrap">
        <nav className="menu" ref={menuRef}>
          <div className="menu__item">
            <a className="menu__item-link" href="#">Sillycon</a>
            <div className="marquee">
              <div className="marquee__inner-wrap">
                <div className="marquee__inner" aria-hidden="true">
                  <span>Developers</span>
                  <div className="marquee__img" style={{ backgroundImage: "url(/img/1.jpg)" }}></div>
                  <span>CS Undergrads</span>
                  <div className="marquee__img" style={{ backgroundImage: "url(/img/2.jpg)" }}></div>
                  <span>Bored Kids</span>
                  <div className="marquee__img" style={{ backgroundImage: "url(/img/3.jpg)" }}></div>
                  <span>Designers</span>
                  <div className="marquee__img" style={{ backgroundImage: "url(/img/4.jpg)" }}></div>
                  <span>Bored Engineers</span>
                  <div className="marquee__img" style={{ backgroundImage: "url(/img/1.jpg)" }}></div>
                  <span>Copy Pasters</span>
                  <div className="marquee__img" style={{ backgroundImage: "url(/img/2.jpg)" }}></div>
                  <span>Lorem Ipsum</span>
                  <div className="marquee__img" style={{ backgroundImage: "url(/img/3.jpg)" }}></div>
                  <span>Yet More Lorem Ipsum</span>
                  <div className="marquee__img" style={{ backgroundImage: "url(/img/4.jpg)" }}></div>
                </div>
              </div>
            </div>
          </div>
          <div className="menu__item">
            <a className="menu__item-link" href="#">Presentation</a>
            <div className="marquee">
              <div className="marquee__inner-wrap">
                <div className="marquee__inner" aria-hidden="true">
                  <span>Click Me</span>
                  <div className="marquee__img" style={{ backgroundImage: "url(/img/5.jpg)" }}></div>
                  <span>Click Me</span>
                  <div className="marquee__img" style={{ backgroundImage: "url(/img/6.jpg)" }}></div>
                  <span>Click Me</span>
                  <div className="marquee__img" style={{ backgroundImage: "url(/img/7.jpg)" }}></div>
                  <span>Click Me</span>
                  <div className="marquee__img" style={{ backgroundImage: "url(/img/8.jpg)" }}></div>
                  <span>Click Me</span>
                  <div className="marquee__img" style={{ backgroundImage: "url(/img/5.jpg)" }}></div>
                  <span>Click Me</span>
                  <div className="marquee__img" style={{ backgroundImage: "url(/img/6.jpg)" }}></div>
                  <span>Click Me</span>
                  <div className="marquee__img" style={{ backgroundImage: "url(/img/7.jpg)" }}></div>
                  <span>Click Me</span>
                  <div className="marquee__img" style={{ backgroundImage: "url(/img/8.jpg)" }}></div>
                </div>
              </div>
            </div>
          </div>
          <div className="menu__item">
            <a className="menu__item-link" href="#">Developers</a>
            <div className="marquee">
              <div className="marquee__inner-wrap">
                <div className="marquee__inner" aria-hidden="true">
                  <span>Prathmesh</span>
                  <div className="marquee__img" style={{ backgroundImage: "url(/img/9.jpg)" }}></div>
                  <span>Arushi</span>
                  <div className="marquee__img" style={{ backgroundImage: "url(/img/10.jpg)" }}></div>
                  <span>Prathmesh</span>
                  <div className="marquee__img" style={{ backgroundImage: "url(/img/11.jpg)" }}></div>
                  <span>Arushi</span>
                  <div className="marquee__img" style={{ backgroundImage: "url(/img/12.jpg)" }}></div>
                  <span>Prathmesh</span>
                  <div className="marquee__img" style={{ backgroundImage: "url(/img/9.jpg)" }}></div>
                  <span>Arushi</span>
                  <div className="marquee__img" style={{ backgroundImage: "url(/img/10.jpg)" }}></div>
                  <span>Prathmesh</span>
                  <div className="marquee__img" style={{ backgroundImage: "url(/img/11.jpg)" }}></div>
                  <span>Arushi</span>
                  <div className="marquee__img" style={{ backgroundImage: "url(/img/12.jpg)" }}></div>
                </div>
              </div>
            </div>
          </div>
          <div className="menu__item">
            <a className="menu__item-link" href="#">Github</a>
            <div className="marquee">
              <div className="marquee__inner-wrap">
                <div className="marquee__inner" aria-hidden="true">
                  <span>We're</span>
                  <div className="marquee__img" style={{ backgroundImage: "url(/img/13.jpg)" }}></div>
                  <span>not</span>
                  <div className="marquee__img" style={{ backgroundImage: "url(/img/14.jpg)" }}></div>
                  <span>giving</span>
                  <div className="marquee__img" style={{ backgroundImage: "url(/img/15.jpg)" }}></div>
                  <span>you</span>
                  <div className="marquee__img" style={{ backgroundImage: "url(/img/1.jpg)" }}></div>
                  <span>the</span>
                  <div className="marquee__img" style={{ backgroundImage: "url(/img/13.jpg)" }}></div>
                  <span>source</span>
                  <div className="marquee__img" style={{ backgroundImage: "url(/img/14.jpg)" }}></div>
                  <span>code</span>
                  <div className="marquee__img" style={{ backgroundImage: "url(/img/15.jpg)" }}></div>
                  <span>HeHe.</span>
                  <div className="marquee__img" style={{ backgroundImage: "url(/img/1.jpg)" }}></div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </Box>
    </Box>
  );
};

export default MarqueeMenu; 