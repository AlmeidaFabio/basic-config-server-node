# Server Básico Node

Configurações básicas para iniciar um projeto em NodeJs.

## Instalação e Uso do Projeto

Antes de começar, certifique-se de ter os seguintes softwares instalados em sua máquina:

- **Node.js** (versão 14 ou superior)
- **npm** (gerenciador de pacotes do Node.js) ou **yarn**
- **Git** (para clonar o repositório)

1. Clonar o Repositório
   ``git clone https://github.com/seu-usuario/seu-repositorio.git``
   Substitua *<https://github.com/seu-usuario/seu-repositorio.git>* pela URL do repositório que você deseja clonar.
2. Instalar as Dependências
   ``npm install``
3. Configurar Variáveis de Ambiente
4. Iniciar o Servidor de Desenvolvimento
   ``npm run dev``

O servidor estará disponível na porta especificada nas variáveis de ambiente.

## Inicialização do Aplicativo (app.ts)

### `const app = express()`

Cria uma instância do aplicativo Express. Esta instância é a principal aplicação que será usada para definir rotas, middlewares e lógica de manipulação de solicitações HTTP.

## Middleware

### `app.use(helmet())`

Aplica o middleware `helmet` ao aplicativo Express. O Helmet ajuda a proteger o aplicativo de algumas vulnerabilidades da web definindo cabeçalhos HTTP de forma apropriada. Ele é utilizado para melhorar a segurança do aplicativo.

### `app.use(cors())`

Aplica o middleware `cors` ao aplicativo Express. O CORS (Cross-Origin Resource Sharing) é um mecanismo que permite ou restringe requisições de recursos entre diferentes origens. Esse middleware é utilizado para permitir que o aplicativo Express receba solicitações de diferentes domínios.

### `app.use(express.json())`

Aplica o middleware `express.json()` ao aplicativo Express. Este middleware analisa o corpo das solicitações HTTP com o tipo de conteúdo `application/json` e popula a propriedade `req.body` com os dados JSON convertidos.

### `app.use(express.urlencoded({ extended: true }))`

Aplica o middleware `express.urlencoded()` ao aplicativo Express. Este middleware analisa o corpo das solicitações HTTP com o tipo de conteúdo `application/x-www-form-urlencoded` e popula a propriedade `req.body` com os dados. O parâmetro `{ extended: true }` permite o uso de objetos aninhados, como objetos e arrays.

### `app.use(express.static(path.resolve(__dirname, '..', 'public')))`

Configura o middleware para servir arquivos estáticos. Define o diretório `'public'` como o local de arquivos estáticos, como imagens, CSS, JavaScript, etc. A função `path.resolve(__dirname, '..', 'public')` resolve o caminho absoluto para o diretório `'public'` na estrutura do projeto.

### `app.use(router)`

Aplica o roteador principal da aplicação. Este middleware registra todas as rotas definidas no objeto `router`, que contém a lógica de roteamento da aplicação.

### `app.use(notFoundRequest)`

Middleware personalizado para lidar com requisições que não correspondem a nenhuma rota definida. Este middleware é executado quando nenhuma rota correspondente é encontrada, normalmente retornando uma resposta 404 (Não Encontrado).

### `app.use(errorHandler)`

Middleware global de tratamento de erros. Captura e lida com todos os erros que ocorrem na aplicação, garantindo que respostas de erro adequadas sejam enviadas ao cliente. Pode ser usado para registrar erros, enviar respostas personalizadas, etc.

## Funções do Servidor (server.ts)

### `runServer(port: number, server: http.Server): void`

Inicia um servidor HTTP ou HTTPS na porta especificada. Recebe dois parâmetros:

- `port`: O número da porta em que o servidor deve escutar.
- `server`: A instância do servidor HTTP ou HTTPS a ser iniciada.

Exibe uma mensagem no console informando que o servidor está rodando na porta especificada.

### `const regularServer = http.createServer(app)`

Cria um servidor HTTP usando o módulo `http` e a aplicação Express (`app`).

### `const secServer = https.createServer(options, app)`

Cria um servidor HTTPS usando o módulo `https` e a aplicação Express (`app`). Requer um objeto `options` contendo as chaves SSL e o certificado, que são lidos dos arquivos especificados nas variáveis de ambiente `SSL_KEY` e `SSL_CERT`.

## Uso de Servidores em Diferentes Ambientes

### Produção (`process.env.NODE_ENV === 'production'`)

- Cria tanto um servidor HTTP (`regularServer`) quanto um servidor HTTPS (`secServer`).
- O servidor HTTP é executado na porta `80`.
- O servidor HTTPS é executado na porta `443`.

### Desenvolvimento

- Apenas um servidor HTTP (`regularServer`) é criado.
- O servidor é executado na porta especificada na variável de ambiente `PORT` ou, se não especificado, na porta `9000`.

## Dependências

- **http**: Módulo nativo do Node.js para criar servidores HTTP.
- **https**: Módulo nativo do Node.js para criar servidores HTTPS.
- **fs**: Módulo nativo do Node.js para manipulação de arquivos. Usado para ler chaves SSL e certificados.
- **process.env**: Objeto global do Node.js para acessar variáveis de ambiente.

## Variáveis de Ambiente (.env)

