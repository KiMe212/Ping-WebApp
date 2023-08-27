FROM python:3.10-slim

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

RUN apt update && \
    apt install -y netcat-openbsd && \
    mkdir -p /data/pypoetry && \
    pip install --upgrade pip poetry

WORKDIR /app

COPY entrypoint.sh pyproject.toml poetry.lock /app/

RUN poetry config virtualenvs.create false && poetry install

WORKDIR /app/ping_app

RUN chmod 755 /app/entrypoint.sh

ENTRYPOINT [ "/app/entrypoint.sh" ]
