pipeline {
    agent {
        docker {
            image 'node:14.19-alpine'

        }
    }

    environment {
        CI = "true"
    }

    stages {
        stage('Build') {
            steps {
                sh 'npm install'
            }
        }

        stage('Test') {
            steps {
                sh 'npm run test'
            }
        }


        stage('Deliver') {
            steps {
                sh 'echo TODO => Deliver'
            }
        }
    }
}
