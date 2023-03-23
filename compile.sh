echo "_ Start compiling ELECTRON_INFRA"
echo ""

case $1 in
  web)
    yarn run lint:web
    sh ./clean.sh web

    echo "_ Compiling web components"
    react-app-rewired build
    break
    ;;
  app)
    yarn run lint:app
    sh ./clean.sh app

    echo "_ Compiling app components"
    ./node_modules/.bin/tsc -p tsconfig.json
    ./node_modules/.bin/tsc-alias -p tsconfig.json

    # rm -rf build/10-renderer
    break
    ;;
  *)
    echo "Please specify compile component (web|app|all)"
    break
    ;;
esac

echo ""
echo "_ Finished compiling ELECTRON_INFRA"
