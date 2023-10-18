# ms-dev mysql redis

#### 0. Project description
- This project intends to show backend api server running for:
  - to register new users
  - to authenticate users
  - to store user scores
  - to show the leaderboard and the user rank

- Also for this project was created a cron job with Shell Script to run in linux environment, this job will monitor the status of the container and restart the project if necessary. 

#### 1. Necessary requirements for running the project in ubuntu

- Install docker
- Install docker-compose
- Install Makefile

#### 2. Steps to execute the project

- run command `docker-compose up mysql` to start mysql container
- run command `docker-compose -f docker-compose.cli.yml run --rm yarn migrate:run` to create table in mysql
- run command `make dev` to start the other containers and run the project

#### 3. Commands to run the cronjob `monitor.sh`
- Install crontab in Linux
- Set the crontab in Linux with the command `crontab -e` and set the user and the folder for the system. Example: `* * * * * /bin/sh /home/yourname/Desktop/monitor.sh >> /home/yourname/Desktop/monitor.log 2>&1`
- Copy/Move the script `monitor.sh` to desktop path

#### 4. Suggestions and command of the project

* Mandatory settings to execute the project in development mode

  - Suggestion create an alias in linux cli  `dcli` for executing the command:  `docker-compose -f docker-compose.cli.yml run --rm`
  - Copy the file `.env.dist` with the name `.env`
  - Copy the file `docker-compose.override.yml.dist` with the name `docker-compose.override.yml`
      - To execute the project in mode `dev` or `debug` in docker-compose.override commands:
        ```bash
          command: [ "yarn", "dev" ] 
        ```
        or
        ```bash
        command: [ "yarn", "debug" ]
        ```

* Command list

  | COMANDOS                                                         | DESCRIÇÃO                                                                                           |
  |------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------|
  | docker-compose build                                             | To build docker image                                                                               |
  | docker-compose up                                                | To start the application                                                                            |
  | docker ps                                                        | To list containers executing                                                                        |
  | docker images                                                    | To list images                                                                                      |
  | docker volume ls                                                 | To list docker volumes                                                                              |
  | docker network ls                                                | To list docker network                                                                              |
  | docker rm -f `CONTAINER_ID`                                      | To remove a docker container                                                                        |
  | docker rmi -f `IMAGE_ID`                                         | To remove a docker image                                                                            |
  | docker system prune -a                                           | To remove all the docker images, containers, volumes and network                                    |
  | dcli yarn                                                        | To install all the node dependencies of the project                                                 |
  | dcli yarn add `lib`                                              | To install one specific node dependecy in the project                                               |
  | dcli yarn lint:fix                                               | To analise all the code                                                                             |
  | dcli yarn format:fix                                             | To format all the code                                                                              |
  | dcli yarn build                                                  | To build the code from ts to js                                                                     |
  | sudo chmod -R 777 app/src/Domain/Migrations/`filename_migration` | To give edition permission for the migration file                                                   |
  | make build                                                       | To build all the necessary containers of the project                                                |
  | make dev                                                         | To start all the necessary conatiners of the project |

* To test the api
  * In development
    ```bash
    http://localhost:3010/api
    ```
    or
    ```bash
    http://localhost:3010/api/is-alive
    ```
#### 5. Stack | libs | technologies used in the project
- nodejs | express | typescript (server & application)
- redis (storage)
- mysql | typeorm (database)
- docker | docker-compose (infrastructure)
- shell script | crontab (monitoring)
- winston (logs)