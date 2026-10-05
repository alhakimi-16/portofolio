/**
 * Runs in <head> before the page is painted:
 * • applies the saved light/dark choice,
 * • turns on scroll animations (html[data-motion]) unless the visitor prefers reduced motion.
 * If the page's JavaScript hasn't started after 4 s, the animations are switched off again
 * so no content stays hidden.
 */
export const bootScript = `(function(){var d=document.documentElement;try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")d.setAttribute("data-theme",t)}catch(e){}if(!matchMedia("(prefers-reduced-motion: reduce)").matches){d.setAttribute("data-motion","");setTimeout(function(){if(!window.__revealReady){window.__revealOff=true;d.removeAttribute("data-motion")}},4000)}})()`;
