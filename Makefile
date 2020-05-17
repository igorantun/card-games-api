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
