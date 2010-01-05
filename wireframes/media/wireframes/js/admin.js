


$(document).ready( function() {

var editor = CodeMirror.fromTextArea('id_css', {
    height: "400px",
    parserfile: "parsecss.js",
    stylesheet: "/media/wireframes/codemirror/css/csscolors.css",
    path: "/media/wireframes/codemirror/js/"
});


var editor = CodeMirror.fromTextArea('id_javascript', {
    height: "500px",
    parserfile: ["tokenizejavascript.js", "parsejavascript.js"],
    stylesheet: "/media/wireframes/codemirror/css/jscolors.css",
    path: "/media/wireframes/codemirror/js/"
});



var editor = CodeMirror.fromTextArea('id_default_content', {
    height: "150px",
    parserfile: ["tokenizejavascript.js", "parsejavascript.js"],
    stylesheet: "/media/wireframes/codemirror/css/jscolors.css",
    path: "/media/wireframes/codemirror/js/"
});


});