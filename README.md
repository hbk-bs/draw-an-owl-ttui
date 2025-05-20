# draw-an-owl-ttui

This project was created during the seminar "Text: The Universal Interface" at HBK BS, Digital Basics, 2025.  
It uses AI to draw an owl.


## TODO

- Remix the val.town endpoint to use your own https://val.town/remix/ff6347-openai-api.
- Remove the defensive code around the `apiEndpoint`.

## Usage

- Click "Draw an owl" and the AI returns a set of paths as JSON.
- The owl is rendered live on a p5.js canvas.

## How it works

- The button sends a system prompt to an OpenAI endpoint, asking for owl drawing data (as JSON: array of paths, each path is an array of `{x, y}` points).
- The response is parsed and rendered using p5.js.
- Each click generates a new, unique AI owl.

## Files

- `index.html` — Minimal markup, loads p5.js, the form, and your JS.
- `index.js` — Handles the OpenAI API call, parses the response, and draws the owl.
- `style.css` — Clean, modern, responsive layout.
- `lib/p5.min.js` — p5.js library (not included here, but expected in `lib/`).

## Meme context

Inspired by the "How to Draw an Owl" meme:  
1. Draw two circles.  
2. Draw the rest of the owl.  
This app skips the details and lets the AI handle "the rest of the owl."

## Running

Just open `index.html` in a browser.  
Requires internet access for p5.js and the OpenAI API endpoint.

---

*Made for fun, not for production. Enjoy your AI owls.*
