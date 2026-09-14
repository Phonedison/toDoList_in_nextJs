# Lista de tarefas

Aplicação web para organizar atividades, acompanhar o que ainda precisa ser feito e visualizar o progresso das tarefas concluídas. Desenvolvida com Next.js, React e TypeScript, utiliza PostgreSQL para manter os dados salvos entre acessos.

## Funcionalidades

- Cadastro de tarefas pelo campo **Adicionar tarefa** e pelo botão **Adicionar**.
- Aviso ao tentar cadastrar uma tarefa com o campo vazio.
- Listagem das tarefas armazenadas no banco e mensagem quando a lista exibida está vazia.
- Filtros **Todas**, **Não finalizados** e **Concluidas**.
- Alternância entre pendente e concluída ao clicar no texto da tarefa.
- Identificação visual do status: faixa vermelha para pendentes; faixa verde e texto riscado para concluídas.
- Janela de edição acessível pelo ícone de lápis. A gravação possui uma limitação descrita abaixo.
- Exclusão individual pelo ícone de lixeira, sem confirmação.
- Remoção de todas as tarefas concluídas com janela de confirmação e opção de cancelar. O botão fica desabilitado quando não há tarefas concluídas.
- Contadores de tarefas concluídas e totais, além de uma barra de progresso. Esses indicadores consideram a lista completa, independentemente do filtro selecionado.
- Notificações sobre ações realizadas e indicador de carregamento no botão de adicionar durante a busca de tarefas.
- Persistência no PostgreSQL e atualização da lista após as operações.

## Tecnologias e bibliotecas

Versões declaradas no `package.json`. O `package-lock.json` registra as versões resolvidas para instalação com `npm ci`.

### Dependências

| Biblioteca | Versão declarada | Finalidade |
| --- | --- | --- |
| `next` | ^16.3.4 | Framework, App Router e Server Actions para operações no servidor. |
| `react` / `react-dom` | ^19.3.0 | Interface, componentes e gerenciamento de estado com Context API e hooks. |
| `@prisma/client` | 7.10.0 | Acesso tipado aos dados. |
| `@prisma/adapter-pg` | 7.10.0 | Integração entre Prisma e o driver PostgreSQL. |
| `pg` | ^8.23.0 | Conexão e pool de conexões com PostgreSQL. |
| `dotenv` | ^17.4.2 | Carregamento do `.env` na configuração do Prisma. |
| `@base-ui/react` | ^1.8.0 | Primitivos dos componentes de interface. |
| `shadcn` | ^4.21.0 | Ferramenta do ecossistema dos componentes locais em `src/components/ui`. |
| `tailwindcss` | ^4.3.3 | Estilização por classes utilitárias. |
| `@tailwindcss/postcss` | ^4.3.3 | Integração do Tailwind com PostCSS. |
| `tw-animate-css` | ^1.4.0 | Animações CSS. |
| `class-variance-authority` | ^0.7.1 | Variações de estilo dos componentes. |
| `cn` | ^0.2.6 | Utilitário de composição de classes, exportado por `src/lib/utils.ts`. |
| `clsx` | ^2.1.1 | Utilitário de classes declarado, sem importação direta no código da aplicação. |
| `tailwind-merge` | ^3.6.0 | Utilitário para combinar classes Tailwind, sem importação direta no código da aplicação. |
| `lucide-react` | ^1.43.0 | Ícones da interface. |
| `sonner` | ^2.0.8 | Notificações toast. |
| `next-themes` | ^0.4.6 | Consulta de tema no componente de notificações; não há seletor de tema na interface. |
| `babel-plugin-react-compiler` | ^1.0.0 | Suporte ao React Compiler, habilitado no Next.js. |
| `express` | ^5.2.1 | Declarado, sem uso direto no código da aplicação; não é necessário iniciar um servidor Express separado. |
| `zod` | ^4.6.1 | Declarado, sem validação implementada com essa biblioteca no código da aplicação. |

### Dependências de desenvolvimento

| Biblioteca | Versão declarada | Finalidade |
| --- | --- | --- |
| `typescript` | ^5.9.3 | Tipagem estática. |
| `prisma` | 7.10.0 | CLI para geração do cliente e migrações do banco. |
| `eslint` | ^10.10.0 | Análise estática do código. |
| `eslint-config-next` | ^16.3.4 | Regras de lint para Next.js e TypeScript. |
| `postcss` | ^8.5.28 | Processamento de CSS. |
| `@types/pg` | ^8.23.1 | Tipos do driver PostgreSQL. |
| `@types/react` | 19.3.0 | Tipos do React. |

## Como executar localmente

### 1. Pré-requisitos

- Node.js compatível com o Prisma instalado: `^20.19`, `^22.12` ou `>=24.0`.
- npm e Git.
- PostgreSQL em execução, com um banco vazio para testes e um usuário com permissão para criar e alterar tabelas. O banco deve oferecer a função `gen_random_uuid()`, utilizada nas migrações.
- Acesso à internet para instalar dependências e baixar as fontes utilizadas por `next/font/google` durante a compilação.

### 2. Obter o projeto e instalar dependências

```bash
git clone https://github.com/Phonedison/toDoList_in_nextJs.git
cd toDoList_in_nextJs
npm ci
```

Se o projeto já estiver na máquina, abra o terminal na pasta dele e execute `npm ci`.

### 3. Configurar o banco

