from wireframes.models import Wireframe, Revision, Component, Project
from wireframes.forms import CreateWireframeForm
from django.http import HttpResponseRedirect, HttpResponse
from django.urls import reverse
from django.shortcuts import render

def home(request):
    if request.POST:
        form = CreateWireframeForm(request.POST)
        if form.is_valid():
            wireframe = form.save()
            return HttpResponseRedirect(reverse('wireframes-edit',
                    args=[wireframe.id]))
    else:
        form = CreateWireframeForm()
    return render(request, 'wireframes/home.html', locals())

def create(request, project_id):
    project = Project.objects.get(pk=int(project_id))
    wireframe = Wireframe(author=request.user, project=project)
    if request.POST:
        form = CreateWireframeForm(request.POST, instance=wireframe)
        if form.is_valid():
            wireframe = form.save()
            return HttpResponseRedirect(reverse('wireframes-edit',
                args=None, kwargs={"project_id":int(wireframe.project.id),
                "wireframe_id":int(wireframe.id)}))
    else:
        form = CreateWireframeForm(instance=wireframe)
    return render(request, 'wireframes/create.html', locals())

def edit(request, wireframe_id):
    wireframe = Wireframe.objects.get(pk=int(wireframe_id))
    try:
        last_revision = Revision.objects.filter(
                wireframe=wireframe).latest('creation_date')
    except Revision.DoesNotExist:
        pass
    components = Component.objects.all()
    return render(request, 'wireframes/edit.html', locals())

def save(request, wireframe_id):
    wireframe = Wireframe.objects.get(pk=int(wireframe_id))
    revision = Revision(wireframe=wireframe)
    revision.content = request.POST['content']
    revision.save()
    return HttpResponse('Wireframe saved')