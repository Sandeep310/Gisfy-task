pipeline {
    agent any

    environment {
        DOCKER_USERNAME = "sndeep310"
        IMAGE_TAG = "${BUILD_NUMBER}"
    }

    stages {

        stage('Checkout Source') {
            steps {
                checkout scm
            }
        }

        stage('Docker Login') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    sh '''
                        echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin
                    '''
                }
            }
        }

        stage('Build Backend Image') {
            steps {
                sh """
                docker build \
                -t ${DOCKER_USERNAME}/backend:${IMAGE_TAG} \
                ./backend
                """
            }
        }

        stage('Build Frontend Image') {
            steps {
                sh """
                docker build \
                -t ${DOCKER_USERNAME}/frontend:${IMAGE_TAG} \
                ./frontend
                """
            }
        }

        stage('Build PostgreSQL Image') {
            steps {
                sh """
                docker build \
                -t ${DOCKER_USERNAME}/postgres-db:${IMAGE_TAG} \
                ./database
                """
            }
        }

        stage('Trivy Scan Backend') {
            steps {
                sh "trivy image --severity HIGH,CRITICAL ${DOCKER_USERNAME}/backend:${IMAGE_TAG}"
            }
        }

        stage('Trivy Scan Frontend') {
            steps {
                sh "trivy image --severity HIGH,CRITICAL ${DOCKER_USERNAME}/frontend:${IMAGE_TAG}"
            }
        }

        stage('Trivy Scan PostgreSQL') {
            steps {
                sh "trivy image --severity HIGH,CRITICAL ${DOCKER_USERNAME}/postgres-db:${IMAGE_TAG}"
            }
        }

        stage('Push Docker Images') {
            steps {

                sh "docker push ${DOCKER_USERNAME}/backend:${IMAGE_TAG}"

                sh "docker push ${DOCKER_USERNAME}/frontend:${IMAGE_TAG}"

                sh "docker push ${DOCKER_USERNAME}/postgres-db:${IMAGE_TAG}"

            }
        }

        stage('Update Kubernetes Manifests') {
            steps {

                sh """

                sed -i 's|image: sndeep310/backend:.*|image: sndeep310/backend:${IMAGE_TAG}|' kubernetes/backend/backend-deployment.yaml

                sed -i 's|image: sndeep310/frontend:.*|image: sndeep310/frontend:${IMAGE_TAG}|' kubernetes/frontend/frontend-deployment.yaml

                sed -i 's|image: sndeep310/postgres-db:.*|image: sndeep310/postgres-db:${IMAGE_TAG}|' kubernetes/database/postgres-deployment.yaml

                """

            }
        }

        stage('Commit Updated Manifests') {
            steps {

                sh """

                git config user.name "Jenkins"

                git config user.email "jenkins@local"

                git add .

                git commit -m "Updated image tag to ${IMAGE_TAG}" || true

                git push origin main

                """

            }
        }

    }

    post {

        always {

            sh 'docker image prune -af || true'

        }

        success {

            echo "Pipeline completed successfully."

            echo "Images tagged with version ${IMAGE_TAG}"

            echo "ArgoCD will automatically deploy the new version."

        }

        failure {

            echo "Pipeline failed."

        }
    }
}