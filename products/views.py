from django.shortcuts import render, get_object_or_404

from products.models import Product


def product_detail(request, pk):
    product = get_object_or_404(Product, pk=pk)
    variations = product.variants.all()
    return render(request, 'products/detail.html', {
        'product': product,
        'variations': variations,
    })
