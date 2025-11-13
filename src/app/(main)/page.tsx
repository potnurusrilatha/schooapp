import { getHomePosts } from "@/utils/supabase/queries";
import { createClient } from "@/utils/supabase/browser-client";
import Link from "next/link";
import Search from "@/components/Search";

export const revalidate = 600;

export default async function Home() {
  const supabase = createClient();
  const { data, error } = await getHomePosts(supabase);

  if (error) return <p className="text-center text-red-500 mt-10">Failed to load posts.</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">
          Latest Posts
        </h1>
        <div className="w-full md:w-1/3">
          <Search />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data &&
          data.map(({ id, title, slug, image, users }) => (
            <Link
              href={`/${slug}`}
              key={id}
              className="block bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-6 border border-gray-200"
            >
              <h2 className="font-bold text-xl mb-2 text-gray-800">{title}</h2>
              <p className="text-gray-500 text-right">by {users.username}</p>
              {image ? <img src={`${image}`} /> :<p> No image</p>}

            </Link>
          ))}
      </div>
    </div>
  );
}
