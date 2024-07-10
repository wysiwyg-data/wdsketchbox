# wdSketchBox ~ A basic vanilla Javascript Canvas app.

wdSketchBox is a lightweight, basic Canvas Javascript class. It is very simple to include into existing projects and even simpler to use! It provides basic tools to get started drawing using the Javascript graphics Canvas tool.

## Some features
- vanilla Javascript means no dependencies on external libraries such as jQuery.
- ability to style the canvas controls with css, create themes/skins. Comes with basic theme.
- offers basic options to get started.
- ability to load and save drawings (Base 64 format.)

## Documentation

### Dependencies
- `wdSketchBox.css` -> main css file
- `wdSketchBox.css` -> optional theme css file (located in a themes directory for example.) If not wanted, ensure all theme css directives are copied into the main css file above.
- HTML block providing canvas interaction controls (see example.)

### Loading wdSketchBox
- Please refer to the index.php example file.
- Load the class when the DOM loading has completed.
- Typically: `const aConst = new wdSketchBox({ option1:value1, option2:value2, ... });`
- And then call the wdSketchBox class method that starts the canvas: `aConst.wd_SketchBox;`

### wdSketchBox options
**Please note**: the canvas won't work unless all compulsory options are set. See the list of options below.

Compulsory options

- `'drawElement'       <string>  - (C) Default: ''. HTML <canvas> element "id" attribute`
- `'drawElementHeight' <integer> - (C) Default: 100. HTML <canvas> element "height" attribute (set by the class using this value)`
- `'drawElementWidth'  <integer> - (C) Default: 100. HTML <canvas> element "width" attribute (set by the class using this value)`
- `'saveElement'       <string>  - (C) Default: ''. HTML <input> element in which the drawing is saved (typically an <input> of type "hidden")`
- `'iconPath'          <string>  - (C) Default: ''. Path to the location of the canvas control icons`

General optional options

- `'iconPencilIdle'    <string>  - (O) Default: 'icon_pencil.png'. Unselected pencil icon`
- `'iconPencilSel'     <string>  - (O) Default: 'icon_pencil_picked.png'. Selected pencil icon`
- `'iconEraserIdle'    <string>  - (O) Default: 'icon_eraser.png'. Unselected eraser icon`
- `'iconEraserSel'     <string>  - (O) Default: 'icon_eraser_picked.png'. Selected eraser icon`
- `'loadImg'           <boolean> - (O) Default: false. Load an image on start. Image must be stored in Base 64 format in the 'saveElement' defined above`
- `'strokeColour'      <string>  - (O) Default: 'black'. Default drawing stroke colour`
- `'strokeWidth'       <integer> - (O) Default: 1(px). Default drawing stroke width. No maximum, use sensibly :-)`
- `'strokeOpacity'     <integer> - (O) Default: 1 (100%). Default drawing stroke opacity. Range: 0 -> 1`

Unused optional options (future enhancements)

- `'strokeCap'         <string>  - (O) Default: 'round'`
- `'strokeJoin'        <string>  - (O) Default: 'round'`
- `'miterLimit'        <integer> - (O) Default: 10`
- `'fillStyle'         <string>  - (O) Default: 'none'`
- `'shadowOffsetX'     <decimal> - (O) Default: 0.0`
- `'shadowOffsetY'     <decimal> - (O) Default: 0.0`
- `'shadowBlur'        <decimal> - (O) Default: 0.0`
- `'shadowColor'       <string>  - (O) Default: 'none'`

Key to abbreviations: (**C**) = Compulsory, (**O**) = Optional

### wdSketchBox callable methods

- `wd_SketchBox`: method used to kick the class into life (see **Loading wdSketchBox** above.)
- `wd_SkBxSave`: method used to write a Base 64 string of the drawing in the designated <input> element -- `'saveElement'` option -- (see **Saving a drawing** below.)


## Demo

All files for the demo can be found in the `/example` directory.

Step to follow: run the `index.php` script in a web server, and it will create a set of controls and a `<canvas>` element, ready to use.

## Saving a drawing

wdSketchBox provides an easy way to save the canvas drawing.

The controls in the example include a *Save* icon (below the red cross Clear icon). This saving option simply dumps a Base 64 string of the drawing in a designated <input> element. The <input> element is specified using the `'saveElement'` option when calling the class. **Note:** the `'saveElement'` option must point to a HTML element of type <input>.

The example also includes a HTML form, complete with a Save button, demonstrating how easy it is to include the content of the canvas as part of the dataset of a form, which can then be saved to a database table for example.

## Conclusion
Please feel free to use this and feedback any request for enhancement, or bugs if any.
