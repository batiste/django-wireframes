{"display": function(content) {
    inputs = content.split("\n");

    var is_right_aligned = function(line) {
        var ra = line.match('^   ')
        if(ra)
            return true;
            
    }
    var result = "";
    for(input_index in inputs) {
        if(inputs[input_index]) {

            var line = inputs[input_index];
            var find_syntax = true;
            if(is_right_aligned(line))
                result += '<li style="text-align:right">'
            else
                result += '<li>'
            while(find_syntax) {
                find_syntax = false;
                var select_rx  = line.match('([^:]+):(.*)')

                if(select_rx) {
                    var opts = select_rx[2].split(',');
                    result = result + '<label>'+select_rx[1]+'</label><select>';
                    for(opt_index in opts)
                    result += '<option>'+opts[opt_index]+'</option>';
                    result = result+'</select></li>';
                    line = line.replace(select_rx[0], '');
                    find_syntax = true
                };

                var button_rx = line.match('\\{([^\\}]+)\\}');

                if(button_rx) {
                    result += '<input type=button value="'+button_rx[1]+'">';
                    line = line.replace(button_rx[0], '');
                    find_syntax = true
                }
                var textarea_rx = line.match('\\[([^\\]]+)\\]');

                if(textarea_rx) {
                    result += '<textarea>'+textarea_rx[1]+'</textarea>';
                    line = line.replace(textarea_rx[0], '');
                    find_syntax = true
                };

            };
            if(!select_rx && !button_rx && !textarea_rx && $.trim(line))
                result += '<label>'+line+'</label><input type=text>';
            result += '</li>'
        }
    };
    return '<ul>' + result + '</ul>'
}};