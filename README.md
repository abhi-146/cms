## Prerequisites

This document provides instructions for downloading Docker and installing Frappe.

## Docker
Download Docker Desktop from the official website:

[Download Docker](https://www.docker.com/products/docker-desktop)

## Frappe
Follow the guide provided at the link below to install Frappe v15:

[Install Frappe v15](https://wiki.nestorbird.com/wiki/install-frappe-v15)

- ERPNext

[Complete Frappe ERPNext setup](https://github.com/frappe/bench?tab=readme-ov-file)



## Installation

To install this feature, follow these steps:

If you don't have docker, first download docker.
Download docker from https://www.docker.com/products/docker-desktop/

1. Pull and run ubuntu image in docker

```bash
docker pull ubuntu:22.04
docker run -dt --name bench -p 8000:8000 ubuntu:22.04 /bin/bash
```

2. Switch user

```bash
su - erp_user
```

3. Start mariadb

```bash
sudo service mariadb start
```

4. Start redis

```bash
sudo service redis-server start
```

5. Cd to frappe-bench

```bash
cd frappe-bench
```

6. Start bench

```bash
bench start
```

7. Install custom app

Clone repository to apps folder in frappe bench directory
```bash
git clone https://github.com/abhi-146/cms/
```

```bash
bench --site [sitename] install-app [appname]
```

