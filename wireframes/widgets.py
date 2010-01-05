# -*- coding: utf-8 -*-
"""Wireframes admin widgets"""
from os.path import join
from django.conf import settings
from django.forms import TextInput, Textarea, HiddenInput, FileInput
from django.utils.safestring import mark_safe
from django.template.loader import render_to_string
from django.forms import TextInput, Textarea, HiddenInput, FileInput

from django.conf import settings

class CSSTextarea(Textarea):
    """A RichTextarea widget."""
    class Media:
        js = [join(settings.MEDIA_URL, path) for path in (
            'wireframes/codemirror/js/codemirror.js',
        )]
        css = {
            'all': [join(settings.MEDIA_URL, path) for path in (
                'wireframes/codemirror/css/csscolors.css',
                'wireframes/codemirror/css/jscolors.css',
                #'wireframes/codemirror/css/docs.css',
                
            )]
        }

    def __init__(self, attrs=None):
        #attrs = {'class': 'rte'}
        super(Textarea, self).__init__(attrs)
