$(document).ready(function() {

    /* Helper function to return all the data- attributes from the element
     * and returns a hash of all elements
     */
    var parseDataAttrs = function(elem) {
        var hash = new Object();
        $.each($.grep(elem.attributes, 
                      function(attr, i) { return attr.name.match(/^data-/); }), 
               function() {
                   hash[this.name.replace(/^data-/, "")] = this.value;
               });
        return hash;
    };

    /* Helper function that dynamically gets the function given by the name
     * at the window level.
     */
    var getFunction = function(func_name) {
        if ( func_name == undefined || func_name === "" ) return null;

        var matches = func_name.match(/([\d\w]+)\.?([\d\w]+)?/);
        if ( matches[2] == undefined ) {
            var method_name = matches[1];
            return window[method_name];
        } else {
            var obj_name = matches[1];
            var method_name = matches[2];
            return window[obj_name].method_name;
        };
    };

    var request = function(options) {
        $.ajax($.extend({ url : options.url, type : 'get' }, options));
        return false;
    };

    /* Makes an AJAX link that makes GET request and uses result to 
     * update DOM element */
    $("a[data-remote]").live("click", 
        function(event) {
            var data = parseDataAttrs(this);
            if (data['remote'] == "false") {
                $("#" + data['update']).toggle("fast");
                return false;
            }

            if (data['update'] != null) {
                $("#" + data['update']).html("Loading...");
                var success_callback = function(response_html) {
                    $("#" + data['update']).html(response_html);
                };

                return request({ url : this.href,
                                 success : success_callback
                               });
                return false;
            } else if (data['update-success'] != null) {
                return request({ url : this.href,
                                 success : getFunction(data['update-success']),
                                 error : getFunction(data['update-failure']),
                                 dataType : "json"
                               });
                return false;
            }
            
            // should never get here, but will alert with data if it does
            alert(data.toSource());
            return false;
        });                      
     
    /* Makes a form make an ajax request */
    $("form[data-remote=true]").live("submit", 
        function(event) {
            var data = parseDataAttrs(this);
            $("#" + data['update']).html("Loading...");
            
            var success_callback = function(response_html) {
                $("#" + data['update']).html(response_html);
            };

            return request({ url : this.action, 
                             type : this.method, 
                             data : $(this).serialize(),
                             success : success_callback
                           });
        });

    /* Morphs license microformats */
    var licenseMorpher = function() {
        var type = $(this).attr("data-license");
        
        $(this).attr('href', licenseMorpher.licenses[type]["url"]);
        $(this).html("<img alt='" + licenseMorpher.licenses[type]["alt"] + 
                     "' border='0' src='" + licenseMorpher.licenses[type]["image"] + "' />");
    };
    licenseMorpher.licenses = { 
        gpl: { 
            url: "http://creativecommons.org/licenses/GPL/2.0/",
            image: "http://creativecommons.org/images/public/cc-GPL-a.png",
            alt: "CC-GNU GPL"
        },
        lgpl: {
            url: "http://creativecommons.org/licenses/LGPL/2.1/",
            image: "http://creativecommons.org/images/public/cc-LGPL-a.png",
            alt: "CC-GNU LGPL"
        },
        pd: { 
            url: "http://creativecommons.org/licenses/publicdomain/",
            image: "http://i.creativecommons.org/l/publicdomain/88x31.png",
            alt: "Creative Commons License"
        },
        cc0: {
            url: "http://creativecommons.org/publicdomain/zero/1.0/",
            image: "http://i.creativecommons.org/l/zero/1.0/88x31.png",
            alt: "CC0"
        }
    };
    $.each($("a[rel=license][data-license]"), licenseMorpher);
    
    /* Makes all preview buttons in previewable forms trigger a custom event 
     * called preview on the form */
    $("form input.preview").live("click",
        function(event) {
            // trigger the preview event in the surrounding closest parent form
            var form_elem = $(event.target).closest("form").trigger("preview");
        });

    toggleColor = function(form_element, input_field_name, color) {
        var css_selector = $(form_element).find("input[name=" + input_field_name + "]").val();
        $(css_selector).effect("highlight", 
                               { color: color },
                               3000);
    };

    $("form.previewable").live("preview", 
        function(event) {
            // TODO this function body here is application specific (refactor)
            toggleColor(event.target, "col[heading_selector]", "orange");
            toggleColor(event.target, "col[column_selector]", "yellow");
        });

});
