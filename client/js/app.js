(function () {
  const orderIdField = document.getElementById("order-id");
  const productIdField = document.getElementById("product-id");
  const quantityField = document.getElementById("quantity");
  const subtotalField = document.getElementById("subtotal");
  const shippingAddressField = document.getElementById("shippingAddress");
  const shippingZipField = document.getElementById("shippingZip");
  const totalField = document.getElementById("total");

  function displayError(err) {
    alert("Error:" + err);
  }

  function onComputeButton() {
    const data = {
      order_id: parseFloat(orderIdField.value),
      product_id: parseFloat(productIdField.value),
      quantity: parseFloat(quantityField.value),
      subtotal: parseFloat(subtotalField.value),
      shipping_address: shippingAddressField.value,
      shipping_zip: shippingZipField.value,
      total: 0.0,
    };

    fetch("http://localhost:8002/compute", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-type": "application/json" },
    })
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        if (json.error) {
          displayError(json.error);
          return;
        }
        updateOrderForm(json);
      });
  }

  function updateOrderForm(json) {
    totalField.value = json.total;
  }

  document.getElementById("compute").addEventListener("click", onComputeButton);
})();
