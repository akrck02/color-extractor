# Color extractor
Hi there! This is a library and a demo app to extract a cohesive color palette from a base color in dark / light mode!

This proyect was inspired by the new Material you design trend and free to use.

The extractor library returns a JSON with the following format:

```JSON
{
    "surface1": "#262626",
    "onSurface1": "#ffffff",
    "surface2": "#333333",
    "onSurface2": "#ffffff",
    "surface3": "#404040",
    "onSurface3": "#ffffff",
    "surface4": "#4d4d4d",
    "onSurface4": "#ffffff",
    "surface5": "#595959",
    "onSurface5": "#ffffff",
    "surface6": "#666666",
    "onSurface6": "#ffffff",
    "background": "#1a1a1a",
    "onBackground": "#ffffff"
}
```

And the app using it rewrites the [BubbleUI](https://github.com/akrck02/Bubble-UI) variables to change the UI colors!

<div style="display:flex; flexx-wrap:wrap;">
    <style>
        img {
            width: 20%
        }
    </style>

![Theme1](./docs/resources/Theme1.png)
![Theme2](./docs/resources/Theme2.png)
![Theme3](./docs/resources/Theme3.png)
![Theme4](./docs/resources/Theme4.png)
![Theme5](./docs/resources/Theme5.png)
![Theme6](./docs/resources/Theme6.png)
![Theme7](./docs/resources/Theme7.png)
![Theme8](./docs/resources/Theme8.png)

</div>