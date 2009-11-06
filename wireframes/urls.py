# -*- coding: utf-8 -*-
from django.conf.urls.defaults import *

urlpatterns = patterns('wireframes.views',
    #url(r'^$', 'home', name="wireframes-home"),
    url(r'^create/$', 'create', name="wireframes-create"),
    url(r'^(?P<wireframe_id>[0-9]+)/edit/$', 'edit', name="wireframes-edit"),
    url(r'^(?P<wireframe_id>[0-9]+)/save/$', 'save', name="wireframes-save"),
)
