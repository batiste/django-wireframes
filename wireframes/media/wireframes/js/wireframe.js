
if(!window.console) {
    window.console = {
        log: function() {
            $('#log').append(Array.prototype.slice.call(arguments).join(", ")+"<br>");
        }
    }
}

$(document).ready( function() {

    /*$('#editor').selectable({
        selected: function(event, ui) {alert('oki')}
    });*/
    var selected_block = false;

    var blocks = $('.block');

    // should be set to the max of all the block
    zindex = 5;


    $(window).keydown(function(e) {
        var step = (columns_width + columns_spacing) / 10;
        // delete key
        if(e.keyCode==46 || e.keyCode==8) {
            var parent = $(selected_block).parents()[0];
            var prev = $(selected_block).prev()[0]
            $.commands.add_delete_command(selected_block, parent, prev);
            $.commands.do_last_command();
        }
        // on top
        if(e.keyCode==38 && e.ctrlKey) {
            zindex ++;
            $(selected_block).css('z-index', zindex);
            return false;
        };
        // enlarge width
        if(e.keyCode==39 && e.ctrlKey) {
            var t = Math.max(0, parseInt($(selected_block).css('width')) + step);
            $(selected_block).css('width', t + 'px');
            return false;
        }
        // reduce width
        if(e.keyCode==37 && e.ctrlKey) {
            var t = Math.max(0, parseInt($(selected_block).css('width')) - step);
            $(selected_block).css('width', t + 'px');
            return false;
        }
        
        // up
        if(e.keyCode==38) {
            var t = Math.max(0, parseInt($(selected_block).css('top')) - step);
            $(selected_block).css('top', t + 'px');
            return false;
        }
        //down
        if(e.keyCode==40) {
            var t = parseInt($(selected_block).css('top')) + step;
            $(selected_block).css('top', t + 'px');
            return false;
        }
        //left
        if(e.keyCode==37) {
            var t = Math.max(0, parseInt($(selected_block).css('left')) - step);
            $(selected_block).css('left', t + 'px');
            return false;
        }
        //right
        if(e.keyCode==39) {
            var t = parseInt($(selected_block).css('left')) + step;
            $(selected_block).css('left', t + 'px');
            return false;
        }
    });

    $('#editor').click(function(e) {

        var block = $(e.target).closest('.block');
        $(selected_block).removeClass("selected");
        if(!block.length) {
            return true
        }

        var el = block[0];

        selected_block = el;
        $(el).addClass("selected");
        $(el).focus();

        $('#properties').empty();
        var on_top = $('<input type="button" value="On top (Ctrl+⇧)" id="on-top" />');
        $('#properties').append(on_top);
        on_top.click( function(event) {
            zindex ++;
            $(selected_block).css('z-index', zindex);
        });

        var delete_b = $('<input type="button" value="Delete block" id="delete-block" />');
        $('#properties').append(delete_b);
        delete_b.click( function() {
            var parent = $(selected_block).parents()[0];
            var prev = $(selected_block).prev()[0]
            $.commands.add_delete_command(selected_block, parent, prev);
            $.commands.do_last_command();
        });
        
        
        $('#properties-title').html(el.title);
        var l = $('<p><label>Title</label><input type="text" name="title" value="'+el.title+'" /></p>');
        $('#properties').append(l);
        $('input', l).bind("change", function(e) {
            el.title=this.value;
        });
        
        var check = $(el).hasClass('snap-to-grid') ? 'checked="checked"' : '';
        var l = $('<p><label for="snap">Snap to grid</label><input type="checkbox" id="snap" '+check+' /></p>');
        $('input', l).bind("change", function(e) {
            if(this.checked)
                $(el).addClass('snap-to-grid');
            else
                $(el).removeClass('snap-to-grid');
        });
        $('#properties').append(l);

        var pixels_property = ['width','top','left'];
        for (var p in pixels_property) {
            var prop = pixels_property[p];
            var l = $('<p class="number"><label>'+prop+'</label><input type="text" name="'+prop+'" value="'+parseInt(el.style[prop])+'" />px</p>');
            $('#properties').append(l);

            $('input', l).bind("keydown", prop, function(e) {
                var v = parseInt(this.value, 10)
                if(v<0)
                    v = 0
                if(e.keyCode == 40)
                    this.value = v-1
                if(e.keyCode == 38)
                    this.value = v+1
            });

            $('input', l).bind("keyup", prop, function(e) {
                el.style[e.data]=parseInt(this.value, 10)+'px';
            });
        }

        var content = $('<p><label>Content</label><br><textarea>'+$('.content', el).text()+'</textarea></p>');
        $('textarea', content).bind("keyup", prop, function(e) {
            var compo_id = parseInt(el.className.match(/component-([0-9]+)/)[1]);
            var component = get_component_by_id(compo_id);
            $('.content', el).text(this.value);
            // possible XSS here
            if(component.display) {
                $('.display', el).html(component.display(this.value));
            };
        });
        $('#properties').append(content);

        return false;
    });


    $('#undo').click( function(event) {
        $.commands.undo();
    });

    $('#redo').click( function(event) {
        $.commands.redo();
    });
    
    var drawGrid = function() {
        var gv = $('#grid-view');
        if(!gv.length)
            return;
        
        // don't recreate the grid if already present
        $('.columns', gv).remove();
        $('.spacing', gv).remove();
        
        var total = nb_columns * columns_width + (nb_columns-1) * columns_spacing;
        $('#total-width').val(total);
        for(var i=0; i<nb_columns-1;i++) {
            gv.append($('<div class="columns" style="width:'+columns_width+'px">\
                </div><div class="spacing" style="width:'+columns_spacing+'px"></div>'));
        }
        gv.append($('<div class="columns" style="width:'+columns_width+'px"></div>'));
    }
    drawGrid();

});