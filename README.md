# Cinéphoria — API

API REST de la plateforme de cinéma **Cinéphoria**. Elle centralise le catalogue de films, les cinémas et salles, les séances, les réservations, les avis, les comptes utilisateurs et le téléversement d’images.

Le projet est une application [NestJS](https://nestjs.com/) écrite en TypeScript. Les données métier sont conservées dans MySQL via TypeORM ; les statistiques de ventes sont également enregistrées dans DynamoDB.

## Fonctionnalités

- Catalogue de films, genres, pays et qualités de projection ;
- Gestion des cinémas, salles, séances et places ;
- Création et suivi des réservations ;
- Comptes utilisateurs, connexion et authentification JWT ;
- Avis sur les films et signalement d’incidents ;
- Téléversement d’images PNG, JPEG/JPG ou WebP (5 Mo maximum) ;
- Documentation interactive Swagger et déploiement AWS (Lambda, API Gateway, RDS et DynamoDB).

## Technologies

- Node.js 22, NestJS 11 et TypeScript ;
- MySQL 8.4, TypeORM et Docker Compose ;
- JWT, bcryptjs, class-validator, Swagger et Multer ;
- AWS Lambda/API Gateway, RDS, DynamoDB et Terraform (déploiement optionnel).

## Prérequis

- Node.js **22** ;
- npm ;
- Docker Desktop (recommandé pour démarrer MySQL) ;
- un accès AWS configuré uniquement si les statistiques DynamoDB ou le déploiement cloud sont utilisés.

## Installation locale

Clonez le dépôt, installez les dépendances et créez un fichier `.env` à la racine :

```bash
git clone https://github.com/Marjo-dev31/api-cinephoria.git
cd api-cinephoria
npm ci
```

Créez ensuite `.env` manuellement à partir des variables ci-dessous :

```dotenv
NODE_ENV=development
PORT=3000

MYSQL_DB_HOST=localhost
MYSQL_DB_PORT=3307
MYSQL_DB_USERNAME=cinephoria
MYSQL_DB_PASSWORD=mot_de_passe
MYSQL_DB_DATABASE=cinephoria
MYSQL_ROOT_PASSWORD=mot_de_passe_root

SECRET_TOKEN=une_cle_jwt_longue_et_secrete

# Requis lors de la création d’une commande ou de la consultation des ventes.
AWS_REGION=eu-west-3
DYNAMODB_TABLE_NAME=cinephoria-sales

# Optionnel : liste d’origines séparées par des virgules.
CORS_ORIGINS=http://localhost:4200,http://localhost:8100
```

Ne versionnez jamais ce fichier : il contient des identifiants et la clé de signature JWT.

### Démarrer les services avec Docker

Docker Compose lance MySQL sur le port hôte `3307` et l’API sur la valeur définie par `PORT` :

```bash
docker compose up --build
```

L’API utilise `mysql_db:3306` à l’intérieur du réseau Docker. Depuis la machine hôte, utilisez `localhost:3307`.

### Démarrer l’API avec Node.js

Lancez d’abord une instance MySQL accessible avec les paramètres du fichier `.env`, puis :

```bash
# développement avec rechargement automatique
npm run start:dev

# compilation puis exécution de la version compilée
npm run build
npm run start:prod
```

L’API est alors disponible sur `http://localhost:3000` par défaut.

## Documentation et authentification

La documentation OpenAPI interactive est exposée ici une fois l’API démarrée :

- Swagger UI : `http://localhost:3000/docs`
- Spécification JSON : `http://localhost:3000/docs-json`

Pour obtenir un jeton, créez un utilisateur puis appelez `POST /user/login`. Les routes marquées d’un cadenas dans Swagger attendent l’en-tête suivant :

```http
Authorization: Bearer <access_token>
```

Les réponses de connexion contiennent `access_token`. Les mots de passe sont hachés avec bcrypt avant leur enregistrement.

## Principales routes

La documentation Swagger fait foi pour les schémas de requête et de réponse détaillés.

| Ressource | Routes disponibles |
| --- | --- |
| Films | `GET /movies`, `GET /movies/:id`, `POST /movies`, `PATCH /movies/:id`, `DELETE /movies/:id`, `PATCH /movies/:id/favorite`, `GET /movies/sales` |
| Utilisateurs | `POST /user`, `POST /user/login`, `GET /user`, `GET /user/:id`, `PATCH /user/:id`, `DELETE /user/:id` |
| Réservations | `POST /order`, `GET /order`, `GET /order/:id`, `PATCH /order/:id`, `DELETE /order/:id` |
| Séances | `GET /showing`, `GET /showing/:id`, `GET /showing/room/:id`, `POST /showing`, `PATCH /showing/:id`, `DELETE /showing/:id` |
| Cinémas et salles | `GET`/`POST`/`PATCH`/`DELETE /cinema`, `GET`/`POST`/`PUT`/`DELETE /room`, `GET`/`PATCH`/`DELETE /seat` |
| Référentiels | `GET`/`POST /genre`, `GET`/`POST`/`PATCH`/`DELETE /country`, `/projection-quality` et `/role` |
| Avis et incidents | `GET`/`POST`/`PATCH`/`DELETE /reviews`, `GET`/`POST /incident` |
| Fichiers | `POST /upload` (champ multipart `file`), fichiers accessibles sous `/uploads/<nom-du-fichier>` |

Les opérations de modification sensibles et le téléversement nécessitent une authentification. La création d’une commande écrit une entrée de vente dans la table DynamoDB configurée par `DYNAMODB_TABLE_NAME`; la route `GET /movies/sales` la consulte.

## Structure du projet

```text
src/
├── movies/                 # films et statistiques de vente
├── user/                   # utilisateurs, connexion JWT et garde d’authentification
├── order/                  # réservations MySQL + évènements de vente DynamoDB
├── cinema/, room/, seat/   # établissements et capacité des salles
├── showing/                # programmation des séances
├── reviews/, incident/     # avis clients et incidents
├── upload/                 # dépôt d’images dans uploads/
├── config/                 # fournisseurs MySQL et DynamoDB
└── main.ts                 # CORS, sécurité HTTP, validation et Swagger
infra/                      # infrastructure Terraform AWS
```

## Tests et qualité

```bash
# tests unitaires
npm test

# tests unitaires en surveillance
npm run test:watch

# couverture
npm run test:cov

# tests end-to-end
npm run test:e2e

# lint avec correction automatique
npm run lint
```

## Déploiement AWS

L’infrastructure Terraform du dossier [`infra`](infra/README.md) déploie l’API sur Lambda derrière API Gateway, une base RDS MySQL privée et la table DynamoDB de ventes.

```bash
npm run package:lambda
cd infra
cp terraform.tfvars.example terraform.tfvars
terraform init
terraform plan
terraform apply
```

Consultez le [guide d’infrastructure](infra/README.md) avant tout déploiement : il détaille les prérequis AWS, la gestion des secrets et le backend Terraform distant.

## Scripts npm

| Commande | Description |
| --- | --- |
| `npm run start` | démarre NestJS |
| `npm run start:dev` | démarre NestJS en mode watch |
| `npm run build` | compile l’application dans `dist/` |
| `npm run start:prod` | exécute l’application compilée |
| `npm run package:lambda` | crée l’archive de déploiement Lambda |
| `npm run lint` | analyse et corrige le code avec ESLint |

## Licence

Projet privé — `UNLICENSED`.
