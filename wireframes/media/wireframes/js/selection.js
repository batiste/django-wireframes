$(document).ready( function() {

var selection = function() {
    
        elements = [];
        var add = function(el) {
            elements.push(el);
            $(el).addClass('selected');
            $.draw_selection();
        }
        var del = function(el) {
            for(var i=0; i<elements.length; i++) {
                if(elements[i]==el)
                    elements.splice(i,1);
            }
        }
        var is_in = function(el) {
            for(var i=0; i<elements.length; i++) {
                if(elements[i]===el)
                    return true;
            }
        }
        var empty = function() {
            $(elements).removeClass('selected');
            elements = [];
            $.draw_selection();
        }
        var del = function() {
            $(elements).remove();
            elements = [];
        }
        var getLast = function() {
            return elements[elements.length-1];
        }
        var getElements = function() {
            return elements;
        }
        return {
            add:add,
            del:del,
            isIn:is_in,
            empty:empty,
            del:del,
            getLast:getLast,
            getElements:getElements,
        }
    }();

    $.selection = selection;
    
});