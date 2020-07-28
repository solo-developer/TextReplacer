
/*
   params :
          original_text : text that is to be replaced on every key provided
          replacementKVPs (list of dictionary) : array of Object that contains two properties (key and value)  in which key means a text to be replaced and value means the value that is to replace a key 
            
*/
function replaceText(text, replacementKVPs) {

    for (var i = 0; i < replacementKVPs.length; i++) {
        var currentKVP = replacementKVPs[i];
        if (currentKVP) {
            text = text.replace(new RegExp("{{" + currentKVP.key + "_key}}", "g"), currentKVP.value);
        }
    }
    text = removeAllTextsBetweenSeparator("{{", "}}", text);

    return text;
}

function removeAllTextsBetweenSeparator(starting_separator, ending_separator, text_to_remove) {
    var newTxt = text_to_remove.split(starting_separator);
    for (var i = 1; i < newTxt.length; i++) {

        var textBetweenSeparators = newTxt[i].split(ending_separator)[0];

        var stringToRemove = starting_separator + textBetweenSeparators + ending_separator;
        text_to_remove = text_to_remove.replace(new RegExp(stringToRemove, "g"), "");
    }
    return text_to_remove;
}

function areAllValuesFilled(id_selector) {
    var areAllDatasFilled = true;

    $('#' + id_selector).find("*").each(function () {
        var KVP = {};
        var id = $(this).attr('id');
            if (id != undefined && id != "") {
                if ($("#" + id).is("button")) {
                    return;
                }

                else if ($("#" + id).is("label")) {
                    return;
                }

                else if ($("#" + id).is("table")) {
                    return;
                }

                else if ($("#" + id).is("div")) {
                    return;
                }

                if ($("#" + id).val() == "") {
                    areAllDatasFilled = false;
                    return false;
                }
            }
    });

    return areAllDatasFilled;

}

function getIdAndValueInsideSpecifiedElement(id_selector) {
    var kvpCollection = [];

    $('#' + id_selector).find("*").each(function () {
        var KVP = {};
        var id = $(this).attr('id');
        if (id != undefined && id != "") {
            KVP.key = id;
            var inputType = $("#" + id).attr('type');
            KVP.value = $("#" + id).val();
            kvpCollection.push(KVP);
        }
    });
    return kvpCollection;
}

function replaceTextByReflection(original_text, id_selector) {
    var kvps = getIdAndValueInsideSpecifiedElement(id_selector);
    return replaceText(original_text, kvps);
}

function isInteger(value) {
    return /^\d+$/.test(value);
  }
