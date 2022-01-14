SHELL := /bin/bash

app-build-up:
	docker-compose up --build

app-up:
	docker-compose up -d