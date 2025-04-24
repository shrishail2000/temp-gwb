#!/bin/bash

# 1. Copy the contents of .env.example to .env
if [ -f .env.example ]; then
    cp .env.example .env
    echo ".env.example copied to .env"
else
    echo ".env.example file not found"
    exit 1
fi

# 2. Check if pnpm is installed
if ! command -v pnpm &> /dev/null
then
    # a. If pnpm is not installed, print error
    echo "Error: pnpm is not installed. Please install pnpm first."
    exit 1
else
    # b. If pnpm is installed, run pnpm install
    echo "pnpm is installed. Running 'pnpm install'..."
    pnpm install
fi
