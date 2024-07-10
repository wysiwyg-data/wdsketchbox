/**
 * wdSketchBox Plug-In 1.0
 *
 * File: wdSketchBox.js
 *
 * Inspired from:
 * http://github.com/crowdsavings/drawbox       -> no longer active
 *
 * @author     WYSIWYG Data development
 * @copyright  (c) 2024 WYSIWYG Data
 */

class wdSketchBox
{
    constructor(
        {
            // DOM element in which to load the canvas
            drawElement       = '',
            drawElementHeight = 100,
            drawElementWidth  = 100,
            // DOM element in which to save the base64 canvas
            saveElement       = '',
            // load an image or start with blank canvas
            loadImg           = false,
            // path to the control icons
            iconPath          = '',
            iconPencilIdle    = 'icon_pencil.png',
            iconPencilSel     = 'icon_pencil_picked.png',
            iconEraserIdle    = 'icon_eraser.png',
            iconEraserSel     = 'icon_eraser_picked.png',
            // pencil properties
            strokeWidth       = 1,
            strokeOpacity     = 1,
            strokeColour      = 'black',

            // pencil properties -> not used
            strokeCap         = 'round', // 'butt' or 'round' or 'square'
            strokeJoin        = 'round', // 'round' or 'bevel' or 'miter'
            miterLimit        = 10,
            fillStyle         = 'none',
            // shadow properties -> not used
            shadowOffsetX     = 0.0,
            shadowOffsetY     = 0.0,
            shadowBlur        = 0.0,
            shadowColor       = 'none'
        })

    {

        // Check necessary stuff has been provided
        if (drawElement == '' || saveElement == '')
        {
            this.cContext = null;
            alert('A valid <canvas> element id AND a valid <input> element id (for saving) must be provided.' + "\n" + 'wdSketchBox cannot proceed!');
        }
        else
        {
            this.cDrawElement    = drawElement;
            this.cSaveElement    = document.getElementById(saveElement);
            this.cLoadImg        = loadImg;
            this.cIconPath       = iconPath;
            this.cIconPencilIdle = iconPencilIdle;
            this.cIconPencilSel  = iconPencilSel;
            this.cIconEraserIdle = iconEraserIdle;
            this.cIconEraserSel  = iconEraserSel;
            this.cStrokeWidth    = strokeWidth;
            this.cStrokeOpacity  = strokeOpacity;
            this.cStrokeColour   = strokeColour;
            this.cStrokeCap      = strokeCap;
            this.cStrokeJoin     = strokeJoin;
            this.cMiterLimit     = miterLimit;
            this.cFillStyle      = fillStyle;
            this.cShadowOffsetX  = shadowOffsetX;
            this.cShadowOffsetY  = shadowOffsetY;
            this.cShadowBlur     = shadowBlur;
            this.cShadowColor    = shadowColor;
            this.cCanvas         = document.getElementById(this.cDrawElement);

            // Define context
            this.cContext        = this.cCanvas.getContext('2d');

            // Define tracking variables
            this.cDrawing        = false;
            this.cInside         = false
            this.cScrollLeft     = 0;
            this.cScrollTop      = 0;
            this.cPrevX          = false;
            this.cPrevY          = false;
            this.x               = false;
            this.y               = false;
            this.cOffset         = this.elementOffset(this.cCanvas);

            // Set canvas height and width
            this.cHeight         = drawElementHeight;
            this.cWidth          = drawElementWidth;
            this.elementSize(this.cCanvas);

            // set pencil as default tool
            this.cMode           = 'pencil';

        }
    }


