dev:
	@docker-compose up api-dev

start:
	@docker-compose up api

stop:
	@docker-compose stop

kill:
	@docker-compose kill

restart:
	@make stop
	@make start

clean:
	@docker-compose down -v

sh:
	@docker exec -it api /bin/ash

test-e2e:
	@docker-compose up test-e2e

test-unit:
	@docker-compose up test-unit

test-coverage:
	@docker-compose up test-coverage

test:
	@make test-e2e
	@make test-unit
	@make test-coverage
