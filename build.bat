echo "_ Building main process..."
call yarn run compile:app

echo ""
echo "_ Building renderer process..."
call yarn run compile:web
