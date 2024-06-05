import React from "react";
import { PrismaClient } from "@prisma/client";
import prisma from "@/lib/db";

const page = async () => {
  const tests = await prisma.testEntity.findMany();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col space-y-6">
        {tests.map((test) => (
          <div key={test.id}>
            <h1>{test.name}</h1>
            <p>{test.description}</p>
            <p>{test.checkin ? <p>YES</p> : <p>NO</p>}</p>
          </div>
        ))}
      </div>
    </main>
  );
};

export default page;
