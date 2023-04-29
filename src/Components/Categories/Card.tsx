import Link from "next/link";
import Image from "next/image";

//Apollo
import { useQuery } from "@apollo/client";
import { GET_CATEGORIES } from "@/Apollo/Query/category.query";
import { GetCategoriesData } from "@/Apollo/Types/category.types";

const Card = () => {
    //Apollo
    const { data } = useQuery<GetCategoriesData>(GET_CATEGORIES);
    return (
        <div className="grid grid-cols-2 gap-6">
            {data?.categories.map((item, i) => (
                <Link href={`/category/${item.slug}`} className="flex gap-3 my-1 bg-white p-2 rounded transition-all hover:shadow-lg">
                    <div className="basis-[20%]">
                        <Image src={item.image.url} alt={item.name} width={80} height={80} className="w-full" placeholder="blur" blurDataURL={item.image.url} />
                    </div>
                    <div className="flex-1">
                        <h2 className="text-xl font-bold">{item.name}</h2>
                        <p className="opacity-70">{item.description}</p>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default Card;