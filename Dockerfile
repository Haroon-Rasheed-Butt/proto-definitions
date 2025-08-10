# Builder stage
FROM node:18 AS builder
WORKDIR /app

# Install dependencies: protoc for compiling, curl for downloading, and Go for installing the plugin
RUN apt-get update && apt-get install -y \
    protobuf-compiler \
    curl \
    git \
    make \
    gcc \
    g++ \
    golang-go && \
    apt-get clean

# Install the protoc-gen-jsonschema plugin using Go
RUN go install github.com/chrusty/protoc-gen-jsonschema/cmd/protoc-gen-jsonschema@latest && \
    mv /root/go/bin/protoc-gen-jsonschema /usr/local/bin/protoc-gen-jsonschema && \
    chmod +x /usr/local/bin/protoc-gen-jsonschema && \
    /usr/local/bin/protoc-gen-jsonschema --version

# Install TypeScript protoc plugin
RUN npm install -g ts-protoc-gen

# Create directories
RUN mkdir -p ./proto ./generated/ts ./generated/java ./generated/json

# Copy proto files
COPY proto/*.proto ./proto/

# Generate TypeScript, Java, and JSON Schema files
# Check if proto files exist first
RUN if ls ./proto/*.proto >/dev/null 2>&1; then \
      protoc --proto_path=./proto --ts_out=./generated/ts ./proto/*.proto && \
      protoc --proto_path=./proto --java_out=./generated/java ./proto/*.proto && \
      protoc --proto_path=./proto --jsonschema_out=./generated/json ./proto/*.proto; \
    else \
      echo "No .proto files found in ./proto directory"; \
      exit 1; \
    fi

# Final stage to collect generated files
FROM alpine:latest
WORKDIR /app/generated

# Copy generated files from the builder
COPY --from=builder /app/generated/ts ./ts
COPY --from=builder /app/generated/java ./java
COPY --from=builder /app/generated/json ./json