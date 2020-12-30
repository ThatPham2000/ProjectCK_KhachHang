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

// Validator signup
$('body>section>div.container>div.sign-up>form')
.find('input')
.not('.name')
.click(function () {
  const curr = $(this);
  curr.next().addClass('d-none');
  curr.next().removeClass('d-block text-danger');
  curr.next().html('');
  $('#err-sign').addClass('d-none');
});

$('body>section>div.container>div.sign-up>form')
.find('input')
.blur(function () {
  if (!$(this).val()) {
    $(this).next().removeClass('d-none');
    $(this).next().addClass('d-block text-danger');

    $(this).next().html('Trường này là bắt buộc!');
    $(this).next().css('font-size', '12px');
    $(this).next().css('margin', '-10px 0 10px');
  }
});
$('input[name=password2]').blur(function (e) {
    const retype = $('input[name=password]').val();
    const pass = $(this).val();

    if (retype !== pass) {
      $(this).next().removeClass('d-none');
      $(this).next().addClass('d-block text-danger');

      $(this).next().html('Nhập lại mật khẩu không chính xác!');
      $(this).next().css('font-size', '12px');
      $(this).next().css('margin', '-10px 0 10px');
    }
});

$('#sign-up').one('click', function (e) {
    e.preventDefault();
    if ($('.d-block.text-danger').length) return;
    
    $(this).click();
});

$('input[name=password2]').click(function () {
const curr = $(this);
curr.next().addClass('d-none');
curr.next().removeClass('d-block text-danger');
});

// Form sign up check 
$('body>section>div.container>div.sign-up>form')
	.find('input')
	.not('.name')
	.each(function () {
		$(this).blur(function () {
			const curr = $(this);

			const key = curr.attr('name');
			const val = curr.val();
			if (!val) return;

			const url = '/buyer/checkSignup';
			$.post({
				url,
				data: JSON.stringify({ [key]: val }),
				contentType: 'application/json',
				dataType: 'json',
				success: function (data) {
					console.log(data);
					if (data.msg === 'error') {
						curr.next().removeClass('d-none');
						curr.next().addClass('d-block text-danger');

						curr.next().html(data[key]);
						curr.next().css('font-size', '12px');
						curr.next().css('margin', '-10px 0 10px');
					} else {
						// curr.css("border-color", "green");
						// curr.css("border-width", "2px");
						curr.next().addClass('d-none');
						curr.next().removeClass('d-block text-danger');
					}
				},
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



 // Upload avatar btn
 var readURL = function (input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {
      $(".profile-pic").attr("src", e.target.result);
    };

    reader.readAsDataURL(input.files[0]);
  }
};

$(".file-upload").on("change", function () {
  readURL(this);
});

$(".upload-button").on("click", function () {
  $(".file-upload").click();
});