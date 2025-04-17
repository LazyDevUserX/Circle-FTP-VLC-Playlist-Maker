# CircleFTP to VLC 🎵

A Tampermonkey userscript that collects all valid links from Circle FTP directories and generates an XSPF playlist, ready to use with VLC and other media players.

## Features
- Adds a "Download Playlist" button to Circle FTP content pages
- Extracts all HTTP(S) file links
- Automatically builds a `.xspf` playlist with VLC-compatible metadata
- Uses page title as playlist name
- Works on:  
  - `http://15.1.1.50/content/*`  
  - `http://new.circleftp.net/content/*`

## Installation

1. Install [Tampermonkey](https://www.tampermonkey.net/) in your browser.
2. [Click here to install the script](circle-ftp-playlist-maker.user.js) (or manually copy it into Tampermonkey).
3. Visit a Circle FTP content page.
4. Click the “Download Playlist” button in the bottom right.

## Playlist Format
Generates `.xspf` format, which is compatible with:
- VLC Media Player
- Winamp
- AIMP
- Clementine
- and many more.

## Sample Output

```xml
<track>
    <location>http://example.com/video1.mp4</location>
    <extension application="http://www.videolan.org/vlc/playlist/0">
        <vlc:id>0</vlc:id>
    </extension>
</track>




---

### 📄 `LICENSE` (MIT)

```txt
MIT License

Copyright (c) 2025 ShadowSensei

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the “Software”), to deal
in the Software without restriction...
