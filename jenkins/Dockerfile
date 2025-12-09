FROM jenkins/jenkins

USER root

# Instalar Docker CLI dentro del contenedor Jenkins
RUN apt-get update && \
    apt-get install -y docker.io && \
    rm -rf /var/lib/apt/lists/*

USER jenkins

# Pre-instalar plugins
RUN jenkins-plugin-cli --plugins \
    git \
    pipeline-stage-view \
    docker-workflow \
    maven-plugin \
    nodejs \
    workflow-aggregator \
    credentials-binding