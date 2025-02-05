FROM node:23-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN apk update && apk upgrade && apk add --no-cache bash wget
# https://pnpm.io/installation#in-a-docker-container
RUN wget -qO- https://get.pnpm.io/install.sh | ENV="$HOME/.bashrc" SHELL="$(which bash)" bash -
RUN apk del bash wget
COPY . /workdir
WORKDIR /workdir

FROM base AS prod-deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod

FROM base AS build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install
RUN pnpm run build

FROM base
COPY --from=prod-deps /workdir/node_modules /workdir/node_modules
COPY --from=build /workdir/build /workdir/build
EXPOSE 3000
CMD [ "pnpm", "start" ]