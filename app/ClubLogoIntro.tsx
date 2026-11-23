"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";

export default function ClubLogoIntro() {
  const introRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) {
      window.requestAnimationFrame(() => setVisible(false));
    } else {
      window.requestAnimationFrame(() => setVisible(true));
    }

    const syncMotionPreference = (event: MediaQueryListEvent) => {
      if (event.matches) setVisible(false);
    };
    reduced.addEventListener("change", syncMotionPreference);
    return () => reduced.removeEventListener("change", syncMotionPreference);
  }, []);

  useEffect(() => {
    if (!visible || !introRef.current || !logoRef.current) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      document.body.style.overflow = previousOverflow;
      window.requestAnimationFrame(() => setVisible(false));
      return;
    }

    const brand = document.querySelector<HTMLElement>(".club-brand");
    const logo = logoRef.current;
    const overlay = introRef.current;

    gsap.set(logo, { scale: 0.82, opacity: 0, y: 18 });
    gsap.set(".club-intro-line", { scaleX: 0 });

    const closeIntro = () => {
      gsap.set(overlay, { pointerEvents: "none" });
      gsap.to(overlay, {
        opacity: 0,
        duration: 0.38,
        ease: "power2.inOut",
        onComplete: () => setVisible(false),
      });
    };

    const timeline = gsap.timeline({ onComplete: closeIntro });
    timelineRef.current = timeline;

    timeline
      .to(logo, { opacity: 1, scale: 1, y: 0, duration: 1.0, ease: "power3.out" })
      .to(".club-intro-line", { scaleX: 1, duration: 0.7, ease: "power2.inOut" }, "-=0.35")
      .to(".club-intro-caption", { opacity: 1, y: 0, duration: 0.55, ease: "power2.out" }, "-=0.25")
      .to({}, { duration: 0.9 })
      .call(() => {
        if (!brand) return;
        const from = logo.getBoundingClientRect();
        const to = brand.getBoundingClientRect();
        const dx = (to.left + to.width / 2) - (from.left + from.width / 2);
        const dy = (to.top + to.height / 2) - (from.top + from.height / 2);
        gsap.to(logo, { x: dx, y: dy - from.height * 0.05, scale: 0.32, duration: 0.85, ease: "power3.inOut" });
      })
      .to(".club-intro-content", { opacity: 0, duration: 0.18 }, "+=0.12");

    return () => {
      timeline.kill();
      timelineRef.current = null;
      document.body.style.overflow = previousOverflow;
    };
  }, [visible]);

  const finish = () => {
    if (timelineRef.current) {
      timelineRef.current.kill();
      timelineRef.current = null;
    }
    gsap.killTweensOf(".club-intro, .club-intro-content, .club-intro-logo, .club-intro-line, .club-intro-caption");

    if (!introRef.current) {
      setVisible(false);
      return;
    }

    gsap.set(introRef.current, { pointerEvents: "none" });
    gsap.to(introRef.current, {
      opacity: 0,
      duration: 0.28,
      ease: "power2.inOut",
      onComplete: () => setVisible(false),
    });
  };

  if (!visible) return null;

  return (
    <div className="club-intro" ref={introRef} role="dialog" aria-label="مقدمة النادي العقاري" aria-modal="true">
      <div className="club-intro-light" aria-hidden="true" />
      <div className="club-intro-content">
        <div className="club-intro-logo" ref={logoRef}>
          <Image src="/brand/realclub-logo-stacked.png" alt="النادي العقاري — The Real Estate Club" width={362} height={444} priority />
        </div>
        <div className="club-intro-line" aria-hidden="true" />
        <p className="club-intro-caption">فعاليات عقارية <span /> فرص وشراكات</p>
      </div>
      <button className="club-intro-skip" type="button" onClick={finish}>تخطي المقدمة</button>
    </div>
  );
}
