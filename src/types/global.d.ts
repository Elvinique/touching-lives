declare global {
  interface Window {
    /** Shared IntersectionObserver used by the Reveal component (created once). */
    __revealObserver?: IntersectionObserver | null;
  }
}

export {};
