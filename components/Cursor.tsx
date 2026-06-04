'use client';

import { useEffect, useRef } from 'react';

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const followerPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Touch / mobile devices don't need a custom cursor
    if (window.matchMedia('(hover: none)').matches) return;

    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    cursor.style.display = 'block';
    follower.style.display = 'block';

    const onMouseMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    };

    const lerp = (a: number, b: number, n: number) => a + (b - a) * n;

    let rafId: number;
    const animate = () => {
      followerPos.current.x = lerp(followerPos.current.x, pos.current.x, 0.12);
      followerPos.current.y = lerp(followerPos.current.y, pos.current.y, 0.12);
      follower.style.left = `${followerPos.current.x}px`;
      follower.style.top = `${followerPos.current.y}px`;
      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);

    const onMouseEnterLink = () => {
      cursor.style.width = '6px';
      cursor.style.height = '6px';
      follower.style.width = '60px';
      follower.style.height = '60px';
      follower.style.borderColor = 'rgba(212,175,55,0.8)';
    };

    const onMouseLeaveLink = () => {
      cursor.style.width = '12px';
      cursor.style.height = '12px';
      follower.style.width = '36px';
      follower.style.height = '36px';
      follower.style.borderColor = 'rgba(212,175,55,0.5)';
    };

    document.addEventListener('mousemove', onMouseMove);

    const links = document.querySelectorAll('a, button, [data-cursor]');
    links.forEach((el) => {
      el.addEventListener('mouseenter', onMouseEnterLink);
      el.addEventListener('mouseleave', onMouseLeaveLink);
    });

    const observer = new MutationObserver(() => {
      const links = document.querySelectorAll('a, button, [data-cursor]');
      links.forEach((el) => {
        el.removeEventListener('mouseenter', onMouseEnterLink);
        el.removeEventListener('mouseleave', onMouseLeaveLink);
        el.addEventListener('mouseenter', onMouseEnterLink);
        el.addEventListener('mouseleave', onMouseLeaveLink);
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div ref={cursorRef}  id="custom-cursor"          aria-hidden="true" style={{ display: 'none' }} />
      <div ref={followerRef} id="custom-cursor-follower" aria-hidden="true" style={{ display: 'none' }} />
    </>
  );
}
