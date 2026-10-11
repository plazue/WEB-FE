document.addEventListener("DOMContentLoaded", function () {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const tbody = document.querySelector(".cart-table tbody");
    const subtotalRowSpan = document.querySelector(".subtotal-row span:last-child");
    const totalPriceSpan = document.querySelector(".total-price");

    if (cart.length === 0) {
        if (tbody) {
            tbody.innerHTML = `<tr><td colspan="3" style="text-align: center; padding: 40px; color: #666;">Giỏ hàng của bạn đang trống</td></tr>`;
        }
        if (subtotalRowSpan) subtotalRowSpan.innerText = "0₫";
        if (totalPriceSpan) totalPriceSpan.innerText = "0 VND";
        return;
    }

    let html = "";
    let subtotal = 0;

    cart.forEach((item, index) => {
        let itemTotal = item.price * item.quantity; // Đã thêm lại dấu * ở đây
        subtotal += itemTotal;

        let formattedItemTotal = itemTotal.toLocaleString('vi-VN') + "₫";

        html += `
            <tr>
                <td class="col-product">
                    <div class="product-info">
                        <img src="${item.image}" alt="${item.title}">
                        <div>
                            <a href="#" class="product-title">${item.title}</a>
                            <span class="product-price">${item.priceFormatted}</span>
                        </div>
                    </div>
                </td>
                <td class="col-quantity">
                    <input type="number" class="quantity-input" value="${item.quantity}" min="1" data-index="${index}">
                    <a href="#" class="remove-btn" data-index="${index}">Xóa</a>
                </td>
                <td class="col-total">${formattedItemTotal}</td>
            </tr>
        `;
    });

    if (tbody) {
        tbody.innerHTML = html;
    }

    let formattedSubtotal = subtotal.toLocaleString('vi-VN') + "₫";
    let formattedTotalVND = subtotal.toLocaleString('vi-VN') + " VND";

    if (subtotalRowSpan) subtotalRowSpan.innerText = formattedSubtotal;
    if (totalPriceSpan) totalPriceSpan.innerText = formattedTotalVND;

    // Thay đổi số lượng trực tiếp trên input
    const quantityInputs = document.querySelectorAll(".quantity-input");
    quantityInputs.forEach(input => {
        input.addEventListener("change", function () {
            let index = this.getAttribute("data-index");
            let newQty = parseInt(this.value);
            if (newQty < 1 || isNaN(newQty)) {
                newQty = 1;
            }
            cart[index].quantity = newQty;
            localStorage.setItem("cart", JSON.stringify(cart));
            location.reload();
        });
    });

    // Xóa sản phẩm
    const removeBtns = document.querySelectorAll(".remove-btn");
    removeBtns.forEach(btn => {
        btn.addEventListener("click", function (e) {
            e.preventDefault();
            let index = this.getAttribute("data-index");
            cart.splice(index, 1);
            localStorage.setItem("cart", JSON.stringify(cart));
            location.reload();
        });
    });
});