# Xuanzang

Introductions to Chinese-language writers and podcasts, and where to find them.

## Content

Main content sections:

- INK: writers and books
- VOICE: podcasts
- SOURCES: links to places to get hold of content and study materials

## Development notes

### Fonts

Xuanzang uses Google Fonts for title text (Oswald: Latin script / ZCOOL QingKe HuangYou: Chinese script) and body text (Source Serif Pro: Latin / Noto Serif TC: Chinese).

To optimise use of web fonts, practices have been adopted from [CSS Wizardy](https://csswizardry.com/2020/05/the-fastest-google-fonts/)'s additive method:

- "&display=swap" at the end of the href link is now default with Google Fonts.
- media="print" to fetch Google Fonts File asynchronously.
- Preload the CSS file to make the asynchronous fetch high priority.
- Preconnect fonts.gstatic.com, disabling the default fonts.googleapis.com preconnect.
- a noscript fallback is also included for instances where JavaScript is disabled.
