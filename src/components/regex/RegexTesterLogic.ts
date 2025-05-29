export function testRegex(
  pattern: string,
  text: string,
  flags: string = 'g'
): {
  matches: string[];
  matchCount: number;
  highlightedText: string;
} {
  if (!pattern) {
    throw new Error('Please enter a regex pattern');
  }

  try {
    const regex = new RegExp(pattern, flags);
    
    // Find all matches
    const matches: string[] = [];
    let match;
    const clonedRegex = new RegExp(pattern, flags);
    
    while ((match = clonedRegex.exec(text)) !== null) {
      // Avoid infinite loops with zero-width matches
      if (match.index === clonedRegex.lastIndex) {
        clonedRegex.lastIndex++;
      }
      matches.push(match[0]);
      
      // If not global, break after first match
      if (!flags.includes('g')) break;
    }

    // Create highlighted text
    let highlightedText = text;
    if (matches.length > 0) {
      // We need to escape HTML special chars to prevent XSS
      const escapedText = escapeHtml(text);
      
      // Create another regex to apply highlighting
      try {
        const highlightRegex = new RegExp(pattern, flags);
        highlightedText = escapedText.replace(
          highlightRegex,
          '<mark class="bg-yellow-200 dark:bg-yellow-700 dark:text-white px-1 rounded">$&</mark>'
        );
      } catch (error) {
        // If highlighting fails, fallback to the escaped text
        highlightedText = escapedText;
      }
    }

    return {
      matches,
      matchCount: matches.length,
      highlightedText,
    };
  } catch (error) {
    throw new Error(`Invalid regex: ${(error as Error).message}`);
  }
}

function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}