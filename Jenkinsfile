pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build') {
            steps {
                echo "Ejecutando fase de build..."
            }
        }

        stage('Tests') {
            steps {
                echo "Ejecutando tests..."
            }
        }

        stage('Archive') {
            steps {
                echo "Archivando artefactos..."
                archiveArtifacts artifacts: '**/*', fingerprint: true
            }
        }

        stage('Deploy') {
            steps {
                echo "Desplegando aplicación..."
            }
        }
    }
}
