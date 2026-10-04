/**
 * Runs in <head> before the page is painted and applies the saved light/dark choice,
 * so the page never flashes in the wrong theme.
 */
export const bootScript = `(function(){try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")document.documentElement.setAttribute("data-theme",t)}catch(e){}})()`;
