[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/steimerbyte)

# pi-bsearch-hint

Injects bsearch CLI knowledge into pi agent only when search-related keywords are detected.

## Trigger Keywords

- search, web, browse, online, lookup
- find info/results/news/articles
- google, research, look up
- scrape, crawl

## How It Works

When user says things like:
- "search the web for X"
- "find latest news about Y"
- "google Z"
- "look up information about W"

The extension injects bsearch usage hints into the system prompt.

## Install

```bash
pi install https://github.com/alephtex/pi-bsearch-hint
```

## Usage

Works automatically. Just ask to search:
```
search the web for "python tutorials"
find latest news about AI
google "how to learn rust"
```

## License

MIT
