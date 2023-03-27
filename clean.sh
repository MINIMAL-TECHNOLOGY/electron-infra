rm -rf ./release
rm -rf ./dist

case $1 in
  web)
    echo "_ Cleaning web components"
    rm -rf ./build/10-renderer
    break
    ;;
  app)
    echo "_ Cleaning app components"
    rm -rf ./build/00-common
    rm -rf ./build/20-main
    rm -rf ./tsconfig.tsbuildinfo
    break
    ;;
  all)
    echo "_ Cleaning all components"
    rm -rf ./build
    rm -rf ./tsconfig.tsbuildinfo
    break
    ;;
  *)
    echo "Please specify clean component (web|app|all)"
    break
    ;;
esac
