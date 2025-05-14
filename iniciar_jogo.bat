@echo off
echo Iniciando servidor para o jogo DualWorld...
echo Acesse http://localhost:8000 no seu navegador
echo Pressione Ctrl+C para encerrar o servidor

cd %~dp0
python -m http.server 8000
