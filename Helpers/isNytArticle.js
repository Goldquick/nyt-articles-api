
// Blame chatGPT if this doesn't work how it should

const isNYTArticleUrl = (url) => {
  if (!url) return false;

  // Accept only https URLs from nytimes.com or subdomains
  if (!url.startsWith('https://www.nytimes.com') && !url.startsWith('https://nytimes.com')) return false;

  // Extract pathname part (after domain)
  try {
    const pathname = new URL(url).pathname;

    // Reject common non-article prefixes
    const nonArticlePrefixes = [
      '/section/',
      '/spotlight/',
      '/newsletter/',
      '/newsletters/',
      '/subscription/',
      '/games/',
      '/crosswords/',
      '/puzzles/',
      '/help/',
      '/privacy/',
      '/careers/',
      '/advertising/',
      '/tbrandstudio/',
      '/wirecutter/',
      '/athletic/',  // optionally skip, athletic can have articles but complicated
      '/cooking/',   // mostly recipes or topics, not news articles
    ];

    // Reject if pathname starts with any non-article prefix
    if (nonArticlePrefixes.some(prefix => pathname.startsWith(prefix))) {
      return false;
    }

    // Accept if pathname matches a dated article URL:
    // Example: /2025/07/31/us/politics/trump-tariffs-mexico-extension.html
    // Pattern: /YYYY/MM/DD/ or /YYYY/MM/
    const dateRegex = /^\/\d{4}\/\d{2}(\/\d{2})?\//;
    if (dateRegex.test(pathname)) {
      return true;
    }

    // Accept if pathname starts with /article/
    if (pathname.startsWith('/article/')) {
      return true;
    }

    // Accept if pathname starts with /2025/ (or current year) without day
    const yearRegex = /^\/\d{4}\//;
    if (yearRegex.test(pathname)) {
      return true;
    }

    // Optionally accept /live/ and /interactive/ paths if you want these articles
    // Uncomment to accept:
    /*
    if (pathname.startsWith('/live/') || pathname.startsWith('/interactive/')) {
      return true;
    }
    */

    return false;
  } catch {
    return false;
  }
}


module.exports = isNYTArticleUrl;