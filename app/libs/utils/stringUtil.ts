export const removeLastSentence = (text: string) => {
    // Split the text into sentences based on punctuation
    const sentences = text.trim().split(/(?<=[.!?])[\s\n]+/);

    // Remove the last sentence and join back the rest
    return sentences.slice(0, -1).join(' ').replace(/\s+/g, ' ').trim();
}