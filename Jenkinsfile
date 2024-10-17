pipeline {
    agent any

    tools {
        nodejs "node-16.2"
    }

    environment {
        PROD_SERVER_PATH= "/data/application/build"
        JENKINS_SERVER_PATH="/data/application/jenkins/workspace/swagger-ui/build"

        LAST_COMMIT= ""
        CHECK_STATUS_COUNT=20
        PROD_CHECK_STATUS_COUNT=100
        SLEEP_SECONDS=5
        PROD_SLEEP_SECONDS=1
        TODAY= java.time.LocalDate.now()
    }

    stages {
        /*
        stage('[Master] Node Install - 최초 빌드시에만 실행') {
            when {
                branch "master"
            }
          steps {
                sh 'npm install react-dev-utils --save-dev'
                sh 'npm install'
            }
        }
        */
        stage('[Master] Build') {
            when {
                branch "master"
            }
            steps {
                script {
                    LAST_COMMIT = sh(returnStdout: true, script: "git log -1 --pretty=%B").trim()
                }
                sh 'npm run build'
                stash(name: 'build', includes: '**/build/**')
            }
        }

        stage('[Master] Deploy') {
            when {
                branch "master"
            }
            steps {
                script {
                    wrap([$class: 'ParentFolderBuildWrapper']) {
                        username = "${env.PROD_USERNAME}"
                        password = "${env.PROD_PASSWORD}"
                        host = "${env.PROD_HOST}"
                    }
                    def remote = setRemote(host, username, password)
                    dir('/data/application/jenkins/workspace/swagger-ui') {
                        unstash 'build'
                    }
                    sshPut remote: remote, from: env.JENKINS_SERVER_PATH, into: '/data/application'
                }
            }
        }
    }

    post {
        success {
            echo 'I succeeded!'
            slackSend color: "good", message: "✅Build Success!\n\n\n PROJECT             : ${JOB_NAME}\n BRANCH             : ${env.BRANCH_NAME}\n JENKINS URL     : <${env.RUN_DISPLAY_URL}|Blue Ocean Link>\n LAST_COMMIT  : ${LAST_COMMIT}"
        }
        failure {
            echo 'I failed :('
            slackSend color: "danger", message: "❌Build Fail!\n\n\n PROJECT             : ${JOB_NAME}\n BRANCH             : ${env.BRANCH_NAME}\n JENKINS URL     : <${env.RUN_DISPLAY_URL}|Blue Ocean Link>\n LAST_COMMIT  : ${LAST_COMMIT}"
        }
    }
}

def setRemote(host, username, password) {
    def remote = [:]
    remote.name = host
    remote.host = host
    remote.port = 10122
    remote.allowAnyHosts = true
    remote.user = username
    remote.password = password
    return remote
}
