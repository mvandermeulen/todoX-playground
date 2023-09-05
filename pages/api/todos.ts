import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth/next";
import prisma from "@/lib/prisma";
import { authOptions } from "./auth/[...nextauth]";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session) {
    // res.send({ content: "This is protected content. You can access this content because you are signed in.", })
    res.status(400).send({
      message:
        "This is protected content. You can access this content because you are signed in.",
    });
  }

  if (req.method === "GET") {
    // get all todos
    const todos = await prisma.todo.findMany({
      where: { userId: session?.user?.id },
      orderBy: { createdAt: "desc" },
    });
    res.json(todos);
  }

  if (req.method === "POST") {
    // create todo
    const _todo = JSON.parse(req.body);
    console.log(_todo);
    const todo = await prisma.todo.create({
      data: { ..._todo },
    });

    res.json(todo);
  } else if (req.method === "PUT") {
    // update todo
    const id = req.query.todoId as string;
    const data = JSON.parse(req.body);
    const todo = await prisma.todo.update({
      where: { id },
      data,
    });

    res.json(todo);
  } else if (req.method === "DELETE") {
    // delete todo
    const id = req.query.todoId as string;
    await prisma.todo.delete({ where: { id } });

    res.json({ status: "ok" });
  }
};
