# -*- coding: utf-8 -*-
"""Page CMS page_tags template tags"""
from django import template
from django.utils.safestring import SafeUnicode, mark_safe
register = template.Library()

@register.filter
def escape_javascript_string(text):
    t = text.replace("\r\n", "\\r\\n")
    #t = t.replace("\r", "\\\n")
    return t
    #return mark_safe(t)
