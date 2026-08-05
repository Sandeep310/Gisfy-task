pipeline {
    agent any

    environment {
        DOCKER_USERNAME = "sndeep310"
        AWS_REGION = "ap-south-1"
        EKS_CLUSTER = "eks-cluster"
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
                sh 'docker build -t sndeep310/backend:latest ./backend'
            }
        }

        stage('Build Frontend Image') {
            steps {
                sh 'docker build -t sndeep310/frontend:latest ./frontend'
            }
        }

        stage('Build PostgreSQL Image') {
            steps {
                sh 'docker build -t sndeep310/postgres-db:latest ./database'
            }
        }

        stage('Trivy Scan Backend') {
            steps {
                sh 'trivy image --severity HIGH,CRITICAL sndeep310/backend:latest'
            }
        }

        stage('Trivy Scan Frontend') {
            steps {
                sh 'trivy image --severity HIGH,CRITICAL sndeep310/frontend:latest'
            }
        }

        stage('Trivy Scan PostgreSQL') {
            steps {
                sh 'trivy image --severity HIGH,CRITICAL sndeep310/postgres-db:latest'
            }
        }

        stage('Push Docker Images') {
            steps {
                sh 'docker push sndeep310/backend:latest'
                sh 'docker push sndeep310/frontend:latest'
                sh 'docker push sndeep310/postgres-db:latest'
            }
        }
        stage('Commit Updated Manifests') {
            steps {
            sh """
            git config user.name "Jenkins"
            git config user.email "jenkins@local"

            git add .

            git commit -m "Updated image tag to ${BUILD_NUMBER}" || true

            git push origin HEAD:main
        """
    }
}

        stage('Configure kubectl') {
            steps {
                withCredentials([[
                    $class: 'AmazonWebServicesCredentialsBinding',
                    credentialsId: 'aws-creds'
                ]]) {

                    sh '''
                        aws eks update-kubeconfig \
                        --region ap-south-1 \
                        --name eks-cluster
                    '''
                }
            }
        }

        stage('Deploy to EKS') {
            steps {
                sh '''
                    kubectl apply -f kubernetes/namespace.yaml
                    kubectl apply -f kubernetes/postgres-configmap.yaml

                    kubectl apply -f kubernetes/database/
                    kubectl apply -f kubernetes/backend/
                    kubectl apply -f kubernetes/frontend/
                    kubectl apply -f kubernetes/Ingress/
                '''
            }
        }

        stage('Verify Deployment') {
            steps {
                sh '''
                    kubectl rollout status deployment/postgres -n devops-app
                    kubectl rollout status deployment/backend -n devops-app
                    kubectl rollout status deployment/frontend -n devops-app

                    kubectl get pods -n devops-app
                    kubectl get svc -n devops-app
                    kubectl get ingress -n devops-app
                '''
            }
        }
    }

    post {

        always {
            sh 'docker image prune -f || true'
        }

        success {
            echo 'Application deployed successfully to Amazon EKS!'
        }

        failure {
            echo 'Pipeline failed. Check the stage logs.'
        }
    }
}      