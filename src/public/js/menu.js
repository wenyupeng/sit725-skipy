/* eslint-disable no-unused-vars */
function addToOrder(cardStr) {
  let card = JSON.parse(cardStr);
  let foodId = card.foodId;
  let count = sessionStorage.getItem(foodId);
  if (Object.is(count, null) || Object.is(count, undefined)) {
    return;
  }

  let order = sessionStorage.getItem("food_order");
  if (Object.is(order, null) || Object.is(order, undefined)) {
    order = new Map();
  } else {
    order = new Map(JSON.parse(order));
  }

  let detail = order.get(foodId);
  if (detail == "undefined" || !detail) {
    detail = {
      name: card.name,
      img: card.img,
      count: count,
    };
  } else {
    detail.count = parseInt(detail.count) + parseInt(count);
  }

  order.set(foodId, detail);

  sessionStorage.setItem("food_order", JSON.stringify(Array.from(order)));
  sessionStorage.removeItem(foodId);

  let sum = Array.from(order.values()).reduce(
    (sum, value) => parseInt(sum) + parseInt(value.count),
    0,
  );
  $("#orderCount").text(sum);
}

function ModifyCount(num, e, foodId) {
  const element = Array.from(e.parentNode.childNodes).find((node) => {
    return node.nodeType === 1;
  });

  let spanE = element.nextSibling.nextSibling;

  let originalVal = sessionStorage.getItem(foodId);
  if (originalVal == "undefined" || !originalVal) {
    originalVal = 0;
  }

  let val = parseInt(originalVal) + parseInt(num);
  if (val < 0) {
    val = 0;
  }
  spanE.innerText = val;
  sessionStorage.setItem(foodId, val);
}

$(document).ready(function () {
  $(".sidenav").sidenav();
  $(".tabs").tabs();

  console.log("ready");
});