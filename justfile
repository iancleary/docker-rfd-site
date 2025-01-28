# list recipes
help:
  just --list

# lint the code
lint:
  pnpm run lint

# format
format:
  pnpm run fmt

# install deps
install:
  pnpm install

# reset deps
reset:
  rm -rf node_modules/
  pnpm install

# dev server
dev:
  pnpm run dev

# build the app
build:
  pnpm run build

# start the app with pnpm
start:
  pnpm run start

# run tests
test:
  echo "no tests defined"

# format, lint, and then test
check: format lint test

# Lint and then test targets (like CI does)
ci: format lint test build

docker:  dcs dcb dcu

d: docker

dcb:
  docker compose build

dcu:
  docker compose up

dcud:
  docker compose up -d

dcs:
  docker compose stop
