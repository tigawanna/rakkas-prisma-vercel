import { Head, Page, useSSM, useSSQ } from "rakkasjs";
import { Suspense, useState } from "react";
import {prisma } from "@/lib/db/prisma"

const HomePage: Page = function HomePage({}) {
  const [input,setInput]=useState({name:"",description:""});


  const query = useSSQ(async(ctx)=>{
    return prisma?.stuff.findMany().catch((e)=>{
      console.log("error fetching === ",e)
    });
  })

  console.log({query})

  const mutation = useSSM(async(ctx,vars:{name:string,description:string})=>{
    return prisma?.stuff.create({
      data:{
        name:vars?.name,
        description:vars?.description
      }
    }).catch((e)=>{
      console.log("error creating === ",e)
    })
  })
function createTodo(e:React.FormEvent<HTMLFormElement>){
  e.preventDefault();
  if(mutation.isLoading) return
  if(input.name.length<5||input.description.length<10) return
  mutation.mutate({name:input.name,description:input.description})
}
  return (
    <main>
      <Head
        title="Rakkas Prisma Vercel"
        description="Rakkasjs with Prisma + postgres deployed on  Vercel"
        faviconIco={{
          tagName: "link",
          rel: "icon",
          href: "/favicon.ico",
        }}
      />
      <h1>Hello world!</h1>
      <p>Welcome to the Rakkas demo page 💃</p>
      <p>
        Try editing the files in <code>src/routes</code> to get started or go to
        the{" "}
        <a href="https://rakkasjs.org" target="_blank" rel="noreferrer">
          website
        </a>
        .
      </p>
      {/* <Suspense fallback={<div>Loading...</div>}>
      {data?.map((item) => {
        return (
          <div key={item.id}>
            <h2>{item.name}</h2>
            <p>{item.description}</p>
          </div>
        );
      })}
      </Suspense> */}
      <div>
        <form className="" onSubmit={createTodo}>
          <div>
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              value={input.name}
              onChange={(e) => {
                setInput({ ...input, name: e.target.value });
              }}
            />
          </div>
          <div>
            <label htmlFor="descrition">Description</label>
            <textarea
              id="descrition"
              value={input.description}
              onChange={(e) => {
                setInput({ ...input, description: e.target.value });
              }}
            />
          </div>
          <button type="submit">
            {mutation.isLoading ? "submitting..." : "submit"}
          </button>
          {(mutation?.error as any) && (
            <p>{JSON.stringify((mutation?.error as any) ?? {}, null, 2)}</p>
          )}
          {mutation.isSuccess && <p>Success</p>}
        </form>
      </div>
    </main>
  );
};

export default HomePage;
