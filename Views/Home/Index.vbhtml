<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="Scripts/scriptt.js"></script>
    <link href="~/Content/Stylezz.css" rel="stylesheet" />
</head>

<h1 style="text-align: center;  font-family: 'Brush Script MT'; color: crimson">Wordle Game</h1>

<div style="color: #102C57 " class="popup" id="popp" >
    Click for instructions!
    <span class="popuptext" id="myPopup">You get 6 chances to guess a 5-letter word!</span>
</div>


<body>
    <div class="container">
        <div class="container" style="display:flex">
            <div id="grid"></div>
        </div>
        <div id="keyboard">
            <div class="row">
                <button class="key" data-state="0" data-key="Q">Q</button>
                <button class="key" data-state="0" data-key="W">W</button>
                <button class="key" data-state="0" data-key="E">E</button>
                <button class="key" data-state="0" data-key="R">R</button>
                <button class="key" data-state="0" data-key="T">T</button>
                <button class="key" data-state="0" data-key="Y">Y</button>
                <button class="key" data-state="0" data-key="U">U</button>
                <button class="key" data-state="0" data-key="I">I</button>
                <button class="key" data-state="0" data-key="O">O</button>
                <button class="key" data-state="0" data-key="P">P</button>
            </div>
            <div class="row">
                <button class="key" data-state="0" data-key="A">A</button>
                <button class="key" data-state="0" data-key="S">S</button>
                <button class="key" data-state="0" data-key="D">D</button>
                <button class="key" data-state="0" data-key="F">F</button>
                <button class="key" data-state="0" data-key="G">G</button>
                <button class="key" data-state="0" data-key="H">H</button>
                <button class="key" data-state="0" data-key="J">J</button>
                <button class="key" data-state="0" data-key="K">K</button>
                <button class="key" data-state="0" data-key="L">L</button>
            </div>
            <div class="row">
                <button id="enter">Enter</button>
                <button class="key" data-state="0" data-key="Z">Z</button>
                <button class="key" data-state="0" data-key="X">X</button>
                <button class="key" data-state="0" data-key="C">C</button>
                <button class="key" data-state="0" data-key="V">V</button>
                <button class="key" data-state="0" data-key="B">B</button>
                <button class="key" data-state="0" data-key="N">N</button>
                <button class="key" data-state="0" data-key="M">M</button>

                <button id="backspace">⌫</button>
            </div>
        </div>
    </div>

</body>

<script>
    document.addEventListener("DOMContentLoaded", function () {
        const pop = document.getElementById('popp');
        function popFunction() {
            var popup = document.getElementById("myPopup");
            popup.classList.toggle("show");
        }
        pop.addEventListener('click', popFunction);
    });
</script>

