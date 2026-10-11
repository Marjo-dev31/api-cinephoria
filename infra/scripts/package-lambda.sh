#!/usr/bin/env sh
set -eu

project_root=$(CDPATH= cd -- "$(dirname -- "$0")/../.." && pwd)
work_dir="$project_root/.build/lambda-work"
artifact_dir="$project_root/.build/lambda"
artifact="$project_root/dist/cinephoria-api.zip"

rm -rf "$work_dir" "$artifact_dir"
mkdir -p "$work_dir" "$artifact_dir" "$project_root/dist"

cd "$project_root"
npm run build
tar --exclude='./node_modules' --exclude='./.build' --exclude='./.git' -cf - . | tar -xf - -C "$work_dir"
cd "$work_dir"
npm ci --omit=dev
cp -R dist uploads node_modules package.json "$artifact_dir"
cd "$artifact_dir"
zip -qr "$artifact" .
rm -rf "$work_dir" "$artifact_dir"
echo "Lambda artifact created: $artifact"
