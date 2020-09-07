#!/usr/bin/env python

import os
import sys

from fabric.api import *
from fabric.colors import *
from fabric.context_managers import *
from fabric.contrib.project import *

CWD = os.path.dirname(__file__)
PROJ_HOME = [CWD, '/srv/docker-files/nginx-hello']


def send_to_gcp():
    exclude_string = ' '.join(['--exclude {}'.format(exclude_item) for exclude_item in [
        '__pycache__','.git','*.log','tmp','temp','*.pyc'
    ]])
    rsync_project(
        local_dir=PROJ_HOME[0] + '/',
        remote_dir=PROJ_HOME[1],
        exclude=['__pycache__','.git','*.log','tmp','temp','*.pyc'],
        delete=True,
        extra_opts='--recursive'
    )

def docker_compose_pull():
    with cd(PROJ_HOME[1]):
        run('docker-compose pull')

def destroy_proj_dir():
    with settings(warn_only=True):
        run('rm -rf {}'.format(PROJ_HOME[1]))

def recreate_proj_dir():
    with settings(warn_only=True):
        run('mkdir -p {}'.format(PROJ_HOME[1]))

def destroy_recreate():
    destroy_proj_dir()
    recreate_proj_dir()

def docker_compose_kill_all():
    with cd(PROJ_HOME[1]):
        run('docker-compose kill')

def docker_compose_rm_all(container='all'):
    with cd(PROJ_HOME[1]):
        if container in ['all']:
            run('docker-compose rm')

def docker_compose_down():
    with cd(PROJ_HOME[1]):
        run('docker-compose down')

def docker_compose_up_nginx():
    with cd(PROJ_HOME[1]):
        run('docker-compose up -d helloworld')
        run('docker-compose up -d cron')
        run('docker-compose up -d nginx')

def docker_build_image():
    with cd(PROJ_HOME[1]):
        run('docker build -f Dockerfile . -t nginx_reverse_proxy')

def gen_dhparam():
    local('')

def test_helloworld():
    with cd(PROJ_HOME[1]):
        run('curl http://localhost:8001')
        # run('curl http://localhost')
        run('curl http://hello.louislabs.com')
        run('curl http://aboutme.louislabs.com')



@task
@hosts(['logic@aboutme.louislabs.com'])
def build_on_gcp():
    # destroy_recreate()
    send_to_gcp()

    # docker_build_image()
    # docker_compose_kill_all()
    # docker_compose_down()
    # docker_compose_pull()
    docker_compose_up_nginx()
    test_helloworld()

@task
def mon_and_build():
    local('find . | entr fab build_on_gcp')
