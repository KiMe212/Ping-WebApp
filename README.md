# Ping Web App

### Abstract

Приложение, которое пингует список серверов, сохраняет время отклика в БД и рисует график откликов по каждому домену на веб-странице

### Functionality

- иметь возможность сохранять список доменов в БД ч/з админ-панель Django
- раз в N секунд список доменов должен быть пропингован. (N определяется в django.settings. Default: N = 600)
- при наличии в списке доменов > 1, опрашивать их в многопоточном режиме
- все действия логируются (STDOUT)
- по откликам, которые сохраняются в БД, строится диаграмма: \
ось Х - время с шагом в час \
ось Y - время отклика в мс \
диаграмма (/chart) должна автоматически обновляться раз в 30 секунд без полной перезагрузки страницы


### Details

- логика работы должна быть заключена в отдельные контроллеры
- приложение должно собираться в Docker-контейнер и запускаться вместе с БД через docker-compose
- инструкция по сборке и запуску должна находиться в корне репозитория в файле README.md

### How to run project

```bash
make build-app
make up-app
make superuser
```
Frontend доступен по URL: [http://localhost:3000/](http://localhost:3000/)
Admin часть backend доступна по URL: [http://localhost:8080/](http://localhost:8080/)

Install docker [here](https://docs.docker.com/engine/install/) \
P.S. post-installation step for linux users [here](https://docs.docker.com/engine/install/linux-postinstall/)
