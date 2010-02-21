====================================
wireframes - A simple wireframe tool
====================================

:Version: 0.0.1

Introduction
============

Wireframes provide a simple way to create and save wireframes.

A user with admin access will be able to create new components to use
in the wireframes. Components are a mix of Javascript and CSS.

The project come with 5 very simple example components that are avaible
in the fixtures.

A user with no rights will be able to create and modify his wireframes.

Quicky test the application
===========================

First install django::

    $ easy_install django

Then you will be able to run the example project::

    $ cd example/
    $ python manage.py syncdb
    $ python manage.py runserver

Install
=======

Add wireframes to your installed `INSTALLED_APPS` and
configure your media files to work.