# -*- coding: utf-8 -*-
from os.path import join

from django.contrib import admin
from django.db import models
from django.conf import settings

from wireframes.models import Component, Wireframe, Project
from wireframes.widgets import CSSTextarea


class ComponentAdmin(admin.ModelAdmin):
    class Media:
        js = [join(settings.MEDIA_URL, path) for path in (
            'wireframes/codemirror/js/codemirror.js',
            'wireframes/js/jquery.js',
            'wireframes/js/admin.js',
        )]
        css = {
            'all': [join(settings.MEDIA_URL, path) for path in (
                'wireframes/css/admin.css',
            )]
        }
    class Meta:
        model = Component

    formfield_overrides = {
        models.TextField: {'widget': CSSTextarea},
    }

class WireframeAdmin(admin.ModelAdmin):
    pass

class ProjetAdmin(admin.ModelAdmin):
    pass


admin.site.register(Project)
admin.site.register(Wireframe)
admin.site.register(Component, ComponentAdmin)
