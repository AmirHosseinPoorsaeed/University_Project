import json
from django.shortcuts import get_object_or_404, redirect, render
from django.views.decorators.http import require_POST

from cart.cart import Cart
from products.models import Product


def cart_detail_view(request):
    return render(request, 'cart/cart_detail.html')


@require_POST
def add_to_cart_view(request):
    cart = Cart(request)

    data = json.loads(request.body)
    product_id = data.get('product_id')
    size = data.get('size')
    price = data.get('price')
    quantity = data.get('quantity')

    product = get_object_or_404(Product, id=product_id)

    cart.add(product, price, size, quantity)

    return redirect('cart:cart_detail')


@require_POST
def remove_from_cart_view(request):
    cart = Cart(request)

    data = json.loads(request.body)
    product_id = data.get('product_id')

    print(product_id)

    product = get_object_or_404(Product, id=product_id)

    cart.remove(product)

    return redirect('cart:cart_detail')
