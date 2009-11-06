from wireframes.models import Wireframe, Project
from django.forms import ModelForm
from django import forms

"""class CreateWireframeForm(DecoratingModelForm):
    class Meta:
        model=Wireframe
        fields=('name', 'project')"""

class CreateWireframeForm(ModelForm):
    name = forms.CharField(initial="New wireframe")
    grid_width = forms.IntegerField(min_value=12, initial=70)
    grid_spacing = forms.IntegerField(min_value=0, initial=10)
    grid_columns = forms.IntegerField(min_value=1, max_value=100, initial=12)
    class Meta:
        model=Wireframe
        fields=('name', 'grid_width', 'grid_spacing', 'grid_columns')

class CreateProjectForm(ModelForm):
    name = forms.CharField(initial="boum")
    grid_width = forms.IntegerField(min_value=12)
    grid_spacing = forms.IntegerField(min_value=0)
    grid_columns = forms.IntegerField(min_value=1, max_value=100)
    class Meta:
        model=Project
        fields=('name', 'grid_width', 'grid_spacing', 'grid_columns')

