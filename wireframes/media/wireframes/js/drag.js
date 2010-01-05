/**
* EasyDrag 1.4 - Drag & Drop jQuery Plug-in
*
* Thanks for the community that is helping the improvement
* of this little piece of code.
*
* For usage instructions please visit http://fromvega.com
*/

$(function($){

    // to track if the mouse button is pressed
    var isDragMouseDown = false;
    var isResizeMouseDown = false;
    var isComponent = false;

    // to track the current element being dragged
    var currentElement = null;

    // global position records
    var lastMouseX;
    var lastMouseY;
    var lastElemTop;
    var lastElemLeft;
    var lastElemWidth;
    var lastElemHeight;

    var lastDropTarget = false;
    var sourceTarget = false;
    var dropTargetCounter = 0;

    // returns the mouse (cursor) current position
    var getMousePosition = function(e) {
        if (e.pageX || e.pageY) {
            var posx = e.pageX;
            var posy = e.pageY;
        }
        else if (e.clientX || e.clientY) {
            var posx = e.clientX
            var posy = e.clientY
        }
        return { 'x': posx, 'y': posy };
    };

    // not finished
    var offset_snap_grip = function(opts, x_position) {
        var middle = opts.grid_width + opts.grid_spacing;
        var offset = x_position % middle + (opts.grid_spacing / 2);
        if(x_position < opts.grid_spacing / 2) {
            return -x_position;
        }
        if ((offset) < opts.grid_width/4) {
            return -(offset) + opts.grid_spacing / 2;
        }
        if ((offset) > (middle - opts.grid_width/4)) {
            return (middle - (offset)) - opts.grid_spacing / 2;
        }
        return 0;
    }

    // updates the position of the current element being dragged
    var updatePosition = function(e, opts) {
        var pos = getMousePosition(e);

        var _left = (pos.x - lastMouseX) + lastElemLeft;
        var _top = (pos.y - lastMouseY) + lastElemTop;
        
        if(_top<0)
            _top=0;
        if(_left<0)
            _left=0;

        if($(currentElement).hasClass('snap-to-grid')) {
            _left = _left + offset_snap_grip(opts, _left);
        }

        currentElement.style['top'] = _top + 'px';
        currentElement.style['left'] = _left + 'px';
    };

    var updateSize = function(e, opts) {
        var pos = getMousePosition(e);

        var _width = (pos.x - lastMouseX + lastElemWidth);
        var _height = (pos.y - lastMouseY + lastElemHeight);

        if(_width<50)
            _width=50;
        if(_height<20)
            _height=20;

        if($(currentElement).hasClass('snap-to-grid')) {
            _width = _width + offset_snap_grip(opts, _width);
        }

        currentElement.style['width'] = _width + 'px';
        currentElement.style['height'] = _height + 'px';
    };

    // block cache
    var blocks = [];
    
    var isInBlock = function(x, y) {
        //  dirty
        var found = false;
        for(var i=0; i<blocks.length; i++) {
            pos = blocks[i][1];
            var b = $(blocks[i][0]);
        }
        for(var i=0; i<blocks.length; i++) {
            if(blocks[i][0] != found)
                $(blocks[i][0]).removeClass('dropTarget');
        }
        return false;
    }

    // set children of an element as draggable and resizable
    $.fn.easydrag = function(opts) {

        return this.each(function() {

            // when the mouse is moved while the mouse button is pressed
            $(this).mousemove(function(e) {
                if(isDragMouseDown) {
                    updatePosition(e, opts);
                }
                else if(isResizeMouseDown) {
                    updateSize(e, opts);
                }
                return false;
            });
    
            // when the mouse button is released
            $(this).mouseup(function(e) {
                if(isDragMouseDown) {
                    $.commands.add_move_command(currentElement, parseInt(currentElement.style['left'], 10),
                        parseInt(currentElement.style['top'], 10), lastElemLeft, lastElemTop);
                }

                if(isResizeMouseDown) {
                    $.commands.add_resize_command(currentElement, parseInt(currentElement.style['width'], 10),
                        parseInt(currentElement.style['height'], 10), lastElemWidth, lastElemHeight);
                }

                isDragMouseDown = false;
                isResizeMouseDown = false;
            });

            // when an element receives a mouse press
            $(this).mousedown(function(e) {

                if($(e.target).hasClass('resize')) {
                    
                    var el = $(e.target).parents('.block')[0];

                    isResizeMouseDown = true;
                    currentElement = el;

                    var pos = getMousePosition(e);
                    lastMouseX = pos.x;
                    lastMouseY = pos.y;

                    lastElemWidth  = parseInt(el.style['width'], 10);
                    lastElemHeight = parseInt(el.style['height'], 10);
                    if(!lastElemHeight)
                        lastElemHeight = $(el).height();

                    updateSize(e, opts);
                    e.preventDefault();
                    return false;
                };

                var block = $(e.target).closest('.block');
                if(block.length) {

                    var el = block[0];

                    isDragMouseDown = true;
                    currentElement = el;

                    // retrieve positioning properties
                    var pos = getMousePosition(e);
                    lastMouseX = pos.x;
                    lastMouseY = pos.y;

                    lastElemLeft = el.offsetLeft;
                    lastElemTop  = el.offsetTop;

                    //updatePosition(e, opts);
                    e.preventDefault();
                    return false;
                };

                /*
                if(el) {
                    //$(el).css('position', 'absolute');

                    //blocks = [];

                    // block position cache
                    //var _blocks = $('.block');
                    //for(var i=0; i<_blocks.length; i++)
                    //    blocks.push([_blocks[i], $(_blocks[i]).offset()]);

                    isDragMouseDown = true;
                    currentElement = el;
                    
                    // retrieve positioning properties
                    var pos = getMousePosition(e);
                    lastMouseX = pos.x;
                    lastMouseY = pos.y;
                    
                    lastElemLeft = el.offsetLeft;
                    lastElemTop  = el.offsetTop;
                    
                    updatePosition(e, opts);
                };*/

                return true;
            });
        });
    };
});