
$.commands = function() {
    var undo_list = [];
    var redo_list = [];
    var make_command = function(f_do, f_undo) {
        return {redo:f_do,undo:f_undo};
    }
    var add_command = function(c) {
        undo_list.push(c);
        redo_list = [];
    }
    var undo = function() {
        var c = undo_list.pop();
        if(c) {
            redo_list.push(c);
            c.undo();
        }
    }
    var redo = function() {
        var c = redo_list.shift();
        if(c) {
            undo_list.push(c);
            c.redo();
        }
    }
    var do_last_command = function() {
        var c = undo_list[undo_list.length-1];
        c.redo();
    }

    var add_move_command = function(element, new_x, new_y, old_x, old_y) {
        add_command(
            make_command(
                function() { element.style['left']=new_x+'px';element.style['top']=new_y+'px'; },
                function() { element.style['left']=old_x+'px';element.style['top']=old_y+'px'; }
            )
        );
    }

    var add_drop_component = function(component, source, target) {
        add_command(
            make_command(
                function() { $($('.content, .component', target)[0]).append(component); },
                function() { 
                    console.log(source);
                    if(source==undefined)
                        component.remove();
                    else
                        $($('.content', source)[0]).append(component);
                }
            )
        );
    }

    var add_resize_command = function(element, new_w, new_h, old_w, old_h) {
        add_command(
            make_command(
                function() { element.style['width']=new_w+'px';element.style['height']=new_h+'px'; },
                function() { element.style['width']=old_w+'px';element.style['height']=old_h+'px'; }
            )
        );
    }

    var add_delete_command = function(element, parent, prev) {
        add_command(
            make_command(
                function() { $(element).remove(); },
                function() {
                    if(prev)
                        $(element).insertAfter(prev);
                    else
                        $(parent).append(element);
                }
            )
        );
    }

    return {
        add_move_command:add_move_command,
        add_resize_command:add_resize_command,
        add_delete_command:add_delete_command,
        add_drop_component:add_drop_component,
        do_last_command:do_last_command,
        undo:undo,
        redo:redo,
    }
}();
