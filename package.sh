echo "_ Start building ELECTRON_INFRA"
# cat public/electronInfra
echo ""

echo "_ Cleaning ELECTRON_INFRA"
sh clean.sh all

case $1 in
  mac)
    echo ""
    echo "_ Building main process..."
    yarn run compile:app

    echo ""
    echo "_ Building renderer process..."
    yarn run compile:web
    break
    ;;
  win)
    echo "_ Building processes..."
    ./build.bat
    break
    ;;
  linux)
    echo ""
    echo "_ Building main process..."
    yarn run compile:app

    echo ""
    echo "_ Building renderer process..."
    yarn run compile:web
    break
    ;;
  *)
    echo "Missing OS specification! Please specify OS that you want to build! "
    break
    ;;
esac

ls -la build
echo ""

sed -i -- 's/href="\//href=".\//g' ./build/10-renderer/index.html
sed -i -- 's/src="\//src=".\//g' ./build/10-renderer/index.html

BUILD_PROPS="--config=application-builder-conf.json --c.extraMetadata.main=build/main.js --publish always"
BUILD_OS=''
case $1 in
  mac)
    BUILD_OS="--macos"
    echo "_ Run build package for MacOS | BUILD_PROPS: $BUILD_OS $BUILD_PROPS"
    electron-builder build $BUILD_OS $BUILD_PROPS
    break
    ;;
  win)
    BUILD_OS="--win"
    echo "_ Run build package for Windows | BUILD_PROPS: $BUILD_OS $BUILD_PROPS"
    electron-builder build $BUILD_OS $BUILD_PROPS
    break
    ;;
  linux)
    BUILD_OS="--linux"
    echo "_ Run build package for Linux | BUILD_PROPS: $BUILD_OS $BUILD_PROPS"
    electron-builder build $BUILD_OS $BUILD_PROPS
    break
    ;;
  *)
    echo "Missing OS specification! Please specify OS that you want to build! "
    break
    ;;
esac

rm -rf public/dist
echo ""
echo "_ Finished building ELECTRON_INFRA"
