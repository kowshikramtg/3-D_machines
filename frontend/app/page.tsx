'use client';

import Link from "next/link";
import styles from "./landing.module.css";
import Script from "next/script";
import Landing3D from "./Landing3D";
import { useEffect, useRef } from "react";

export default function LandingPage() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Dynamic Mouse Glow Interactivity
    const handleMouseMove = (e: MouseEvent) => {
      if (glowRef.current) {
        // Offset by half of glow width/height (200px)
        glowRef.current.style.left = `${e.clientX}px`;
        glowRef.current.style.top = `${e.clientY}px`;
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      <Script src="https://unpkg.com/@phosphor-icons/web" strategy="beforeInteractive" />
      
      {/* Dynamic Cursor Glow */}
      <div ref={glowRef} className={styles.mouseGlow} />

      <div className={styles.pageContainer}>
        {/* Unique Background Grid */}
        <div className={styles.perspectiveGrid} />

        {/* Continuous Active Data Streams */}
        <div className={styles.dataLayer}>
          {[...Array(20)].map((_, i) => (
            <div 
              key={i} 
              className={styles.dataLine} 
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${2 + Math.random() * 4}s`
              }} 
            />
          ))}
        </div>

        <div className={styles.contentWrapper}>
          
          {/* Two-Column Hero with 3D Element */}
          <div className={styles.heroSection}>
            <div className={styles.heroTextContent}>

              <h1 className={styles.heroTitle}>
                Industrial AI, <br /> <span>Elegantly Scaled.</span>
              </h1>

              <p className={styles.heroSubtitle}>
                Transform your fleet monitoring with zero-latency digital twins, 
                supercharged analytics, and high-precision predictive maintenance algorithms.
              </p>

              <div className={styles.ctaWrapper}>
                <Link href="/dashboard" className={styles.ctaButton}>
                  EXPLORE ASSETS <i className="ph-bold ph-arrow-right"></i>
                </Link>
              </div>
            </div>

            <div className={styles.hero3DContainer}>
              {/* Massive 3D Abstract Animation */}
              <Landing3D />
            </div>
          </div>
        </div>

        {/* Seamless Infinite Marquee with fixed colors */}
        <div className={styles.marqueeContainer}>
          <div className={styles.marqueeContent}>
            <span><i className="ph-bold ph-sparkle"></i> KALMAN FILTERING</span>
            <span><i className="ph-bold ph-rocket-launch"></i> CINEMATIC SPACE WARP</span>
            <span><i className="ph-bold ph-chart-scatter"></i> PREDICTIVE MAINTENANCE</span>
            <span><i className="ph-bold ph-cube"></i> ZERO-LATENCY TWINS</span>
            <span><i className="ph-bold ph-lightning"></i> XAI PATTERN MINING</span>
            {/* Duplication for seamless scroll */}
            <span><i className="ph-bold ph-sparkle"></i> KALMAN FILTERING</span>
            <span><i className="ph-bold ph-rocket-launch"></i> CINEMATIC SPACE WARP</span>
            <span><i className="ph-bold ph-chart-scatter"></i> PREDICTIVE MAINTENANCE</span>
            <span><i className="ph-bold ph-cube"></i> ZERO-LATENCY TWINS</span>
            <span><i className="ph-bold ph-lightning"></i> XAI PATTERN MINING</span>
          </div>
        </div>

        {/* Features Grid */}
        <div className={styles.contentWrapper} style={{ paddingTop: 0 }}>
          <div className={styles.featureGrid}>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <i className="ph-bold ph-cube"></i>
              </div>
              <h3 className={styles.featureTitle}>Digital Twins</h3>
              <p className={styles.featureDesc}>
                Interact with high-fidelity, optimized GLB models of your industrial machines directly in the browser seamlessly.
              </p>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <i className="ph-bold ph-chart-line-up"></i>
              </div>
              <h3 className={styles.featureTitle}>Predictive Health</h3>
              <p className={styles.featureDesc}>
                Real-time anomaly scoring, model drift detection, and advanced Kalman filter smoothing at your fingertips.
              </p>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <i className="ph-bold ph-lightning"></i>
              </div>
              <h3 className={styles.featureTitle}>XAI Constraints</h3>
              <p className={styles.featureDesc}>
                Leverage our Maintenance Pattern Miner to immediately discover hidden correlations preventing catastrophic failure.
              </p>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}
