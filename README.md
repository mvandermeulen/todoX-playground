![made-with-typescript](https://shields.io/badge/TypeScript-3178C6?logo=TypeScript&logoColor=FFF&style=flat-square)

<div align="center" >
  <img align="center" src="https://lohxt1.github.io/_assets/todox.png" alt="TodoX"/>
  <h1 
    align="center"
    style="text-decoration:underline;text-decoration-style:dashed"
  >TodoX</h1>
  <a href="https://github.com/trpc/trpc/blob/main/LICENSE">
    <img alt="MIT License" src="https://img.shields.io/github/license/trpc/trpc" />
  </a>
  <a href="https://twitter.com/lohxt">
    <img alt="Twitter" src="https://img.shields.io/twitter/url.svg?label=%40lohxt&style=social&url=https%3A%2F%2Ftwitter.com%2Flohxt" />
  </a>
  <br />
</div>

<p align="center" style="font-weight:400;font-size:20px;">
  An minimal todo app with paswordless auth.<br />Created using the <a href="https://github.com/trpc/trpc/blob/main/LICENSE">
    Next-magic-link-auth
  </a> starter template
</p>

#### Tech Stack

- [Next.js](https://nextjs.org/) – `framework`
- [Typescript](https://www.typescriptlang.org/) – `language`
- [Tailwind](https://tailwindcss.com/) – `CSS`
- [Prisma](https://prisma.io/) – `ORM`
- [Postgresql](https://railway.app/) – `database`
- [NextAuth.js](https://next-auth.js.org/) – `auth`
- [Vercel](https://vercel.com/) – `hosting`

#### Running the code `locally`

To run the code locally, open _Terminal_ in your `projects` folder and take the steps:

```bash
# STEP 1: Get sources from GitHub
$ git clone https://github.com/lohxt1/todoX.git
$ cd todoX

# STEP 2: Install the requirements
$ npm install

# STEP 3: Setting up Prisma

# Modify the schema if required and validate it by running
$ npx prisma validate

# Generate Prisma client
$ npx prisma generate

# Push the schema changes
# make sure you have the right DATABASE_URL in .env file
$ npx prisma db push

# STEP 4: Running the app in dev mode
$ npm run dev
```

#### Additional plugins/libraries

- `prettier-plugin-sort-imports` - To sort all the imports in a particular order
- `prettier-plugin-tailwindcss` - To sort the tailwind classnames
- `clsx` & `tailwind-merge` - To organize and improve the readabilty of the tailwind classes

#### Implementation

- `TodoX` is built as a standard Next.js application with a customizable middleware.
- `Passwordless authentication` using custom email-links.
- `Optimistic UI` achieved by the [SWR](https://github.com/vercel/swr) v2.0 library
- [Planetscale](https://www.planetscale.com/) is used as the database for storing user data and todos. You can refer to the _Prisma schema_ [here](/prisma/schema.prisma).
