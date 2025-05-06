const CURRENT_PAGE_META = document.querySelector("meta[name='page']");

$(document).ready(function () {
  $.get("/docs/Services/Home/index.html", function (data) {
    const tempDiv = $("<div>").html(data);

    // Replace the top and bottom snippet containers
    $(".snippet-container.top").replaceWith(tempDiv.find(".snippet-container.top"));
    $(".snippet-container.bottom").replaceWith(tempDiv.find(".snippet-container.bottom"));
  });
});
