# FaceData-Scraper

Este projeto utiliza a biblioteca Playwright para realizar a raspagem de informações de perfis do Facebook. Ele coleta dados como nome, número de amigos, e tipo de perfil (público ou privado) e salva esses dados em um arquivo CSV, além de capturar screenshots dos perfis.

## Funcionalidades

- **Login Automático**: O script realiza login automaticamente no Facebook utilizando as credenciais fornecidas no arquivo `.env`.
- **Coleta de Dados**: Extrai informações como nome do perfil, número de amigos, e classifica o perfil como público ou privado.
- **Captura de Screenshots**: Tira screenshots dos perfis que são privados ou possuem menos de 10 amigos.
- **Exportação para CSV**: Salva os dados coletados em um arquivo `users.csv` para fácil análise posterior.

## Estrutura do Projeto

- **`src/`**: Contém os arquivos principais do projeto.
  - **`urls.ts`**: Arquivo contendo as URLs dos perfis a serem raspados.
  - **`types.ts`**: Define a estrutura dos dados que serão coletados (ex: `User`).
  - **`utils.ts`**: Contém funções auxiliares como login, captura de screenshots, e manipulação de strings.
  - **`index.ts`**: Arquivo principal que orquestra o processo de raspagem.
- **`.env`**: Arquivo que armazena as variáveis de ambiente (credenciais do Facebook).

## Pré-requisitos

- Node.js (versão 14 ou superior)
- Playwright
- Um arquivo `.env` configurado com as seguintes variáveis:

```plaintext
FACEBOOK_EMAIL=seu_email_facebook
FACEBOOK_PASSWORD=sua_senha_facebook
```

## Instalação

1. Clone este repositório:
   ```bash
   git clone https://github.com/seu-usuario/seu-repositorio.git
   ```
2. Navegue até o diretório do projeto:
   ```bash
   cd seu-repositorio
   ```
3. Instale as dependências:
   ```bash
   npm install
   ```
4. Crie um arquivo `.env` na raiz do projeto com suas credenciais do Facebook.

## Execução

1. Para iniciar o processo de raspagem, execute o seguinte comando:
   ```bash
   npx ts-node src/index.ts
   ```
   **Nota**: O navegador será aberto em modo não-headless para que você possa visualizar o processo.

2. Os dados coletados serão salvos no arquivo `users.csv` na raiz do projeto.

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.

## Aviso Legal

Este projeto é apenas para fins educacionais. Certifique-se de cumprir os termos de serviço do Facebook ao utilizar este script. O uso inadequado pode levar ao bloqueio de contas e/ou outras ações legais.

## Licença

Este projeto está licenciado sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
