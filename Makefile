.EXPORT_ALL_VARIABLES:
COMPOSE_BACKEND_FILE ?= backend/docker-compose.yml
COMPOSE_FRONTEND_FILE ?= frontend/docker-compose.yml

.PHONY: build-backend
build-backend:
	docker-compose -f $(COMPOSE_BACKEND_FILE) build

.PHONY: build-frontend
build-frontend:
	docker-compose -f $(COMPOSE_FRONTEND_FILE) build

.PHONY: build-app
build-app:
	$(MAKE) build-backend
	$(MAKE) build-frontend

.PHONY: up-backend
up-backend:
	docker-compose -f $(COMPOSE_BACKEND_FILE) up -d

.PHONY: up-frontend
up-frontend:
	docker-compose -f $(COMPOSE_FRONTEND_FILE) up -d

.PHONY: up-app
up-app:
	$(MAKE) up-backend
	$(MAKE) up-frontend

.PHONY: stop-backend
stop-backend:
	docker-compose -f $(COMPOSE_BACKEND_FILE) stop

.PHONY: stop-frontend
stop-frontend:
	docker-compose -f $(COMPOSE_FRONTEND_FILE) stop

.PHONY: stop-app
stop-app:
	$(MAKE) stop-backend
	$(MAKE) stop-frontend

.PHONY: superuser
superuser:
	docker exec ping-webapp-web python manage.py createsuperuser --noinput
