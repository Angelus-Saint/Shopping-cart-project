// calculates the total price of all the items
// data required: item-price, item-qty

$(document).ready(function () {
  // assign an array that stores the prices of the items
  // var prices = [60,50,40,50,40,25,45,20,10,];
  var total = 0;

  var calculate = function () {
    // collet div of all item-qty and store in array qtys
    // var qtys = $('#item-list .item-qty input');
    var prices = $(".item-price");
    var qtys = $(".quantity");
    // qtys.splice(9,1);
    total = 0;

    for (i = 0; i < qtys.length; i++) {
      // convert the value of each element in qtys into number and
      // multiply by corresponding item price, then add to calculate
      var price = Number($(prices[i]).text().replace(/\$/, ""));
      var subtotal = Number($(qtys[i]).val()) * price;
      if (subtotal != 0) {
        $($(".item-subtotal")[i]).text("$" + subtotal);
      } else {
        $($(".item-subtotal")[i]).text("$--.--");
      }
      total += subtotal;
    }
    $("#total-price").text("$ " + total);
    var addspace = "";
    var spaces = total.toString();
    spaces = spaces.length;
    spaces = 12 - spaces;
    for (i = 0; i < spaces; i++) {
      addspace += " ";
    }
    if (total > 999999999999) {
      $("#display").val("Harry == Long").change();
    } else if (total != 0) {
      $("#display")
        .val("$" + addspace + total)
        .change();
    } else {
      $("#display").val("$  00").change();
    }

    return total;
  };

  function addNewItem(name, cost) {
    name = name.charAt(0).toUpperCase() + name.slice(1);
    $("#item-list").prepend(
      '<div class="row item"><div class="item-name col-xs-3">  ' +
        name +
        '</div> <div class="item-price col-xs-3"> $' +
        cost +
        '.00 </div> <div class="item-qty col-xs-3"> <label>QTY</label> <input class="quantity"> </div> <div class="col-xs-1"> <button class="remove"> Remove </button> </div> <div class="item-subtotal col-xs-2"> $--.-- </div> </div>'
    );
  }

  function sortItem() {
    var prices = $(".item-price");
    var names = $(".item-name");
    var priceName = [];
    for (i = 0; i < prices.length; i++) {
      var price = $(prices[i]).text().trim();
      var name = $(names[i]).text().trim();
      priceName.push([name, price]);
    }
    priceName.sort();
    console.log(priceName);
    for (i = 0; i < priceName.length; i++) {
      $($(".item-name")[i]).text(priceName[i][0]);
      $($(".item-price")[i]).text(priceName[i][1]);
    }
  }

  // var removeItem = function() {
  //   this.parents('.row').remove();
  // }
  $("body").delegate("#sort", "click", function (e) {
    sortItem();
  });
  $("body").delegate("#fork", "click", function (e) {
    addNewItem($("#name").val(), $("#cost").val());
  });

  $("body").delegate(".remove", "click", function (e) {
    $(this).parents(".row").remove();
    calculate();
  });

  $("body").delegate(".quantity", "keyup", function (e) {
    calculate();
  });

  $("body").delegate("#cost", "keydown", function (e) {
    if (e.which == 13) {
      addNewItem($("#name").val(), $("#cost").val());
    }
  });
});
