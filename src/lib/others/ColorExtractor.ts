const { abs, min, max, round } = Math;

/**
 * This interface represents the structural color palette
 * It is used to define the colors of the different surfaces and texts
 */
export interface StructuralColorPalette {
    "surface-1": string;
    "on-surface-1": string;

    "surface-2": string;
    "on-surface-2": string;

    "surface-3": string;
    "on-surface-3": string;
    "surface-4": string;
    "on-surface-4": string;

    "surface-5": string;
    "on-surface-5": string;

    "surface-6": string;
    "on-surface-6": string;

    "background": string;
    "on-background": string;
}

/**
 * This interface represents a color in the RGB format 
 */
interface Color {
    r: number;
    g: number;
    b: number;
}

/**
 * This interface represents a color in the RGB format 
 */
interface ColorHSL {
    h: number;
    s: number;
    l: number;
}


/**
 * This class is used to extract the colors from a base color
 * It is used to extract the colors of the different surfaces and texts    
 */
export class ColorExtractor {

    /**
     * Extract the colors from a base color
     * @param baseColor The base color to extract from
     * @returns The extracted colors palette
     */
    static extractColors(baseColor : string = "#000000", lightMode : boolean = true) : StructuralColorPalette {

        const rgbBaseColor = ColorExtractor.hexToRgb(baseColor);
        const hslColor = ColorExtractor.rgbToHsl(rgbBaseColor);
        hslColor.l = 0;
        //hslColor.s = 0;

        const extractedColors = [ColorExtractor.hslToRgb(hslColor)];
        while (hslColor.l < 1) {
            hslColor.l += .05;
            extractedColors.push(ColorExtractor.hslToRgb(hslColor))
        }

        if(lightMode)
            extractedColors.reverse();
        
        console.log(extractedColors);
        
        const textDark  = {r:0,g:0,b:0};
        const textLight = {r:255,g:255,b:255};

        const background    = extractedColors[2];
        const onBackground  = ColorExtractor.isLight(background) ? textDark : textLight;
        
        const surface1      = extractedColors[3];
        const onSurface1    = ColorExtractor.isLight(surface1) ? textDark : textLight;

        const surface2      = extractedColors[4];
        const onSurface2    = ColorExtractor.isLight(surface2) ? textDark : textLight;

        const surface3      = extractedColors[5];
        const onSurface3    = ColorExtractor.isLight(surface3) ? textDark : textLight;

        const surface4      = extractedColors[6];
        const onSurface4    = ColorExtractor.isLight(surface3) ? textDark : textLight;

        const surface5      = extractedColors[7];
        const onSurface5    = ColorExtractor.isLight(surface3) ? textDark : textLight;

        const surface6      = extractedColors[8];
        const onSurface6    = ColorExtractor.isLight(surface3) ? textDark : textLight;

        return {
            "surface-1":  ColorExtractor.rgbToHex(surface1),
            "on-surface-1":  ColorExtractor.rgbToHex(onSurface1),

            "surface-2":  ColorExtractor.rgbToHex(surface2),
            "on-surface-2":  ColorExtractor.rgbToHex(onSurface2),

            "surface-3":  ColorExtractor.rgbToHex(surface3),
            "on-surface-3":  ColorExtractor.rgbToHex(onSurface3),

            "surface-4": ColorExtractor.rgbToHex(surface4),
            "on-surface-4": ColorExtractor.rgbToHex(onSurface4),

            "surface-5": ColorExtractor.rgbToHex(surface5),
            "on-surface-5": ColorExtractor.rgbToHex(onSurface5),

            "surface-6": ColorExtractor.rgbToHex(surface6),
            "on-surface-6": ColorExtractor.rgbToHex(onSurface6),

            "background":  ColorExtractor.rgbToHex(background),
            "on-background":  ColorExtractor.rgbToHex(onBackground),
        };
    }

    /*
    * Convert hexadecimal  to rgb
    * @param hex The hex value to convert
    * @returns The rgb value
    * */
    private static hexToRgb(hex : string) : Color {
        
        const hexValue = hex.substring(1)
        const red = hexValue.substring(0, 2)
        const green = hexValue.substring(2, 4)
        const blue = hexValue.substring(4, 6)

        return {
            r : parseInt(red,16), 
            g : parseInt(green,16),
            b : parseInt(blue,16)
        }
    }

    /**
     * Convert RGB to hex
     * @param rgb The rgb color to convert
     * @returns The hex string
     */
    private static rgbToHex(rgb : Color) : string {
        const red   = rgb.r.toString(16).padStart(2, '0')
        const green = rgb.g.toString(16).padStart(2, '0')
        const blue  = rgb.b.toString(16).padStart(2, '0')
        return `#${red}${green}${blue}`
    }

    /**
     * Get if the color is light
     * @param color The color to check
     * @returns If the color is light
     */
    private static isLight(color : Color) {
        return color.r + color.g + color.b  >= 127 * 2;
    }

    /**
     * Converts an HSL color value to RGB. Conversion formula
     * adapted from https://en.wikipedia.org/wiki/HSL_color_space.
     * Assumes h, s, and l are contained in the set [0, 1] and
     * returns r, g, and b in the set [0, 255].
     *
     * @param   {number}  h       The hue
     * @param   {number}  s       The saturation
     * @param   {number}  l       The lightness
     * @return  {Color}           The RGB representation
     */
    private static hslToRgb(color: ColorHSL) : Color {
        let r, g, b;
    
        if (color.s === 0) {
        r = g = b = color.l; // achromatic
        } else {
        const q = color.l < 0.5 ? color.l * (1 + color.s) : color.l + color.s - color.l * color.s;
        const p = 2 * color.l - q;
        r = ColorExtractor.hueToRgb(p, q, color.h + 1/3);
        g = ColorExtractor.hueToRgb(p, q, color.h);
        b = ColorExtractor.hueToRgb(p, q, color.h - 1/3);
        }
    
        return {r: round(r * 255), g: round(g * 255), b: round(b * 255)};
    }
    
    /**
     * Converts an RGB color value to HSL. Conversion formula
     * @param p 
     * @param q 
     * @param t 
     * @returns 
     */
    private static hueToRgb(p, q, t) {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1/6) return p + (q - p) * 6 * t;
        if (t < 1/2) return q;
        if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
        return p;
    }

    /**
     * Converts an RGB color value to HSL. Conversion formula
     * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
     * Assumes r, g, and b are contained in the set [0, 255] and
     * returns h, s, and l in the set [0, 1].
     *
     * @param   {number}  r       The red color value
     * @param   {number}  g       The green color value
     * @param   {number}  b       The blue color value
     * @return  {Array}           The HSL representation
     */
    private static rgbToHsl(color : Color) : ColorHSL {

        const newColor = {
            r: color.r / 255,
            g: color.g / 255,
            b: color.b / 255
        };

        const vmax = max(newColor.r, newColor.g, newColor.b), vmin = min(newColor.r, newColor.g, newColor.b);
        let h, s, l = (vmax + vmin) / 2;
    
        if (vmax === vmin) {
            return {h: 0, s: 0, l: l}; // achromatic
        }
    
        const d = vmax - vmin;
        s = l > 0.5 ? d / (2 - vmax - vmin) : d / (vmax + vmin);
        if (vmax === newColor.r) h = (newColor.g - newColor.b) / d + (color.g < color.b ? 6 : 0);
        if (vmax === newColor.g) h = (newColor.b - newColor.r) / d + 2;
        if (vmax === newColor.b) h = (newColor.r - newColor.g) / d + 4;
        h /= 6;
    
        return {h:h, s:s, l:l};
    }
  

} 
