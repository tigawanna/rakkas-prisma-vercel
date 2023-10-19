import { useSSQ } from "rakkasjs";
import { Suspense } from "react";

interface ListProps {

}

export function List({}:ListProps){
    const query = useSSQ(async(ctx)=>{
    return prisma?.stuff.findMany().catch((e)=>{
      console.log("error fetching === ",e)
    });
  })

  console.log({query})
  const data = query.data;
return (
  <div className="w-full h-full flex items-center justify-center">
    <Suspense fallback={<div>Loading...</div>}>
      {data?.map((item) => {
        return (
          <div key={item.id}>
            <h2>{item.name}</h2>
            <p>{item.description}</p>
          </div>
        );
      })}
      </Suspense>
  </div>
);
}
