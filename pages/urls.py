from django.urls import path

from . import views


app_name = 'pages'

urlpatterns = [
    path('', views.HomePageView.as_view(), name='home'),
    path('aboutus/', views.AboutUsPageView.as_view(), name='aboutus'),
    path('contact/', views.ContactPageView.as_view(), name='contact'),
    path('policy', views.PolicyPageView.as_view(), name='policy')
]
