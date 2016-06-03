#!/bin/bash

main() {
  local name="$1"
  if [ -z "$name" ]; then
    echo "Missing Component name"
    exit 1
  fi
  git rm src/components/$name/index.js || exit 1
  git mv src/components/$name/{$name,index}.js || exit 1
  git mv src/components/$name/{$name,index}.css || exit 1
}

main "$@"
