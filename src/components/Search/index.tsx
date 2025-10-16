'use client'


import { Search } from "lucide-react";
import { SetStateAction, useState } from "react";
import{ useQuery } from '@tanstack/react-query';
import { getSearchPosts } from "@/utils/supabase/queries";
 import Link from "next/link"

const SearchInput = () => {
    const[userInput, setUserInput] = useState<string>('')

    const {data} = useQuery({
        queryKey: ['search-results', userInput],
        queryFn: async () => {
            const {data, error} = await getSearchPosts(userInput);
            if(error) throw error;
            return data;
        },
        enabled: userInput && userInput.length > 3 ? true : false
    })


    const handleChange = (e:{target: { value:SetStateAction<string>; };} ) => {
        setUserInput(e.target.value);


}

    return (
    <div className="relative">
        <div className="p-2 flex items-center gap-2 ">
            <Search size={24} className="text-gray-500" />
  <input onChange={handleChange}
    className="border-1 rounded-xl p-2 "
    type="text"
    name="search"
    placeholder="Search by post title"
    value={userInput}
    
    aria-label="Search posts by title"
  />
</div>

{data &&
    <div onClick={()=> setUserInput('')} className="absolute bg-white p-2 rounded-xl" >
        {data.map(({title, slug}) => <Link key={slug} className="block" href={`/${slug}`}>{title}</Link>)}
        </div>
 }
</div>

    )
    
}
export default SearchInput;