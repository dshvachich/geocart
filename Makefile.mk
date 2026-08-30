APP_NAME = $(shell node -p "require('./package.json').name")
APP_VERSION = $(shell node -p "require('./package.json').version")

GREEN = \033[0;32m
YELLOW = \033[0;33m
NC = \033[0m

.PHONY: help install dev start build lint typecheck analyze check generate_openapi generate-openapi format format-check clean info

help:
	@echo "Frontend Build System"
	@echo ""
	@echo "Targets:"
	@echo "  ${GREEN}install${NC}          - Install npm dependencies"
	@echo "  ${GREEN}dev${NC}              - Run Next.js development server"
	@echo "  ${GREEN}start${NC}            - Run Next.js production server"
	@echo "  ${GREEN}build${NC}            - Build production bundle"
	@echo "  ${GREEN}lint${NC}             - Run ESLint"
	@echo "  ${GREEN}typecheck${NC}        - Run TypeScript checks"
	@echo "  ${GREEN}analyze${NC}          - Run lint and typecheck"
	@echo "  ${GREEN}check${NC}            - Generate OpenAPI client, then run analyze and build"
	@echo "  ${GREEN}generate_openapi${NC} - Generate OpenAPI client and models"
	@echo "  ${GREEN}format${NC}           - Format project with Prettier"
	@echo "  ${GREEN}format-check${NC}     - Check formatting with Prettier"
	@echo "  ${GREEN}clean${NC}            - Remove local build/cache artifacts"
	@echo "  ${GREEN}info${NC}             - Show project info"

install:
	npm install

dev:
	npm run dev

start:
	npm run start

build:
	npm run build

lint:
	npm run lint

typecheck:
	npm run typecheck

analyze: lint typecheck

check: generate_openapi analyze build

generate_openapi:
	npm run generate:openapi

generate-openapi: generate_openapi

format:
	npx prettier --write .

format-check:
	npx prettier --check .

clean:
	@echo "${YELLOW}Cleaning...${NC}"
	rm -rf .next
	rm -f tsconfig.tsbuildinfo
	@echo "${GREEN}Clean completed${NC}"

info:
	@echo "${YELLOW}Project Info:${NC}"
	@echo "  Name: $(APP_NAME)"
	@echo "  Version: $(APP_VERSION)"
	@echo "  Framework: Next.js"
