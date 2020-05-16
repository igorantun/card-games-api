start:
	@docker-compose up

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
	@docker exec -it 01card-challenge /bin/ash
