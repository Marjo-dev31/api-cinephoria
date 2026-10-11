# Déploiement AWS avec Terraform

Cette configuration déploie l'API Nest sur **Lambda + API Gateway HTTP**, MySQL sur **RDS privé** et les ventes de films sur **DynamoDB**.

## Pré-requis

- Terraform >= 1.10 et AWS CLI authentifié sur le compte cible ;
- le secret AWS Secrets Manager existant `cinephoria` (ou sa valeur dans `app_secret_name`) doit contenir `SECRET_TOKEN` ;
- Node.js 22 et `zip` pour créer l'archive Lambda.

## Déployer

## CI/CD GitHub Actions

Deux workflows sont fournis :

- `CI` construit et teste l'API à chaque pull request et push sur `main`/`fix/**` ;
- `Deploy production` se lance après un push sur `main` ou manuellement. Il fabrique l'archive Lambda, planifie puis applique Terraform.

Avant le premier déploiement, créez dans GitHub **Settings → Environments → production** les variables suivantes :

- `TF_STATE_BUCKET` (**variable**) : nom d'un bucket S3 privé, versionné et chiffré, réservé à l'état Terraform ;
- `AWS_ACCESS_KEY_ID` (**secret**) : clé d'accès d'un utilisateur IAM dédié ;
- `AWS_SECRET_ACCESS_KEY` (**secret**) : clé secrète associée.

Pour une configuration de formation simple, créez dans AWS IAM un utilisateur dédié, par exemple `github-cinephoria-deploy`, puis créez une **access key**. Copiez ses deux valeurs dans les secrets GitHub ci-dessus (jamais dans le code, un fichier `.tfvars` ou un commit). Cet utilisateur doit pouvoir gérer les services employés ici : VPC/EC2 réseau, RDS, Lambda, API Gateway, CloudWatch Logs, Secrets Manager et les rôles IAM créés pour la Lambda. Pour un projet de formation, vous pouvez temporairement lui attacher `AdministratorAccess`, mais n'utilisez jamais le compte root ni ces clés pour un projet réel.

Vous pouvez définir des approbateurs obligatoires sur l'environnement `production` : GitHub interrompra alors le workflow juste avant les étapes de déploiement.

Le bucket d'état doit exister avant le premier lancement, car Terraform ne peut pas créer le backend qui contient son propre état. Le workflow utilise le verrouillage natif S3 (`use_lockfile=true`). Le versioning S3 n'est pas indispensable, mais il est recommandé : il permet de restaurer l'état en cas de mauvaise manipulation.

## Déploiement local

Depuis la racine du dépôt :

```bash
npm install
npm run package:lambda
cd infra
cp terraform.tfvars.example terraform.tfvars
# renseigner frontend_origins avec le domaine exact de votre distribution CloudFront
terraform init -backend-config="bucket=<votre-bucket-etat>" -backend-config="key=cinephoria/prod/terraform.tfstate" -backend-config="region=eu-west-3" -backend-config="use_lockfile=true"
terraform plan -out=tfplan
terraform apply tfplan
```

L'URL retournée dans `api_url` est l'URL à mettre dans la configuration du frontend. La distribution `cinephoriadistribution` utilise `https://dykoa3a9xthu7.cloudfront.net`, déjà renseignée dans l'exemple `terraform.tfvars` : Terraform l'applique à API Gateway et à la variable `CORS_ORIGINS` de l'API.

## Secrets et sécurité

Terraform lit `SECRET_TOKEN` dans le secret existant lors du déploiement, puis injecte ce jeton et les identifiants RDS dans les variables d'environnement de la Lambda. DynamoDB est accessible avec un endpoint VPC Gateway gratuit et les permissions IAM `PutItem`/`Scan` limitées à la table des ventes.

RDS n'est pas public et son groupe de sécurité n'accepte MySQL que depuis la Lambda. La Lambda est dans les sous-réseaux privés ; aucune route Internet, NAT Gateway ou Elastic IP n'est créée.

Le mot de passe RDS et `SECRET_TOKEN` se retrouvent dans l'état Terraform : utilisez le bucket S3 distant privé et ne versionnez jamais `terraform.tfvars`, `.terraform/` ou `*.tfstate`.

## Important avant production

TypeORM est actuellement configuré avec `synchronize: true`. Cela convient pour initialiser ce projet, mais désactivez-le et utilisez des migrations avant de traiter des données de production. La Lambda est limitée à 29 secondes, sous la limite HTTP API de 30 secondes.
