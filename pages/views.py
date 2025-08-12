from django.shortcuts import render
from django.views import generic


class HomePageView(generic.TemplateView):
    template_name = 'home.html'


class AboutUsPageView(generic.TemplateView):
    template_name = 'aboutus.html'


class ContactPageView(generic.TemplateView):
    template_name = 'contact.html'


class PolicyPageView(generic.TemplateView):
    template_name = 'policy.html'