    get wd_SketchBox()
    {
        try
        {
            // Start the canvas if we have a context
            if (this.cContext !== null)
            {

                // Remove onclick event so it doesn't interfere with drawing
                if (this.cCanvas.hasAttribute('onclick') == true)
                {
                    this.cCanvas.removeAttribute('onclick');
                }

                // Change cursor type
                this.cCanvas.style.cursor = 'crosshair';

                // draw rectangle around selected colour
                this.pickedColour(this.cStrokeColour);

                // set pencil as default tool
                document.getElementById('wd_SkBxPencilImg').setAttribute('src', (this.cIconPath + this.cIconPencilSel));

                // Define tracking variables
                this.cContext.underInteractionEnabled = true;
                this.cContext.loadImg       = this.cLoadImg;
                this.cContext.lineWidth     = this.cStrokeWidth;
                this.cContext.lineCap       = this.cStrokeCap;
                this.cContext.lineJoin      = this.cStrokeJoin;
                this.cContext.miterLimit    = this.cMiterLimit;
                this.cContext.strokeStyle   = this.cStrokeColour;
                this.cContext.fillStyle     = this.cFillStyle;
                this.cContext.shadowOffsetX = this.cShadowOffsetX;
                this.cContext.shadowOffsetY = this.cShadowOffsetY;
                this.cContext.shadowBlur    = this.cShadowBlur;
                this.cContext.shadowColor   = this.cShadowColor;
                this.cContext.globalAlpha   = this.cStrokeOpacity;

                // Load image if any
                if (this.cLoadImg == true)
                {
                    this.loadSavedImage(this.cContext);
                }

                // Mouse events
                this.cCanvas.addEventListener('mousedown', (ev) => { this.drawingStart(this.cCanvas, ev, this.cContext); });
                this.cCanvas.addEventListener('mousemove', (ev) => { this.drawingMove(this.cCanvas, ev, this.cContext); });
                this.cCanvas.addEventListener('mouseup', (ev) => { this.drawingStop(this.cCanvas, ev, this.cContext); });
                this.cCanvas.addEventListener('contextmenu', (ev) => { this.drawingStop(this.cCanvas, ev, this.cContext); }); // stop right-click from drawing

                // Controls events
                // Change colors
                var vColours = document.querySelectorAll('.wd_SkBxColour');
                for (var i = 0; i < vColours.length; i++)
                {
                    vColours[i].addEventListener('click', (ev) =>
                    {
                        for (var ii = 0; ii < vColours.length; ii++)
                        {
                            vColours[ii].style.borderColor = 'transparent';
                        }
                        var vColour = ev.target.dataset.colour;
                        this.cContext.strokeStyle = vColour;
                        this.pickedColour(vColour);
                    });
                }

                // Pencil tool
                var vPencil = document.getElementById('wd_SkBxToolPencil');
                vPencil.addEventListener('click', (ev) =>
                {
                    this.cMode = 'pencil';
                    this.clearToolHilite(this.cIconPath);
                    document.getElementById('wd_SkBxPencilImg').setAttribute('src', (this.cIconPath + this.cIconPencilSel));
                });

                // Eraser tool
                var vEraser = document.getElementById('wd_SkBxToolEraser');
                vEraser.addEventListener('click', (ev) =>
                {
                    this.cMode = 'eraser';
                    this.clearToolHilite(this.cIconPath);
                    document.getElementById('wd_SkBxEraserImg').setAttribute('src', (this.cIconPath + this.cIconEraserSel));
                });

                // Clear tool
                var vClear = document.getElementById('wd_SkBxToolClear');
                vClear.addEventListener('click', (ev) =>
                {
                    this.cContext.save();
                    this.cContext.beginPath();
                    this.cContext.closePath();
                    this.cContext.restore();
                    this.cContext.clearRect(0, 0, this.cWidth, this.cHeight);
                });

                // Save tool
                var vSave = document.getElementById('wd_SkBxToolSave');
                vSave.addEventListener('click', (ev) =>
                {
                    this.cSaveElement.value = this.cCanvas.toDataURL('image/png');
                });

                // Changing line width
                var vLineWidth = document.getElementById('bc_StrokeSize');
                vLineWidth.addEventListener('input', (ev) =>
                {
                    document.getElementById('wd_StrokeSizeSpan').textContent = vLineWidth.value + 'px';
                    this.cContext.lineWidth = vLineWidth.value;
                });

                // Sets the opacity
                var vOpacity = document.getElementById('bc_StrokeOpacity');
                vOpacity.addEventListener('input', (ev) =>
                {
                    document.getElementById('wd_strokeOpacitySpan').textContent = (Number(vOpacity.value) * 100) + '%';
                    this.cContext.globalAlpha = vOpacity.value;
                });

            }

        }
        catch(e)
        {
            alert(e);
        }

    }

