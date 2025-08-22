from django.urls import path

from . import views


app_name = 'cart'

urlpatterns = [
    path('', views.cart_detail_view, name='cart_detail'),
    path('add/', views.add_to_cart_view, name='cart_add'),
    path('remove/', views.remove_from_cart_view, name='cart_remove'),

]