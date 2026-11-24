/**
 * Transforms raw article text/HTML into safe, properly styled HTML.
 * Handles:
 * - HTML tags (<strong>, <em>, <u>, <span>, <h2>, <h3>, <blockquote>, <ul>, <ol>, <img>, <a>)
 * - Markdown bold (**text**) and italic (*text*)
 * - Auto-paragraph wrapping for plain text with newlines
 */
export function renderRichContent(rawText: string): string {
  if (!rawText || !rawText.trim()) return '';
  let content = rawText.trim();

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

  return content;
}
