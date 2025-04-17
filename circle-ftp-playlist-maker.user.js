// ==UserScript==
// @name         Circle FTP Playlist Maker V2
// @namespace    http://tampermonkey.net/
// @version      4.0
// @description  Collects links on Circle FTP and creates a playlist
// @author       ShadowSensei
// @match        http://15.1.1.50/content/*
// @match        http://new.circleftp.net/content/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    // Function to add the button to the page
    function addDownloadButton() {
        // Button HTML
        const buttonHTML = `
        <div class="btn-container">
            <button class="download-btn">
                <span>Download Playlist</span>
            </button>
        </div>`;

        // Insert button into the body
        document.body.insertAdjacentHTML('beforeend', buttonHTML);

        // Add CSS styles for the button
        const style = document.createElement('style');
        style.textContent = `
        .btn-container {
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 1000;
        }
        .download-btn {
            background-color: #ff6347;
            color: #fff;
            padding: 15px 25px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            transition: background-color 0.3s ease;
        }
        .download-btn:hover {
            background-color: #ff4500;
        }`;

        document.head.appendChild(style);

        // Attach click event to the button
        document.querySelector('.download-btn').addEventListener('click', generatePlaylist);
    }

    // Function to extract the title using XPath
    function getTitle() {
        let xpath = "/html/body/div/main/div[1]/div"; // Adjust as necessary
        let element = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

        return element ? element.textContent.trim() : "Playlist"; // Default to "Playlist" if not found
    }

    // Function to generate the playlist and trigger the download
    function generatePlaylist() {
        // Create an array to store the links
        let links = [];

        // Select all anchor tags and get their href attributes
        document.querySelectorAll('a').forEach((link) => {
            const href = link.getAttribute('href');
            if (href && (href.startsWith('http') || href.startsWith('https'))) {
                links.push(href);  // Add valid links to the array
            }
        });

        if (links.length === 0) {
            alert('No valid links found.');
            return;  // Don't proceed if there are no links
        }

        // Get the title for the playlist
        let title = getTitle();

        // Create XSPF content
        let xspfContent = `<?xml version="1.0" encoding="UTF-8"?>
        <playlist xmlns="http://xspf.org/ns/0/" xmlns:vlc="http://www.videolan.org/vlc/playlist/ns/0/" version="1">
            <title>${title}</title>
            <trackList>\n`;

        links.forEach((link, index) => {
            xspfContent += `        <track>
                    <location>${link}</location>
                    <extension application="http://www.videolan.org/vlc/playlist/0">
                        <vlc:id>${index}</vlc:id>
                    </extension>
                </track>\n`;
        });

        xspfContent += `    </trackList>
            <extension application="http://www.videolan.org/vlc/playlist/0">\n`;

        links.forEach((link, index) => {
            xspfContent += `        <vlc:item tid="${index}"/>\n`;
        });

        xspfContent += `    </extension>
        </playlist>`;

        // Create a blob from the XSPF content
        let blob = new Blob([xspfContent], { type: 'text/xml' });

        // Create a download link
        let a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = `${title}.xspf`;  // Use the scraped title as the filename
        a.click();  // Automatically trigger the download
    }

    // Add the download button when the script runs
    addDownloadButton();

})();
