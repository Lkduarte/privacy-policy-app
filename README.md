# Aplicativo de Política de Privacidade

## Visão Geral

O Aplicativo de Política de Privacidade é uma aplicação web projetada para ajudar os usuários a criar, gerenciar e exibir políticas de privacidade para seus sites ou aplicativos. Este projeto visa fornecer uma interface amigável e um backend confiável para lidar com os dados das políticas de privacidade de forma eficiente.

## Funcionalidades

- **Criar Políticas de Privacidade:** Usuários podem criar políticas de privacidade usando um formulário simples e intuitivo.
- **Editar e Atualizar Políticas:** Políticas existentes podem ser editadas e atualizadas facilmente.
- **Visualizar Políticas:** Políticas podem ser visualizadas em um formato limpo e legível.
- **Integração com API:** Fornece endpoints de API para gerenciar políticas programaticamente.
- **Autenticação de Usuário:** Autenticação segura de usuários para proteger o acesso às funcionalidades de gerenciamento de políticas.

## Tecnologias Utilizadas

- **Frontend:**
  - React
  - Bootstrap
  - Axios

- **Backend:**
  - Node.js
  - Express
  - MongoDB

## Instalação

### Pré-requisitos

- Node.js (v14.x ou superior)
- MongoDB (instância local ou na nuvem)

### Passos

1. **Clone o repositório:**

    ```bash
    git clone https://github.com/lucasrodrigof/privacy-policy-app.git
    cd privacy-policy-app
    ```

2. **Instale as dependências:**

    ```bash
    npm install
    ```

3. **Configure as variáveis de ambiente:**

    Crie um arquivo `.env` no diretório raiz e adicione as seguintes variáveis:

    ```env
    MONGODB_URI=sua_uri_mongodb
    JWT_SECRET=sua_chave_secreta
    ```

4. **Execute a aplicação:**

    ```bash
    npm start
    ```

    A aplicação estará disponível em `http://localhost:3000`.

## Endpoints da API

### Autenticação

- **Login:**
  - `POST /api/auth/login`

- **Registrar:**
  - `POST /api/auth/register`

### Políticas

- **Criar uma nova política:**
  - `POST /api/policies`

- **Obter todas as políticas:**
  - `GET /api/policies`

- **Obter uma política específica:**
  - `GET /api/policies/:id`

- **Atualizar uma política:**
  - `PUT /api/policies/:id`

- **Deletar uma política:**
  - `DELETE /api/policies/:id`

## Contribuindo

Contribuições são bem-vindas! Por favor, siga estes passos para contribuir:

1. Faça um fork do repositório.
2. Crie uma nova branch: `git checkout -b feature/sua-nova-funcionalidade`.
3. Faça suas alterações e as commit: `git commit -m 'Adicionei uma nova funcionalidade'`.
4. Faça o push para a branch: `git push origin feature/sua-nova-funcionalidade`.
5. Envie um pull request.

## Licença

Este projeto está licenciado sob a Licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## Contato

Para quaisquer dúvidas ou problemas, por favor, abra uma issue no repositório ou entre em contato pelo e-mail lucas.gt.1998@gmail.com.
