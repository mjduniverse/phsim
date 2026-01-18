const Editor = {
    canvas: document.querySelector("#editor-canvas"),
}

// Make editor object acessible by global scope
window.Editor = Editor;


Editor.canvas.width = window.innerWidth;
Editor.canvas.height = window.innerHeight;