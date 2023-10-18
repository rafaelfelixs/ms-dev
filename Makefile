build:
	docker-compose build &&\
	docker-compose -f docker-compose.cli.yml run --rm yarn install

lint-format:
	docker-compose -f docker-compose.cli.yml run --rm yarn lint:fix &&\
	docker-compose -f docker-compose.cli.yml run --rm yarn format:fix

install:
	docker-compose -f docker-compose.cli.yml run --rm yarn install

start:
	docker-compose up

dev: install start