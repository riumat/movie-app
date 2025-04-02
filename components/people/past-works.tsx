import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PersonData } from "@/lib/types/person.types";
import Link from "next/link";


const PastWorks = ({ personData }: { personData: PersonData }) => {
  return (
    <Tabs defaultValue="cast" className="lg:w-[550px] h-[90vh] mx-5 ">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="cast">Acting</TabsTrigger>
        <TabsTrigger value="crew">Production</TabsTrigger>
      </TabsList>
      <TabsContent value="cast" className="lg:h-[90%] lg:overflow-y-auto  lg:scrollbar-thin" >
        <div className="w-full flex flex-col">
          {personData.cast_credits.map((content, index) => (
            <Link
              href={`/${content.media_type}/${content.id}`}
              key={`${index}-cast`}
              className="flex flex-col hover:font-bold hover:bg-secondary rounded-md pl-2 duration-200">
              <div className="flex gap-6 text-xs lg:text-sm items-center py-3 w-full ">
                <p >{content.release_date.slice(0, 4)}</p>
                <div className="flex-1 flex flex-col gap-1 justify-start  ">
                  <div className="flex gap-2  ">
                    <p className="font-semibold max-w-[200px] lg:max-w-[320px] truncate"> {content.title ?? content.name}</p>
                    <p className="font-extralight ">{content.media_type === "movie" ? "(Movie)" : "(Tv)"}</p>
                  </div>
                  {content.character && <p className="font-extralight">as {content.character}</p>}
                </div>

              </div>
              {index !== personData.cast_credits.length - 1 && <Separator />}
            </Link>
          ))}
        </div>
      </TabsContent>
      <TabsContent value="crew" className="lg:h-[90%] lg:overflow-y-auto  lg:scrollbar-thin">
        <div className="w-full flex flex-col ">
          {personData.crew_credits.map((content, index) => (
            <Link
              href={`/${content.media_type}/${content.id}`}
              key={`${index}-crew`}
              className="flex flex-col hover:font-bold hover:bg-secondary rounded-md pl-2 duration-200">
              <div className="flex gap-6 text-xs lg:text-sm items-center py-3 w-full ">
                <p >{content.release_date.slice(0, 4)}</p>
                <div className="flex-1 flex flex-col gap-1 justify-start ">
                  <div className="flex gap-2">
                    <p className="font-semibold max-w-[200px] lg:max-w-[320px] truncate"> {content.title ?? content.name}</p>
                    <p className="font-extralight">{content.media_type === "movie" ? "(Movie)" : "(Tv)"}</p>
                  </div>
                  {content.job && <p className="font-extralight">as {content.job}</p>}
                </div>

              </div>
              {index !== personData.cast_credits.length - 1 && <Separator />}
            </Link>
          ))}
        </div>
      </TabsContent>
    </Tabs>

  )
}

export default PastWorks;