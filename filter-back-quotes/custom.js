function logToPage(msg) {
    document.getElementById("log").innerHTML += "<p>" + msg + "</p>"
}

function walkChildren(element) {
    logToPage("Element <b>'" + element.nodeName + "'</b> has " + element.children.length + " children element/s:");

    for (i = 0; i < element.children.length; i++) {
        child = element.children[i];
        logToPage("  - " + element.children[i].nodeName);
        logToPage("      > Inspecting <b>'" + child.nodeName + "'</b> element.");

        for (a = 0; a < child.attributes.length; a++) {
            attr = child.attributes[a];
            if (attr.value.includes('(') || attr.value.includes('`')) {
                logToPage("      > <b>Found attribute '" + attr.name + "' with bad simbols.</b> Removing it from the attribute.")
                child.setAttribute(attr.name, attr.value.replaceAll('(', '').replaceAll('`', ''));
            }
        }

        if (child.children.length > 0) {
            logToPage("Found children elements for <b>'" + child.nodeName + "'</b> element. Walking inside.");
            walkChildren(child);
        }
    }
}


var url = new URL(window.location.href);
var html = url.searchParams.get('html');
template = document.createElement("template");
template.innerHTML = html;

// sanitizing input
logToPage("Sanitizing the input string.")
walkChildren(template.content);
logToPage("All nodes are cleaned now.")
document.getElementById("rendered_html").innerHTML = template.innerHTML;

// payload debug
document.getElementById("original_html").innerHTML = html.replace(/</g, '&lt;');
document.getElementById("result_html").innerHTML = template.innerHTML.replace(/</g, '&lt;');
