/**
 * Converts a string to a hexadecimal color code.
 *
 * This function generates a semi-unique color based on the input string.  It's
 * not cryptographically secure, but it's suitable for generating consistent
 * colors for UI elements, like user avatars or tags.
 *
 * @param str The input string.
 * @returns A hexadecimal color code (e.g., "#f59e0b").  Returns an empty
 * string if the input string is empty.
 */
function stringToColor(str: string): string {
    if (!str) {
        return "";
    }

    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }

    // Use modulus to get a value within a reasonable range (0-359 for hue)
    const hue = hash % 360;
    // Saturation and Lightness are fixed for consistent color output
    const saturation = 60; // Percentage
    const lightness = 50;    // Percentage

    // Convert HSL to RGB (simplified for this use case)
    const h = hue / 360;
    const s = saturation / 100;
    const l = lightness / 100;
    let r, g, b;

    if (s === 0) {
        r = g = b = l; // achromatic
    } else {
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hueToRgb(p, q, h + 1/3);
        g = hueToRgb(p, q, h);
        b = hueToRgb(p, q, h - 1/3);
    }

    // Convert RGB to Hex
    const toHex = (x: number) => Math.round(x * 255).toString(16).padStart(2, '0');
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

/**
 * Helper function to convert hue to RGB.
 */
function hueToRgb(p: number, q: number, h: number): number {
    const t = h < 0 ? h + 1 : h > 1 ? h - 1 : h;
    if (t < 1/6) return p + (q - p) * 6 * t;
    if (t < 1/2) return q;
    if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
    return p;
}

export default stringToColor
