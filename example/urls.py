# -*- coding: utf-8 -*-
from django.urls import path, include
from wireframes.views import home
from django.conf import settings
from wireframes import urls as wireframes_urls
from django.conf.urls.static import static

# Uncomment the next two lines to enable the admin:
from django.contrib import admin

urlpatterns = [
    # Example:
    path(r'^$', home),
    path(r'^w/', include(wireframes_urls)),
    # Uncomment the next line to enable the admin:
    path(r'^admin/', admin.site.urls)
]

urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
