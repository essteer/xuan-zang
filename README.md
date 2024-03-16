# <img src="XUANZANG.png" width="386" height="80">

![GitHub deployments](https://img.shields.io/github/deployments/essteer/xuan-zang/Production) ![GitHub License](https://img.shields.io/github/license/essteer/xuan-zang?color=blue) ![GitHub last commit](https://img.shields.io/github/last-commit/essteer/xuan-zang?color=red) ![GitHub top language](https://img.shields.io/github/languages/top/essteer/xuan-zang?color=blue)

I built [XUANZANG](https://www.xuan-zang.com) as an ongoing project to introduce Chinese-language writers and podcasts, and share information on where to find physical books, Chinese-supported podcast platforms, and related resources.

### Content

All text-based content is written by me, unless otherwise indicated.

The core of the website is organised as follows:

| Section    | Description                                      |
| ---------- | ------------------------------------------------ |
| 墨 INK     | Introductions to writers and books               |
| 嗓 VOICE   | Introductions to podcast series                  |
| 源 SOURCES | Where to get hold of content and study materials |

More content will be added to these sections over time, with new sections also planned - watch this space!

Images used include artworks, photographs, official logos and so on. Attributions are explicit and I have sought permission from their owners to use these images; many have kindly granted this permission, but if you are the author of content here that you would like to be removed or amended, please contact me directly on [elliott@xuan-zang.com](elliott@xuan-zang.com).

### Development notes

The key tools used to develop this website are [Embedded JavaScript](https://ejs.co/), `HTML`, `CSS` and `Node`. The original version of the site made heavy use of the [Bootstrap 5](https://getbootstrap.com/) framework, but this has since been reduced to a minimum to exert more direct control on the site's aesthetic.

Images are hosted on [Cloudinary](https://cloudinary.com/), and the site is deployed through [Vercel](https://vercel.com/) using a `CI/CD` workflow integrated with this repository.

### Fonts

XUANZANG uses [Google Fonts](https://fonts.google.com/) for title text (`Oswald`: Latin script | `ZCOOL QingKe HuangYou`: Chinese script) and body text (`Source Serif Pro`: Latin script | `Noto Serif TC`: Chinese script).

`ZCOOL QingKe HuangYou` is primarily designed for simplified Chinese character sets: it contains traditional variants for many - but not all - characters.

XUANZANG makes use of traditional characters, most of which are featured in `ZCOOL QingKe HuangYou`, though there are a small number of exceptions for which I have had to make use of simplified variants. This isn't ideal, but I love the design of the font and feel it is a minor trade-off. Purists please 諒解 - or better yet, release more fonts! There aren't enough creative designs for Chinese scripts.

To optimise use of web fonts, practices have been adopted from [CSS Wizardy](https://csswizardry.com/2020/05/the-fastest-google-fonts/)'s additive method:

- "&display=swap" at the end of the href link is now default with Google Fonts - this allows the system font to load if there is a delay in fetching the web font.
- media="print" to fetch Google Fonts File asynchronously.
- Preload the CSS file to make the asynchronous fetch high priority.
- Preconnect fonts.gstatic.com, disabling the default fonts.googleapis.com preconnect.
- A noscript fallback is also included for instances where JavaScript is disabled.

### Acknowledgements

I learnt the skills needed to build this website by completing [Colt Steele's](https://www.youtube.com/channel/UCrqAGUPPMOdo0jfQ6grikZw) excellent [Web Developer Bootcamp](https://www.udemy.com/course/the-web-developer-bootcamp/?couponCode=LETSLEARNNOW) on Udemy.
