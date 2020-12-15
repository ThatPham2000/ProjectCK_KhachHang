/*price range*/

if ($.fn.slider) {
    $('#sl2').slider();
}

var RGBChange = function () {
    $('#RGB').css('background', 'rgb(' + r.getValue() + ',' + g.getValue() + ',' + b.getValue() + ')')
};

/*scroll to top*/

$(document).ready(function () {
    $(function () {
        $.scrollUp({
            scrollName: 'scrollUp', // Element ID
            scrollDistance: 300, // Distance from top/bottom before showing element (px)
            scrollFrom: 'top', // 'top' or 'bottom'
            scrollSpeed: 300, // Speed back to top (ms)
            easingType: 'linear', // Scroll to top easing (see http://easings.net/)
            animation: 'fade', // Fade, slide, none
            animationSpeed: 200, // Animation in speed (ms)
            scrollTrigger: false, // Set a custom triggering element. Can be an HTML string or jQuery object
            //scrollTarget: false, // Set a custom target element for scrolling to the top
            scrollText: '<i class="fa fa-angle-up"></i>', // Text for element, can contain HTML
            scrollTitle: false, // Set a custom <a> title if required.
            scrollImg: false, // Set true to use image
            activeOverlay: false, // Set CSS color to display scrollUp active point, e.g '#00FFFF'
            zIndex: 2147483647 // Z-Index for the overlay
        });
    });
});

$(".add-to-cart").click(function (e) {
    e.preventDefault();
    const slugName = $(this).attr("value");

    $.post(`/cart/${slugName}`, {}, function (data, status) {
      if (data.msg === "success" && status === "success") {
        const curCount = parseInt(
          $(".cart-count-add").html().replace(/[()]/g, "")
        );

        $(".cart-count-add").html(`(${curCount + 1})`);
      }
    });
  });




 // Update cart
 $(".cart_quantity_change").click(function (e) {
    e.preventDefault();
    
    const value = $(this).attr("value");
    const slugName = $(this).attr("name");
    
  
    if (parseInt(value) === 0) {
      const re = confirm("Bạn chắc chắn muốn xóa vật phẩm khỏi giỏ hàng ?");
      if (re == false) return false;
      $(this).parent().parent().css("display", "none");
    }

    const request = $.ajax({
      url: `/cart/${slugName}`,
      data: JSON.stringify({
        bias: parseInt(value),
      }),
      type: "PUT",
      contentType: "application/json",
      processData: false,
      xhr: function () {
        return window.XMLHttpRequest == null ||
          new window.XMLHttpRequest().addEventListener == null
          ? new window.ActiveXObject("Microsoft.XMLHTTP")
          : $.ajaxSettings.xhr();
      },
    });

    request.done(function (data, status) {
      if (data.msg === "success" && status === "success") {
        data.data.items.forEach((item) => {
          $(`.${item.itemId}`).html(item.total);

          $(`.${item.itemId}_price`).val(item.quantity);

          if (item.checkItem === 0){
            $(`.${item.itemId}_btn-minus`).attr("disabled", true);
          }
          else{
            $(`.${item.itemId}_btn-minus`).attr("disabled", false );
          }
        });

        $(".totalCost").html(data.data.totalCost);

       
        $(".totalCost").html(
          data.data.totalQuantity
            ? (data.data.totalCost)
            : 0
        );
        $(".cart-count-add").html(
          data.data.totalQuantity ? `(${data.data.totalQuantity})` : `(0)`
        );
      }
    });
  });



