# -*- coding: utf-8 -*-
from django.conf.urls.defaults import *
from wireframes.views import home
from django.conf import settings

# Uncomment the next two lines to enable the admin:
from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    # Example:
    (r'^$', home),
    (r'^w/', include('wireframes.urls')),
    # Uncomment the next line to enable the admin:
    url(r'^admin/', include(admin.site.urls))
)

if settings.DEBUG:
    urlpatterns += patterns('',
        # Trick for Django to support static files (security hole: only for Dev environement! remove this on Prod!!!)
        url(r'^media/wireframes/(?P<path>.*)$',
            'django.views.static.serve',
            {'document_root':settings.WIREFRAME_MEDIA_ROOT}),
        url(r'^admin_media/(?P<path>.*)$', 'django.views.static.serve',
            {'document_root': settings.ADMIN_MEDIA_ROOT}),
    )