### `BASE_URL`

- **Descrição**: Define a URL base da aplicação.
- **Exemplo**: `http://localhost`

### `NODE_ENV`

- **Descrição**: Especifica o ambiente de execução da aplicação. Pode ser `'DEVELOPMENT'`, `'PRODUCTION'`, ou outros ambientes personalizados.
- **Exemplo**: `"DEVELOPMENT"`

### `PORT`

- **Descrição**: Define a porta na qual o servidor HTTP deve escutar.
- **Exemplo**: `2024`

### `DATABASE_URL`

- **Descrição**: URL de conexão com o banco de dados PostgreSQL. Inclui o usuário, senha, host, nome do banco de dados e o schema.
- **Formato**: `postgresql://<usuario>:<senha>@<host>/<nome_do_bd>?schema=<schema>`
- **Exemplo**: `"postgresql://postgres:pass@lhost/your_bd?schema=public"`

### `SSL_KEY`

- **Descrição**: Caminho para o arquivo da chave privada SSL, usada para configurar o servidor HTTPS.
- **Exemplo**: `"/private.key"`

### `SSL_CERT`

- **Descrição**: Caminho para o arquivo de certificado SSL, usado para configurar o servidor HTTPS.
- **Exemplo**: `"/certificate.pem"`

## Middlewares Personalizados (src/middlewares/errorHandler.ts)

### `notFoundRequest: RequestHandler`

Middleware para lidar com requisições a rotas não definidas na aplicação.

- **Descrição**: Esse middleware é chamado quando uma requisição não corresponde a nenhuma rota existente. Ele retorna uma resposta JSON com status 404 e uma mensagem de erro indicando que a rota não foi encontrada.
- **Resposta**:
  - **Status**: `404 Not Found`
  - **Corpo**: `{ "error": "Route not found" }`

### `errorHandler: ErrorRequestHandler`

Middleware global de tratamento de erros.

- **Descrição**: Este middleware captura todos os erros que ocorrem em qualquer parte da aplicação após a chamada das rotas e outros middlewares. Ele registra o erro no console e retorna uma resposta JSON com status 500.

- **Parâmetros**:
  - `err`: O objeto de erro capturado.
  - `req`: O objeto de requisição.
  - `res`: O objeto de resposta.
  - `next`: A função `next` usada para passar o controle para o próximo middleware.

- **Resposta**:
  - **Status**: `500 Internal Server Error`
  - **Corpo**: `{ "error": "Something broke!" }`

## Dependencies (package.json)

Lista de dependências necessárias para o funcionamento do projeto em ambiente de produção.

- **cors**: Middleware para habilitar o CORS (Cross-Origin Resource Sharing) nas aplicações Express, permitindo que recursos restritos sejam solicitados de outro domínio fora do domínio ao qual o recurso pertence. Versão utilizada: `^2.8.5`.

- **dotenv**: Carrega variáveis de ambiente de um arquivo `.env` para `process.env`. Facilita a configuração de variáveis de ambiente de forma segura. Versão utilizada: `^16.4.5`.

- **express**: Framework web rápido e minimalista para Node.js, usado para construir aplicações web e APIs. Versão utilizada: `^4.19.2`.

- **helmet**: Middleware de segurança para Express, que ajuda a proteger a aplicação de algumas vulnerabilidades da web definindo cabeçalhos HTTP de forma apropriada. Versão utilizada: `^7.1.0`.

## DevDependencies

Lista de dependências de desenvolvimento usadas no projeto. Essas dependências são necessárias apenas durante o desenvolvimento e não são incluídas no ambiente de produção.

- **@types/cors**: Tipos TypeScript para o pacote `cors`. Versão utilizada: `^2.8.17`.
  
- **@types/dotenv**: Tipos TypeScript para o pacote `dotenv`. Versão utilizada: `^8.2.0`.

- **@types/express**: Tipos TypeScript para o pacote `express`. Versão utilizada: `^4.17.21`.

- **nodemon**: Ferramenta que reinicia automaticamente o servidor sempre que uma mudança nos arquivos é detectada. Útil para desenvolvimento. Versão utilizada: `^3.1.4`.

- **ts-node**: Executor de TypeScript para Node.js, que permite executar diretamente arquivos `.ts` sem pré-compilação para JavaScript. Versão utilizada: `^10.9.2`.

- **typescript**: O compilador TypeScript, que permite a escrita de código JavaScript com tipagem estática. Versão utilizada: `^5.5.4`.

## Configuração do Nodemon (nodemon.json)

Configuração para o Nodemon monitorar arquivos TypeScript (`.ts`) e reiniciar automaticamente o servidor durante o desenvolvimento.

- **watch**: Define os diretórios ou arquivos que o Nodemon deve monitorar por mudanças.  
  - **Valor**: `["src"]` — Monitora a pasta `src` por alterações nos arquivos.

- **ext**: Especifica as extensões de arquivos que o Nodemon deve observar.  
  - **Valor**: `"ts"` — Observa arquivos com a extensão `.ts` (TypeScript).

- **exec**: Comando a ser executado quando uma mudança é detectada.  
  - **Valor**: `"ts-node ./src/server.ts"` — Executa o servidor usando `ts-node`, apontando para o arquivo `server.ts` na pasta `src`.
