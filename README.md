# Real time chat


## Overview
Este projeto implementa uma aplicação de chat projetada para facilitar a comunicação em tempo real entre os usuários. A aplicação fornece um mecanismo de autenticação, permitindo que os usuários se cadastrem com um email, nome de usuário e senha. Ela armazena mensagens enviadas pelos usuários e garante a entrega em tempo real das mensagens para todos os participantes.

### Funcionalidades
- `User Authentication`: Autenticação de usuário com email, nome de usuário e senha.
- `Real-time Messaging`: Funcionalidade de mensagens em tempo real.
- `Message Storage`: Armazenamento de mensagens para referência histórica.

## Technologies Used
### Backend
- `Language`: Node.js com TypeScript e NestJS para estruturação do backend
- `Databases`:
  - Postgres para armazenamento persistente de dados
- `Frameworks and Libraries`:
  - NestJS para estruturação da aplicação backend
  - Prisma ORM para interação com o banco de dados
  - SocketIO ou WebSockets para comunicação em tempo real

### Frontend
- `Framework`: Next.js para desenvolvimento frontend fluido
- `Design Libraries`:
  - MaterialUI e TailwindCSS para componentes de interface
- `State Management`:
  - React Context API para gerenciar o estado dos formulários
  - Axios para requisições à API e obtenção de dados
- `Data Validation`:
  - Zod para validação de objetos

## Implementation Highlights
- **Novos Conhecimentos Adquiridos**:
  - Aprendizado sobre integração e utilização de SocketIO/WebSockets para mensagens em tempo real.
  - Aprendizado sobre NestJs e integração front-end/back-end.
  - Implementação do Prisma ORM para interações eficientes com o banco de dados.
- **Abordagens Adotadas**:
  - Utilização do NestJS para desenvolvimento estruturado do backend.
  - Aproveitamento do Next.js para roteamento e renderização eficientes no frontend.

## Plano de Continuidade e Melhorias Futuras
### Plano de Entrega Parcial
- **Fase 1**:
  - Sistema de autenticação de usuário com funcionalidades básicas de registro e login.
  - Armazenamento e recuperação de mensagens.
- **Fase 2**:
  - Mensagens em tempo real usando SocketIO ou WebSockets.
- **Fase 3**:
  - Aprimoramentos na interface e experiência do usuário.
  - Implementação de recursos adicionais, como reações a mensagens, notificações ou indicadores de presença do usuário.
 
## Deploy da Aplicação

### Backend (Railway)
- **Link**: [Railway - Desafio Play for a Cause Backend](https://desafio-play-for-a-cause-production.up.railway.app/)
- **Descrição**: O backend da aplicação, desenvolvido usando Node.js com TypeScript e NestJS, está hospedado no Railway. A aplicação está configurada para lidar com a autenticação de usuários, armazenamento de mensagens e interações com o banco de dados PostgreSQL. Para acessar os recursos, é necessário autenticar-se com um token válido.

### Frontend (Vercel)
- **Link**: [Vercel - Desafio Play for a Cause Frontend](https://desafio-play-for-a-cause-livid.vercel.app/)
- **Descrição**: O frontend da aplicação, desenvolvido utilizando Next.js, está hospedado na plataforma Vercel. Oferece uma interface intuitiva e responsiva para os usuários interagirem com a aplicação. Ele se comunica com o backend para fornecer funcionalidades como autenticação de usuários, envio e recebimento de mensagens em tempo real.

### Melhorias e Recursos Futuros
- Implementar criptografia de ponta a ponta para mensagens seguras.
- Aprimorar os perfis dos usuários com informações adicionais e configurações.
- Implementar recursos de edição e exclusão de mensagens.
- Implementar envio de imagens.
- Implementar mensagens diretas/conversas 1:1.
- Otimizar o desempenho e escalabilidade da aplicação.
- Implementar mecanismos robustos de tratamento de erros e registro de logs.

## Melhorias de Estilo (CSS)
- **Aprimoramento do Design**: Planejo implementar melhorias significativas no estilo e no design da aplicação.
- **Utilização de Frameworks**: Pretendo explorar os frameworks de CSS, para alcançar um design mais atraente e responsivo.
- **Refinamento da Interface do Usuário**: Focarei em tornar a experiência do usuário mais agradável visualmente, aplicando técnicas modernas de design e layout.


## Desenvolvedor
- Desenvolvido por: [Vinicius Vieira]
