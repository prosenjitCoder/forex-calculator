(function ($) {
  "use strict";

  /*==================================================================
    [ Focus Contact2 ]*/
  $(".input3").each(function () {
    $(this).on("blur", function () {
      if ($(this).val().trim() != "") {
        $(this).addClass("has-val");
      } else {
        $(this).removeClass("has-val");
      }
    });
  });

  /*==================================================================
    [ Chose Radio ]*/
  $("#radio1").on("change", function () {
    if ($(this).is(":checked")) {
      $(".exit-price-slide").slideDown(300);
      $(".entry-price-slide").slideUp(0);
      // $(".entry-price-slide").css("display", "none");
      // $(".exit-price-slide").css("display", "block");
    }
  });

  $("#radio2").on("change", function () {
    if ($(this).is(":checked")) {
      $(".exit-price-slide").slideUp(0);
      $(".entry-price-slide").slideDown(300);
      // $(".exit-price-slide").css("display", "none");
      // $(".entry-price-slide").css("display", "block");
    }
  });

  /*==================================================================
    [ Validate ]*/
  var entryPrice = $('.validate-input input[name="entryPrice"]');
  var swingPrice = $('.validate-input input[name="swingPrice"]');
  var atrValue = $('.validate-input input[name="atrValue"]');
  var accountSize = $('.validate-input input[name="accountSize"]');
  var takeProfit = $('.validate-input input[name="takeProfit"]');

  $(".validate-form").on("submit", function () {
    var check = true;

    if ($(swingPrice).val().trim() == "") {
      showValidate(swingPrice);
      check = false;
    }

    if ($(entryPrice).val().trim() == "") {
      showValidate(entryPrice);
      check = false;
    }

    if ($(atrValue).val().trim() == "") {
      showValidate(atrValue);
      check = false;
    }

    if ($(accountSize).val().trim() == "") {
      showValidate(accountSize);
      check = false;
    }

    if ($(takeProfit).val().trim() == "") {
      showValidate(takeProfit);
      check = false;
    }

    return check;
  });

  $(".validate-form .input3").each(function () {
    $(this).focus(function () {
      hideValidate(this);
    });
  });

  function showValidate(input) {
    var thisAlert = $(input).parent();

    $(thisAlert).addClass("alert-validate");
  }

  function hideValidate(input) {
    var thisAlert = $(input).parent();

    $(thisAlert).removeClass("alert-validate");
  }
})(jQuery);
