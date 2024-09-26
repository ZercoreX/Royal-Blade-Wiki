pageMeta = document.querySelector("meta[name='page']");
let inserted = false;

$(document).ready(function () {
    $.get('index.html', function (data) {
        const tempDiv = $('<div>').html(data);

        // Replace the top and bottom ghost containers
        $('.ghost-container.top').replaceWith(tempDiv.find('.ghost-container.top'));
        $('.ghost-container.bottom').replaceWith(tempDiv.find('.ghost-container.bottom'));

        inserted = true;
    });
});

async function insertScripts() {
    try {
        const response = await fetch('index.html');
        const data = await response.text();

        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = data;

        const sourceElement = tempDiv.querySelector('.ghost-container.scripts');
        const targetElement = document.querySelector('.ghost-container.bottom');

        if (sourceElement && targetElement) {
            const scripts = Array.from(sourceElement.getElementsByTagName('script'));
            const deferredScripts = [];

            for (let script of scripts) {
                if (script.defer) {
                    deferredScripts.push(script);
                } else {
                    await loadScript(script, targetElement);
                }
                script.remove();
            }

            for (let script of deferredScripts) {
                await loadScript(script, targetElement);
            }
        } else {
            console.error('Source or target element not found');
        }
    } catch (error) {
        console.error('Failed to load the other HTML file:', error);
    }
}

// Function to load a script and insert it into the DOM
function loadScript(script, targetElement) {
    return new Promise((resolve, reject) => {
        const newScript = document.createElement('script');

        // Copy attributes from the original script
        Array.from(script.attributes).forEach(attr => {
            newScript.setAttribute(attr.name, attr.value);
        });

        if (!script.src) {
            newScript.textContent = script.textContent;
            targetElement.parentNode.insertBefore(newScript, targetElement.nextSibling);
            resolve();
        } else {
            newScript.onload = resolve;
            newScript.onerror = reject;
            targetElement.parentNode.insertBefore(newScript, targetElement.nextSibling);
        }
    });
}

const checkInterval = setInterval(() => {
    if (inserted) {
        insertScripts();
        clearInterval(checkInterval); // Stop the interval once the scripts are inserted
    }
}, 100);