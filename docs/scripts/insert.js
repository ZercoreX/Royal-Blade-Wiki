let page_meta = document.querySelector("meta[name='page']");

if (page_meta.content != "home") {
    $(document).ready(function() {
        $.get('index.html', function(data) {
            const tempDiv = $('<div>').html(data);

            const ghost_container_top = tempDiv.find('.ghost-container.top');
            const ghost_container_bottom = tempDiv.find('.ghost-container.bottom');
            
            $('.ghost-container.top').replaceWith(ghost_container_top);
            $('.ghost-container.bottom').replaceWith(ghost_container_bottom);

            tempDiv.remove();
        });
    });
;}