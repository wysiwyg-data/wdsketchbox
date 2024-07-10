<?php
$wdThemesPath = 'app-themes/';
$wdAppTheme   = 'classic';

/* The colour palette */
$wdColorArray = ['black', 'grey', 'magenta', 'red', 'brown', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet', 'aqua'];
$wdColorCount = count($wdColorArray);
$wdStr        = '';
for ($i = 0; $i < $wdColorCount; $i++)
{
    $wdStr .= '<a href="#" title="Click to select the pencil stroke colour"><div id="wd_DrawColour-' . $wdColorArray[$i] . '" class="wd_SkBxColour" style="background-color:' . $wdColorArray[$i] . ';" data-colour="' . $wdColorArray[$i] . '"></div></a>';
}
?>

<!doctype html>
<html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="robots" content="noindex, nofollow">
        <meta name="author" content="WYSIWYG Data development">

        <title>SketchBox Example</title>

        <script src="js/wdSketchBox.js"></script>

        <link type="text/css" href="css/example.css" rel="stylesheet" media="screen" />
        <link type="text/css" href="<?php echo $wdThemesPath.$wdAppTheme; ?>/css/example.css" rel="stylesheet" media="screen" />
        <link type="text/css" href="css/wdSketchBox.css" rel="stylesheet" media="screen" />
        <link type="text/css" href="<?php echo $wdThemesPath.$wdAppTheme; ?>/css/wdSketchBox.css" rel="stylesheet" media="screen" />

    </head>

    <body>

        <div id="wd_HeaderDiv" class="wd_BorderBottom">
            <p>Yet another Canvas app</p>
        </div>

        <div id="wd_ContentDiv">

            <div id="wd_MainContent">

                <div id="wd_SkBxForm">

                    <form action="" name="wd_SkBxDataForm" id="wd_SkBxDataForm" method="post" accept-charset="utf-8">

                        <input type="hidden" name="wd_SavedSketch" id="wd_SavedSketch" value="" />
                        <button id="wd_SkBxSave" type="button">Save</button>
                        <div class="wd_SkBxHead2"><p>Save drawing here as part of a HTML form.</p></div>
                        <div><p>The Base 64 image can be seen in the console drawer of the browser's developer tools.</p></div>

                    </form>

                </div>

                <div id="wd_SkBxWrapper" class="wd_SkBx-rnw">

                    <div id="wd_SkBxControls">

                        <div>
                            <p class="wd_SkBxHead1">Controls</p>
                        </div>
                        <div id="wd_SkBxColours" class="wd_SkBx-rw">
<?php
                            echo $wdStr;
?>
                        </div>
                        <div>
                            <div class="wd_SkBxTool" id="wd_SkBxToolPencil"><a href="#" title="Click to select the pencil tool"><img id="wd_SkBxPencilImg" src="<?php echo $wdThemesPath.$wdAppTheme; ?>/images/icon_pencil.png" alt="" /></a></div>
                        </div>
                        <div>
                            <div class="wd_SkBxTool" id="wd_SkBxToolEraser"><a href="#" title="Click to select the eraser tool"><img id="wd_SkBxEraserImg" src="<?php echo $wdThemesPath.$wdAppTheme; ?>/images/icon_eraser.png" alt="" /></a></div>
                        </div>
                        <div>
                            <div class="wd_SkBxTool" id="wd_SkBxToolClear"><a href="#" title="Click to clear the entire drawing area"><img src="<?php echo $wdThemesPath.$wdAppTheme; ?>/images/icon_delete.png" alt="" /></a></div>
                        </div>
                        <div>
                            <div class="wd_SkBxTool" id="wd_SkBxToolSave"><a href="#" title="Click to save the drawing as a Base 64 image"><img src="<?php echo $wdThemesPath.$wdAppTheme; ?>/images/icon_save.png" alt="" /></a></div>
                        </div>
                        <div>
                            <div class="wd_SkBxHead2"><p><label for="bc_StrokeSize">Stroke Width</label></p></div>
                            <div><p><input type="range" id="bc_StrokeSize" name="bc_StrokeSize" class="wd_SkBxSliderOrient" min="0" max="50" value="25" step="5" /></p></div>
                            <div><p><span id="wd_StrokeSizeSpan">25px</span></p></div>
                        </div>
                        <div>
                            <div class="wd_SkBxHead2"><p><label for="bc_StrokeOpacity">Opacity</label></p></div>
                            <div><p><input type="range" id="bc_StrokeOpacity" name="bc_StrokeOpacity" class="wd_SkBxSliderOrient" min="0" max="1" value="1" step=".1" /></p></div>
                            <div><p><span id="wd_strokeOpacitySpan">100%</span></p></div>
                        </div>
                    </div>
                    <div>
                        <canvas id="wd_SkBxCanvas">
                        </canvas>
                    </div>
                </div>

            </div>

        </div>

        <div id="wd_FooterDiv" class="wd_BorderTop">
            <p><b><em>&copy; WYSIWYG Data <?php echo date('Y'); ?></em></b></p>
        </div>

        <script>
            document.onreadystatechange = () =>
            {
                if (document.readyState === "complete")
                {

                    const sketchTest = new wdSketchBox(
                    {
                        drawElement:       'wd_SkBxCanvas',
                        drawElementHeight: 600,
                        drawElementWidth:  800,
                        saveElement:       'wd_SavedSketch',
                        loadImg:           true,
                        iconPath:          '<?php echo $wdThemesPath.$wdAppTheme; ?>/images/',
                        strokeColour:      'red',
                        strokeWidth:       25,
                    });
                    sketchTest.wd_SketchBox;

                    // add a listener for the form save button
                    document.getElementById('wd_SkBxSave').addEventListener('click', (e) =>
                    {
                        // save the canvas content to hidden element
                        sketchTest.wd_SkBxSave;

                        var vForm     = document.forms.wd_SkBxDataForm;
                        var vFormData = new FormData(vForm);
                        console.log(vFormData.get('wd_SavedSketch'));
                    });

                }
            };
        </script>

    </body>
</html>
