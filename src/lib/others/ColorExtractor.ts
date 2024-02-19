const { abs, min, max, round } = Math;

/**
 * This interface represents the structural color palette
 * It is used to define the colors of the different surfaces and texts
 */
export interface StructuralColorPalette {
    surface1: string;
    onSurface1: string;

    surface2: string;
    onSurface2: string;
    
    surface3: string;
    onSurface3: string;

    surface4: string;
    onSurface4: string;

    surface5: string;
    onSurface5: string;

    surface6: string;
    onSurface6: string;
    
    background: string;
    onBackground: string;
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
 * This class is used to extract the colors from a base color
 * It is used to extract the colors of the different surfaces and texts    
 */
export class ColorExtractor {

    /**
     * Extract the colors from a base color
     * @param baseColor The base color to extract from
     * @returns The extracted colors palette
     */
    static extractColors(baseColor : string) : StructuralColorPalette {

        const rgbBaseColor = ColorExtractor.hexToRgb(baseColor);
        console.table(rgbBaseColor);

        //console.log(ColorExtractor.rgbToHsl(rgbBaseColor));
        
        // Extract possible colors

        const extractedColors = ColorExtractor.extractAll(rgbBaseColor);
        extractedColors.forEach(color => console.log(color));
        
        const textDark  = {r:0,g:0,b:0};
        const textLight = {r:255,g:255,b:255};

        const background    = extractedColors[1];
        const onBackground  = ColorExtractor.isLight(background) ? textDark : textLight;
        
        const surface1      = extractedColors[2];
        const onSurface1    = ColorExtractor.isLight(surface1) ? textDark : textLight;

        const surface2      = extractedColors[3];
        const onSurface2    = ColorExtractor.isLight(surface2) ? textDark : textLight;

        const surface3      = extractedColors[4];
        const onSurface3    = ColorExtractor.isLight(surface3) ? textDark : textLight;

        const surface4      = extractedColors[5];
        const onSurface4    = ColorExtractor.isLight(surface3) ? textDark : textLight;

        const surface5      = extractedColors[6];
        const onSurface5    = ColorExtractor.isLight(surface3) ? textDark : textLight;

        const surface6      = extractedColors[7];
        const onSurface6    = ColorExtractor.isLight(surface3) ? textDark : textLight;

        return {
            surface1:  ColorExtractor.rgbToHex(surface1),
            onSurface1:  ColorExtractor.rgbToHex(onSurface1),

            surface2:  ColorExtractor.rgbToHex(surface2),
            onSurface2:  ColorExtractor.rgbToHex(onSurface2),

            surface3:  ColorExtractor.rgbToHex(surface3),
            onSurface3:  ColorExtractor.rgbToHex(onSurface3),

            surface4: ColorExtractor.rgbToHex(surface4),
            onSurface4: ColorExtractor.rgbToHex(onSurface4),

            surface5: ColorExtractor.rgbToHex(surface5),
            onSurface5: ColorExtractor.rgbToHex(onSurface5),

            surface6: ColorExtractor.rgbToHex(surface6),
            onSurface6: ColorExtractor.rgbToHex(onSurface6),

            background:  ColorExtractor.rgbToHex(background),
            onBackground:  ColorExtractor.rgbToHex(onBackground),
        };
    }


    /**
     * Recursive function to extract all colors
     * @param color The base color to extract from
     * @returns The array of extracted colors
     */
    private static extractAll(
        color : Color,
        baseChannel = ColorExtractor.getBaseChannel(color)
    ) : Color[] {

        const difference = 17;
        const darkerColors = []
        const lighterColors = [];
        var rgbDown = color;

        // Get all color shades from 0 to color
        while (rgbDown[baseChannel] > 0) {
            rgbDown = ColorExtractor.getNewColor(rgbDown, -difference);
            if(!ColorExtractor.isValidColor(rgbDown))
                break;
                
            darkerColors.push(rgbDown);
        }

        darkerColors.reverse();
        lighterColors.push(color);
        var rgbUp = color;

        // Get all color shades from color to 255
        while (rgbUp[baseChannel] < 255) {
            rgbUp = ColorExtractor.getNewColor(rgbUp, difference);
            if(!ColorExtractor.isValidColor(rgbUp))
                break;
            
            lighterColors.push(rgbUp);
        }

        return darkerColors.concat(lighterColors);
    
    }

    /**
     * 
     * Get if the color is valid
     * @param rgbUp The color to check
     */
    static isValidColor(rgbUp: Color) {
        return rgbUp.r >= 0 && rgbUp.r <= 255
            && rgbUp.g >= 0 && rgbUp.g <= 255
            && rgbUp.b >= 0 && rgbUp.b <= 255;
    }

    /**
     * Get the base channel 
     * @param color The color to get the base channel value from 
     * @returns The base channel value
     */
    private static getBaseChannel(color : Color) : string {
        
        const val = Math.max(color.r,color.g,color.b);
        switch(val){
            case color.r: return 'r';
            case color.g: return 'g';
            case color.b: return 'b';
        }

        return 'r';
      
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
     * Get a new color based on the difference
     * it can be a lighter or darker color 
     * @param color The base color
     * @param difference The difference to apply
     * @returns The new color
     */
    private static getNewColor(color : Color, difference : number) : Color {
        return {
            r : color.r + difference,
            g : color.g + difference,
            b : color.b + difference,
        };
    }

    /**
     * Get the color ensuring that it is in the 0 to 255 range
     * @param number The color to get in the 0 to 255 range
     * @returns The color in the 0 to 255 range
     */
    private static getNumberIn0to255Range(number) {

        if(number <= 0){
            return 0;
        }

        if (number >= 255){
            return 255;
        }

        return number;
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
     * @return  {Array}           The RGB representation
     */
    private static hslToRgb(h, s, l) {
        let r, g, b;
    
        if (s === 0) {
        r = g = b = l; // achromatic
        } else {
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = ColorExtractor.hueToRgb(p, q, h + 1/3);
        g = ColorExtractor.hueToRgb(p, q, h);
        b = ColorExtractor.hueToRgb(p, q, h - 1/3);
        }
    
        return [round(r * 255), round(g * 255), round(b * 255)];
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
    private static rgbToHsl(color : Color) {
        (color.r /= 255), (color.g /= 255), (color.b /= 255);
        const vmax = max(color.r, color.g, color.b), vmin = min(color.r, color.g, color.b);
        let h, s, l = (vmax + vmin) / 2;
    
        if (vmax === vmin) {
        return [0, 0, l]; // achromatic
        }
    
        const d = vmax - vmin;
        s = l > 0.5 ? d / (2 - vmax - vmin) : d / (vmax + vmin);
        if (vmax === color.r) h = (color.g - color.b) / d + (color.g < color.b ? 6 : 0);
        if (vmax === color.g) h = (color.b - color.r) / d + 2;
        if (vmax === color.b) h = (color.r - color.g) / d + 4;
        h /= 6;
    
        return [h, s, l];
    }
  

} 
