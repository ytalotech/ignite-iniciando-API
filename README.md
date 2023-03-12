# Rentx
Aplicação backend rent cars.

## Iniciando a aplicação
Iremos utilizar o docker para subir nossa aplicação.

Lembre-se de atualizar a baseURL em services/api.ts com o endereço IP da sua máquina para utilizar o back-end.

Caso tenha uma porta local postgres em uso, você irá precisar parar ela:

```bash
sudo service postgresql stop
```

Caso tenha uma porta local redis em uso, você irá precisar parar ela:

```bash
/etc/init.d/redis-server stop
```

Para iniciar o docker usaremos esses comandos:

```bash
docker-compose down
docker-compose up -d
```

Temos que rodar a migration:

```bash
yarn typeorm migration:run
```

Temos que rodar a seed:

```bash
yarn seed:admin
```

Comando para ver o log do docker, se está tudo funcionado:

```bash
docker logs rentx -f
```

Podemos parar e iniciar a aplicação usando esses comandos também:

```bash
docker stop rentx

docker start rentx
```

Para visualizar a documentação podemos acessar:

```bash
http://localhost:3333/api-docs/
```


## Rotas da API
Para visualizar exemplos testados de todas as rotas da API, você pode importar no seu Insomnia o arquivo: api/rotas_Insomnia.json 


## Stack

- Typescript
- Nodejs

## Features
- Autenticação usuário
- Criação novo usuário
- Atualização perfil
- Listagm de carros
- E mais...

# Definições

**RF** => Requisitos funcionais.

**RNF** => Requisitos não funcionais.

**RN** => Regra de negócio.

# Cadastro de carro

**RF** => Requisitos funcionais
Deve ser possivel cadastrar um novo carro.

**RNF** => Requisitos não funcionais

**RN** => Regra de negócio
Não deve ser possivel cadastrar um carro com uma placa já existente.
O carro deve ser cadastrado, por padrão, com disponibilidade.
O usuário responsavel pelo cadastro deve ser um usuário administrador.

# Listagem de carros

**RF**
Deve ser possivel listar todos os carros disponiveis.
Deve ser possivel listar todos os carros disponiveis pelo nome da categoria.
Deve ser possivel listar todos os carros disponiveis pelo nome da marca.
Deve ser possivel listar todos os carros disponiveis pelo nome do carro.

**RN**
O usuário não precisa estar logado no sistema.

# Cadastro de especificação no carro

**RF**
Deve ser possivel cadastrar uma especificação para um carro.

**RN**
Não deve ser possivel cadastrar uma especificação para um carro não cadastrado.
Não deve ser possivel cadastrar uma especificação já existente para o mesmo carro.
O usuário responsavel pelo cadastro deve ser um usuário administrador.

# Cadastro de imagens do carro

**RF**
Deve ser possivel cadastrar a imagem do carro.

**RNF**
Utilizar o multer para upload dos arquivos.

**RN**
O usuario deve poder cadastrar mais de uma imagem para o mesmo carro.
O usuário responsavel pelo cadastro deve ser um usuário administrador.

# Aluguel de carro

**RF**
Deve ser possivel cadastrar um aluguel

**RN**
O aluguel deve ter duração mínima de 24 horas.
Não deve ser possivel cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário.
Não deve ser possivel cadastrar um novo aluguel caso já exista um aberto para o mesmo carro.
O usuário deve está logado na aplicação
Ao realizar um aluguel, o status do carro deverá ser alteradso para indisponivel

# Devolução de carro

**RF**
Deve ser possivel realizar a devolução de um carro

**RN**
Se o carro for devolvido com menos de 24 horas, deverá ser cobrado diária completa.
Ao realizar a devolução, o carro deverá ser liberado para outro aluguel.
Ao realizar a devolução, o usuario devera ser liberado para outro aluguel.
Ao realizar a devolução, sdeverá ser calculado o total do aluguel.
Caso o horário de devolução seja superior ao horário previsto de entrega, deverá ser cobrado multa proporcional aos dias de atraso.
Caso haja multa, deverá ser somado ao total do aluguel.

# Listagem de alugueis para usuário

**RF**
Deve ser possivel reralizar a busca de todos os alugueis para o usuario

**RN**
O usuário deve estar logado na aplicação

# Recuperar Senha

**RF**
- Deve ser possivel o usuário recuperar a senha informando o e-mail
- O usuário deve receber um e-mail com o passo a passo para a recuperação da senha
- O usuário deve consefguir inserir uma nova senha

**RN**
- O usuário precisa informar uma nova senha
- O link enviado para a recuperação deve expirar em 3 horas