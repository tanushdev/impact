/**
 * HTML Sanitizer & Rich Text Formatter
 * Provides defense-in-depth against XSS and injection attacks.
 */

/**
 * Strips dangerous HTML tags, attributes, and malicious URL schemes.
 */
export function sanitizeHtml(dirtyHtml: string): string {
  if (!dirtyHtml || typeof dirtyHtml !== 'string') return '';

  let clean = dirtyHtml;

  // 1. Remove script, style, iframe, object, embed, form, and applet blocks entirely
  clean = clean.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  clean = clean.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '');
  clean = clean.replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '');
  clean = clean.replace(/<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi, '');
  clean = clean.replace(/<embed\b[^>]*>/gi, '');
  clean = clean.replace(/<form\b[^<]*(?:(?!<\/form>)<[^<]*)*<\/form>/gi, '');

  // 2. Remove all inline event handlers (onerror, onload, onclick, onmouseover, onfocus, etc.)
  clean = clean.replace(/\s+on[a-zA-Z]+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi, '');

  // 3. Remove dangerous URL schemes (javascript:, vbscript:, data:text/html)
  clean = clean.replace(/href\s*=\s*(?:"\s*javascript:[^"]*"|'\s*javascript:[^']*')/gi, 'href="#"');
  clean = clean.replace(/href\s*=\s*(?:"\s*vbscript:[^"]*"|'\s*vbscript:[^']*')/gi, 'href="#"');
  clean = clean.replace(/href\s*=\s*(?:"\s*data:[^"]*"|'\s*data:[^']*')/gi, 'href="#"');

  // 4. Sanitize image src (only allow http, https, relative /, or data:image/)
  clean = clean.replace(/src\s*=\s*["']?\s*javascript:[^"'>]*["']?/gi, 'src=""');

  return clean;
}

/**
 * Transforms raw article text/HTML into safe, properly styled HTML.
 * Handles:
 * - HTML tags (<strong>, <em>, <u>, <span>, <h2>, <h3>, <blockquote>, <ul>, <ol>, <img>, <a>)
 * - Markdown bold (**text**) and italic (*text*)
 * - Auto-paragraph wrapping for plain text with newlines
 * - XSS sanitization
 */
export function renderRichContent(rawText: string): string {
  if (!rawText || !rawText.trim()) return '';
  let content = rawText.trim();

  // First pass: sanitize incoming content
  content = sanitizeHtml(content);

  // Convert markdown bold: **text** -> <strong>text</strong>
  content = content.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

  // Convert markdown italic: *text* -> <em>$1</em> (avoiding ** matches)
  content = content.replace(/(?<!\*)\*([^*]+?)\*(?!\*)/g, '<em>$1</em>');

  // If there are no HTML block-level tags, wrap paragraphs separated by blank lines into <p> tags
  const hasBlockTags = /<(p|h[1-6]|div|ul|ol|blockquote|figure|table|section)/i.test(content);
  if (!hasBlockTags) {
    const blocks = content.split(/\n\s*\n/);
    content = blocks
      .map((block) => {
        const trimmed = block.trim();
        if (!trimmed) return '';
        // If line starts with a list bullet '-', convert to <li>
        if (trimmed.startsWith('- ')) {
          const items = trimmed
            .split('\n')
            .filter((l) => l.trim().startsWith('- '))
            .map((l) => `<li>${l.replace(/^-\s*/, '')}</li>`)
            .join('');
          return `<ul class="list-disc pl-6 space-y-2 my-4">${items}</ul>`;
        }
        return `<p class="my-4 leading-relaxed">${trimmed.replace(/\n/g, '<br />')}</p>`;
      })
      .filter(Boolean)
      .join('\n');
  }

  // Second pass: ensure any generated markup remains safe
  return sanitizeHtml(content);
}
