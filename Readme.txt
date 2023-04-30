Como subir a aplicação?

Necessário ter instalado: VSCODE, MariaDB, NODE.js

Pode ser utilizado: DBFOrGE para ver o banco de dados; Insomnia para testar as rotas da API.

1 - Descompacte o .rar onde desejar.
2 - Abra o console do MariaDB, (pesquisando por ele no menu iniciar do windows mesmo), crie o banco de dados digitando sem as aspas "create database tcc;" e de enter.
3 - Abra o VsCode clique no menu 'File', opção 'Open Folder' e selecione a pasta que foi descompactada do .rar
4 - Vamos primeiro subir a api. Crie um terminal e digite sem as aspas "cd .\api\" e tecle enter
5 - Ainda no terminal digite sem as aspas "npm run dev", pronto a API já está "no ar".
6 - Crie outro terminal no VsCode e digite sem as aspas "cd .\front\" e tecle enter.
7 - Ainda nesse terminal digite sem as aspas "npm start".
8 - Pronto agora o front-end (o site) já está no ar também.