Crie um banco de testes, por exemplo `todolist`, usando seu cliente PostgreSQL. Em seguida, crie um arquivo `.env` na raiz do projeto:

```dotenv
DATABASE_URL="postgresql://USUARIO:SENHA@localhost:5432/todolist?schema=public"
```

Substitua `USUARIO`, `SENHA`, host e porta pelos dados da sua instalação. Caracteres especiais nas credenciais precisam estar codificados para uso em URL. A variável é usada tanto pelo Prisma CLI quanto pela conexão da aplicação.

### 4. Preparar as tabelas e o cliente Prisma

```bash
npx prisma migrate deploy
npx prisma generate
```

O projeto já contém migrações em `schema/migrations`. A configuração em `prisma.config.ts` aponta para `schema/schema.prisma`, e o cliente é gerado em `src/generated/prisma`.

### 5. Iniciar a aplicação

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000). Se essa porta estiver ocupada, utilize o endereço informado no terminal. Para encerrar o servidor, pressione `Ctrl+C`.

## Como testar a aplicação

Com o banco configurado e o servidor em execução, siga este roteiro manual:

| Teste | Ação | Resultado esperado / observação |
| --- | --- | --- |
| Lista vazia | Abrir a aplicação com o banco vazio. | Mensagem de ausência de atividades, total zero e progresso zerado. |
| Cadastro | Adicionar `Estudar Next.js` e `Revisar tarefas`. | Duas tarefas pendentes na lista e contador `0/2`. |
| Campo vazio | Clicar em **Adicionar** sem preencher o campo. | Notificação solicitando uma atividade, sem novo registro. |
| Conclusão | Clicar no texto de `Estudar Next.js`. | Texto riscado, faixa verde, contador `1/2` e barra em 50%. |
| Filtros | Alternar entre os três filtros. | Todas mostra duas tarefas; pendentes e concluídas mostram uma cada. O total permanece dois. |
| Reabrir tarefa | Clicar no texto da tarefa concluída e depois concluí-la novamente. | O status alterna e os indicadores acompanham a mudança. |
| Persistência | Recarregar a página. | As tarefas e seus estados permanecem salvos. |
| Edição | Abrir o lápis, alterar o texto e clicar em **Editar**. | A janela existe, mas o novo texto não é salvo devido à falha conhecida abaixo. |
| Cancelar limpeza | Clicar em **Limpar tarefas concluídas** e depois **Cancelar**. | Nenhuma tarefa é removida. |
| Confirmar limpeza | Abrir a limpeza novamente e clicar em **Continuar**. | Apenas a tarefa concluída é removida; a pendente permanece. |
| Exclusão individual | Na visualização **Todas**, clicar na lixeira da tarefa restante. | Exclusão imediata e retorno ao estado vazio. |

### Verificações de código e execução de produção

Não há script `test` nem suíte de testes automatizados configurada no `package.json`. Para analisar o código da aplicação com a configuração existente:

```bash
npx eslint src --ignore-pattern "src/generated/**"
```

Para testar a compilação e o servidor de produção, encerre antes o servidor de desenvolvimento se for utilizar a mesma porta:

```bash
npm run build
npm run start
```

Esses comandos dependem do ambiente configurado e podem revelar problemas existentes no projeto; não representam uma garantia de que as verificações passaram.

## Scripts disponíveis

| Comando | Descrição |
| --- | --- |
| `npm run dev` | Inicia o servidor de desenvolvimento. |
| `npm run build` | Compila a aplicação para produção. |
| `npm run start` | Inicia o servidor de produção após uma compilação bem-sucedida. |
| `npm run lint` | Atualmente aponta para `next lint`, comando ausente na CLI instalada. Use a chamada direta ao ESLint indicada acima. |

## Estrutura do projeto

```text
schema/
  schema.prisma          # Modelo de dados
  migrations/            # Histórico de alterações do banco
src/
  actions/               # Server Actions: cadastro, leitura, edição e exclusão
  app/                   # Página principal, layout e estilos globais
  components/            # Entrada, lista, filtros, edição e rodapé
    ui/                  # Componentes reutilizáveis da interface
  contexts/              # Estado compartilhado e operações das tarefas
  generated/prisma/      # Cliente Prisma gerado
  lib/                   # Utilitários de interface
  utils/db.ts            # Conexão PostgreSQL com Prisma
prisma.config.ts          # Configuração do Prisma CLI
```

O modelo `Tasks` armazena `id` (UUID), `task` (texto), `done` (status, inicialmente `false`) e `createdAt` (data de criação). A interface usa Context API para compartilhar o estado e chama Server Actions para acessar o banco.

## Limitações conhecidas

- **Edição:** em `src/actions/edit-task.ts`, a condição `if (newTask) return` interrompe a atualização quando o texto está preenchido. Portanto, a edição de textos válidos não é persistida; um texto vazio pode chegar à atualização do banco.
- **Validação:** o cadastro verifica texto vazio, mas não remove espaços antes da validação. Uma entrada contendo apenas espaços pode ser cadastrada.
- **Lista compartilhada:** não há autenticação nem separação de tarefas por usuário. As instâncias conectadas ao mesmo banco acessam a mesma lista.
- **Filtros sem resultados:** a mensagem de ausência de atividades também aparece quando o filtro selecionado não encontra tarefas, mesmo que existam registros em outro status.
- **Lint:** o script do projeto precisa ser atualizado para chamar o ESLint diretamente.

## Licença

O `package.json` declara a licença ISC.
