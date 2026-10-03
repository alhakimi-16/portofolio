/**
 * Tiny signal so the hero only animates in once the preloader has lifted.
 * Module state survives client-side navigations (e.g. switching language),
 * so the preloader never runs twice.
 */
type Listener = () => void;

let ready = false;
const listeners = new Set<Listener>();

export function markIntroReady() {
  if (ready) return;
  ready = true;
  listeners.forEach((listener) => listener());
  listeners.clear();
}

export function isIntroReady() {
  return ready;
}

export function onIntroReady(listener: Listener): () => void {
  if (ready) {
    listener();
    return () => {};
  }
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export const INTRO_SEEN_KEY = "intro-seen";
