# -*- coding: utf-8 -*-
from django.urls import path, include
from wireframes.views import create, edit, save

urlpatterns = [
    #url(r'^$', 'home', name="wireframes-home"),
    path(r'^create/$', create, name="wireframes-create"),
    path(r'^(?P<wireframe_id>[0-9]+)/edit/$', edit, name="wireframes-edit"),
    path(r'^(?P<wireframe_id>[0-9]+)/save/$', save, name="wireframes-save"),
]
