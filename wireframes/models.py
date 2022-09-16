# -*- coding: utf-8 -*-
from django.db import models
from django.contrib.auth.models import User

class Project(models.Model):
    """(Project description)"""

    admin = models.ForeignKey(User, related_name='selfs_as_admin', null=True, on_delete=models.CASCADE)
    members = models.ManyToManyField(User, related_name='selfs_as_member')

    name = models.CharField(blank=False, max_length=255)
    grid_width = models.PositiveIntegerField(default="50")
    grid_spacing = models.PositiveIntegerField(default="10")
    grid_columns = models.PositiveIntegerField(default="16")

    def total_width(self):
        return self.grid_columns * self.grid_width + (self.grid_spacing * self.grid_columns-1)

    def __str__(self):
        return "%s" % (self.name)

    def get_absolute_url(self):
        return 'not done'

    def save(self):
        super(Project, self).save()

class Wireframe(models.Model):
    """(Project description)"""

    author = models.ForeignKey(User, null=True, on_delete=models.DO_NOTHING)
    project = models.ForeignKey(Project, null=True, on_delete=models.DO_NOTHING)
    name = models.CharField(blank=False, max_length=255)
    creation_date = models.DateTimeField(auto_now=True)
    #model = models.ForeignKey(Wireframe, null=True)
    grid_width = models.PositiveIntegerField(default="50")
    grid_spacing = models.PositiveIntegerField(default="10")
    grid_columns = models.PositiveIntegerField(default="16")

    def total_width(self):
        return (self.grid_columns * self.grid_width) + (self.grid_spacing *
                                        (self.grid_columns-1))


    def __str__(self):
        return "wireframe %s %d" % (self.name, self.id)

    def save(self):
        super(Wireframe, self).save()

class Component(models.Model):
    """(Component description)"""

    author = models.ForeignKey(User, null=True, blank=True, on_delete=models.DO_NOTHING)
    project = models.ForeignKey(Project, null=True, blank=True, on_delete=models.DO_NOTHING)
    name = models.CharField(blank=False, max_length=255)
    creation_date = models.DateTimeField(auto_now=True)

    default_content = models.TextField(blank=True)
    javascript = models.TextField()
    css = models.TextField(blank=True)

    def css_out(self):
        rules = ""
        r_list = self.css.strip().split('}')
        for r in r_list:
            if r.strip():
                rules += ".component-%d %s }\n" % (self.id , r.strip())
        return rules

    def __str__(self):
        return "Component %s" % (self.name)

class Revision(models.Model):

    author = models.ForeignKey(User, null=True, on_delete=models.DO_NOTHING)
    wireframe = models.ForeignKey(Wireframe, on_delete=models.DO_NOTHING)
    creation_date = models.DateTimeField(auto_now=True)
    content = models.TextField()

    def __str__(self):
        return "%s" % (self.wireframe)

    def save(self):
        super(Revision, self).save()
