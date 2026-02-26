# Contador

Aplicação de contador e timer com suporte a contagem progressiva/regressiva, modo de edição e notificações por intervalo.

## Estrutura

Organizado com arquitetura baseada em features — cada feature é isolada com seus próprios componentes, hooks e store.

```
src/
  features/
    counter/
      components/
      hooks/
      store/
  pages/
  store/
```

## Stack

React 19 + TypeScript com Vite, estado gerenciado via Redux Toolkit com persistência local (redux-persist), UI com Material UI e Tailwind CSS, e suporte a PWA via vite-plugin-pwa.

## Requisitos

- Node.js 20+

## Instalação e uso

```bash
npm install
npm run dev
```
