// ==UserScript==
// @name         YouTube Music Premium Logo
// @version      1.0.1
// @description  Changes the YouTube Music logo to a premium version
// @author       barraIhsan
// @match        https://music.youtube.com/*
// @icon         https://www.google.com/s2/favicons?domain=music.youtube.com
// @updateURL    https://gist.github.com/barraIhsan/bc901bc9c3604749d48361d23a094d29/raw/ytMusicPremiumLogo.user.js
// @downloadURL  https://gist.github.com/barraIhsan/bc901bc9c3604749d48361d23a094d29/raw/ytMusicPremiumLogo.user.js
// ==/UserScript==

(function() {
    'use strict';

    // fix "TrustedError" on chrome[-ium], code snippet from zerodytrash/Simple-YouTube-Age-Restriction-Bypass@d2cbcc0
    if (window.trustedTypes && trustedTypes.createPolicy) {
        if (!trustedTypes.defaultPolicy) {
            const passThroughFn = (x) => x;
            trustedTypes.createPolicy('default', {
                createHTML: passThroughFn,
                createScriptURL: passThroughFn,
                createScript: passThroughFn,
            });
        }
    }

    // Add load event listener to only spawn MutationObserver when the web actually loaded
    window.addEventListener('load', () => {
        // Function to be called when the target element is found
        function modifyYtIcon(ytMusicLogos) {
            ytMusicLogos.forEach(ytMusicLogo => {
                ytMusicLogo.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" width="98.543" height="24" fill="none"><clipPath id="a"><path d="M0 0h77v26H0Z"/></clipPath><g clip-path="url(#a)" transform="scale(.92308)"><path fill="#f03" d="M13 26c7.176 0 13-5.824 13-13S20.176 0 13 0 0 5.824 0 13s5.824 13 13 13"/><path stroke="#fff" d="M20.5 13c0 4.144-3.356 7.5-7.5 7.5A7.5 7.5 0 0 1 5.5 13c0-4.144 3.356-7.5 7.5-7.5s7.5 3.356 7.5 7.5z"/><path fill="#fff" d="m17.75 13-7.5-4.25v8.5z"/></g><g style="display:inherit;fill:#fff;fill-opacity:1"><path d="M32.182 2.1v16.8h2.58v-5.99h.69c3.35 0 5.11-1.8 5.11-5.34v-.69c0-3.57-1.56-4.78-4.84-4.78zm5.68 5.53c0 2.37-.72 3.45-2.46 3.45h-.64V3.95h.69c1.97 0 2.41.81 2.41 3.18zM41.982 18.9h2.55v-8.81c.42-.72 1.46-1.04 2.77-.77l.16-2.99c-.17-.02-.32-.04-.46-.04-1.2 0-2.17.91-2.66 2.57h-.18l-.21-2.32h-1.97zM55.746 11.5c0-2.98-.3-5.19-3.73-5.19-3.23 0-3.95 2.15-3.95 5.31v2.17c0 3.08.66 5.32 3.87 5.32 2.54 0 3.85-1.27 3.7-3.73l-2.25-.12c-.03 1.52-.38 2.14-1.39 2.14-1.27 0-1.33-1.21-1.33-3.01v-.84h5.08zm-3.79-3.53c1.22 0 1.31 1.15 1.31 3.1v1.01h-2.6v-1.01c0-1.93.08-3.1 1.29-3.1M60.195 18.9V8.92c.38-.53 1-.85 1.6-.85.77 0 1.05.54 1.05 1.62v9.21h2.66l-.02-9.97c.37-.56 1-.89 1.62-.89.67 0 1.04.57 1.04 1.65v9.21h2.66V9.49c0-2.21-.79-3.22-2.46-3.22-1.16 0-2.15.42-3.06 1.4-.38-.91-1.13-1.4-2.2-1.4-1.21 0-2.35.52-3.15 1.49h-.15l-.19-1.22h-2.05V18.9ZM74.086 4.97c.9 0 1.32-.3 1.32-1.54 0-1.16-.45-1.52-1.32-1.52-.88 0-1.31.32-1.31 1.52 0 1.24.41 1.54 1.31 1.54m-1.22 13.93h2.53V6.54h-2.53zM79.952 19.09c1.46 0 2.37-.61 3.12-1.71h.11l.11 1.52h1.99V6.54h-2.64v9.93c-.28.49-.93.85-1.54.85-.77 0-1.01-.61-1.01-1.63V6.54h-2.63v9.27c0 2.01.58 3.28 2.49 3.28M90.003 18.9V8.92c.38-.53 1-.85 1.6-.85.77 0 1.05.54 1.05 1.62v9.21h2.66l-.02-9.97c.37-.56 1-.89 1.62-.89.67 0 1.04.57 1.04 1.65v9.21h2.66V9.49c0-2.21-.79-3.22-2.46-3.22-1.16 0-2.15.42-3.06 1.4-.38-.91-1.13-1.4-2.2-1.4-1.21 0-2.35.52-3.15 1.49h-.15l-.19-1.22h-2.05V18.9Z" style="fill:#fff;fill-opacity:1" transform="matrix(.92322 0 0 .9259 -1.911 2.734)"/></g></svg>'
            });

            // Disconnect the observer once the element is found
            observer.disconnect();
        }

        // Function to check if the target element exists and call the modification function
        function checkYtIconExistence() {
            let ytMusicLogos = document.querySelectorAll("ytmusic-logo > a");
            const signInBtn = document.querySelector("a[href^='https://accounts.google.com']");

            if (signInBtn) {
                // dont apply the premium logo to non-logged in user
                // and disconnect the observer
                observer.disconnect();
            } else if (ytMusicLogos.length == 2) {
                modifyYtIcon(ytMusicLogos);
            };
        }

        // Observe changes in the DOM
        const observer = new MutationObserver(checkYtIconExistence);

        // Start observing the document
        observer.observe(document.body, {childList: true, subtree: true});

        // Call the function once at the beginning in case the element is already present
        checkYtIconExistence();
    });
})();