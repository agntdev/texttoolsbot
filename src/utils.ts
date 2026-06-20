export function wordCount(text: string): number {
  return text.split(/\s+/u).filter((t) => t.length > 0).length;
}