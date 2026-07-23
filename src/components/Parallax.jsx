import { useEffect, useRef } from 'react';

export default function Parallax({ children, className = '', strength = 0.05 }) {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined;
    }

    let frame;
    const update = () => {
      frame = undefined;
      const rect = node.getBoundingClientRect();
      const centerDistance = window.innerHeight / 2 - (rect.top + rect.height / 2);
      const offset = Math.max(-70, Math.min(70, centerDistance * strength));
      node.style.setProperty('--parallax-y', `${offset.toFixed(2)}px`);
    };

    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
    };
  }, [strength]);

  return (
    <div ref={ref} className={`parallax ${className}`}>
      {children}
    </div>
  );
}
