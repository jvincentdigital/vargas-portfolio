PROJECT_NAME := vargas-portfolio

.PHONY: help
help: ## List available commands
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "  %-18s %s\n", $$1, $$2}' $(MAKEFILE_LIST)

.PHONY: install
install: ## Install npm dependencies
	npm install

.PHONY: dev
run: ## Run the dev server (alias of `dev`)
run: dev
dev: ## Start Next.js dev server on :3000
	npm run dev

.PHONY: build
build: ## Production build (next build)
	npm run build

.PHONY: start
start: ## Run the production build locally
	npm start

.PHONY: test
test: ## Typecheck + lint
	npx tsc --noEmit
	npm run lint

.PHONY: typecheck
typecheck: ## TS typecheck (no emit)
	npx tsc --noEmit

.PHONY: lint
lint: ## Next.js ESLint
	npm run lint

.PHONY: deploy
deploy: ## Deploy to Vercel (TARGET=prod for production)
ifeq ($(TARGET),prod)
	vercel --prod
else
	vercel
endif

.PHONY: logs
logs: ## Stream Vercel logs (TARGET=prod for production)
ifeq ($(TARGET),prod)
	vercel logs --prod
else
	vercel logs
endif

.PHONY: status
status: ## Show Vercel deployment status
	vercel ls

.PHONY: docs
docs: ## Serve docs/ on :8000
	cd docs && python3 -m http.server 8000

.PHONY: clean
clean: ## Remove build artifacts
	rm -rf .next out
