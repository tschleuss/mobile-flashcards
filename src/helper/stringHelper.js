/**
 * Remove new lines for deck's title.
 */
export const formatInputTexts = name =>
    name.replace(/[\r\n]+/g, ' ').trim()
