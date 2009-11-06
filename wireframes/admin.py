# -*- coding: utf-8 -*-
from django.contrib import admin
from wireframes.models import Component, Wireframe, Project

class ComponentAdmin(admin.ModelAdmin):
    pass

class WireframeAdmin(admin.ModelAdmin):
    pass

class ProjetAdmin(admin.ModelAdmin):
    pass


admin.site.register(Project)
admin.site.register(Wireframe)
admin.site.register(Component)
