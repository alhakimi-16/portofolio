/**
 * Inline script for <head>: applies the saved theme and intro state before anything
 * is painted (no flash of the wrong theme, no preloader on repeat visits).
 */
export const bootScript = `(function(){var d=document.documentElement;d.setAttribute("data-js","");try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")d.setAttribute("data-theme",t);if(sessionStorage.getItem("intro-seen")||matchMedia("(prefers-reduced-motion: reduce)").matches)d.setAttribute("data-intro-seen","")}catch(e){}})();`;
