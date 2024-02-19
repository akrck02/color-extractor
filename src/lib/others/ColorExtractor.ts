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

} 