    get wd_SkBxSave()
    {
        try
        {
            this.cSaveElement.value = this.cCanvas.toDataURL('image/png');
        }
        catch(e)
        {
            console.log(e);
        }
    }


    // All the methods
    loadSavedImage(pContext)
    {
        pContext.clearRect(0, 0, this.cWidth, this.cHeight);
        var vImage = new Image();
        vImage.src = this.cSaveElement.value;
        vImage.onload = function()
        {
            pContext.drawImage(vImage, 0, 0);
        }
    }

    clearToolHilite(pImgPath)
    {
        document.getElementById('wd_SkBxPencilImg').setAttribute('src', (pImgPath + this.cIconPencilIdle));
        document.getElementById('wd_SkBxEraserImg').setAttribute('src', (pImgPath + this.cIconEraserIdle));
    }

    trackPosition(pCanvas, ev)
    {
        // Tracks last position to handle dots (as opposed to lines)
        if (this.x != false)
        {
            this.cPrevX = this.x;
            this.cPrevY = this.y;
        }

        // Calculates the X and Y values
        var vOffset = this.elementOffset(pCanvas);
        this.x = ev.pageX - vOffset.left;
        this.y = ev.pageY - vOffset.top;

        return ev;
    }

    doDraw(pType, pContext)
    {
        if (pType != 'stop')
        {
            // drawing or erasing?
            if (this.cMode == 'pencil')
            {
                pContext.globalCompositeOperation = 'source-over';
            }
            else if (this.cMode == 'eraser')
            {
                pContext.globalCompositeOperation = 'destination-out';
            }

            if (pType == 'start')
            {
                this.cInside = false;
                this.cPrevX  = false;
                this.cPrevY  = false;

                pContext.beginPath();
                pContext.moveTo(this.x, this.y);
            }
            else
            {
                // If there's no previous increment since it's a .
                if (this.cPrevX == false)
                {
                    this.x = this.x + 1;
                    this.y = this.y + 1;
                }

                pContext.lineTo(this.x, this.y);
            }

            pContext.stroke();

            if ((this.x > 0 && this.x <= this.cWidth) && (this.y > 0 && this.y <= this.cHeight))
            {
                this.cInside = true;
            }
        }
        else
        {
            this.doDraw('move', pContext);
        }
    }

    drawingStart(pCanvas, ev, pContext)
    {
        // Prevent the default action (scrolling) from occurring
        if (this.cInside == true)
        {
            ev.preventDefault();
        }

        this.cDrawing = true;

        ev = this.trackPosition(pCanvas, ev);

        this.doDraw('start', pContext);
    }

    drawingMove(pCanvas, ev, pContext)
    {
        // Prevent the default action (scrolling) from occurring
        if (this.cInside == true)
        {
            ev.preventDefault();
        }

        if (this.cDrawing == true)
        {
            ev = this.trackPosition(pCanvas, ev);

            this.doDraw('move', pContext);
        }

        return false;
    }

    drawingStop(pCanvas, ev, pContext)
    {
        this.cDrawing = false;

        // Draws one last line so we can draw dots (e.g. i)
        this.doDraw('stop', pContext);
    }

    elementSize(pElement)
    {
        pElement.setAttribute('width', 800);
        pElement.setAttribute('height', 600);
    }

    elementOffset(pElement)
    {
        var vRect        = pElement.getBoundingClientRect();
        this.cScrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
        this.cScrollTop  = window.pageYOffset || document.documentElement.scrollTop;
        return {top: vRect.top + this.cScrollTop, left: vRect.left + this.cScrollLeft};
    }

    pickedColour(pColour)
    {
        var vPickedColId = 'wd_DrawColour-' + pColour;
        var vPickedCol   = document.getElementById(vPickedColId);
        vPickedCol.style.borderColor = 'black';
    }
}
