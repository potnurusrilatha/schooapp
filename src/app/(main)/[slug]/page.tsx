import { getSinglePost } from "@/utils/supabase/queries";
import { createClient } from "@/utils/supabase/server-client";
import EditButton from "./EditButton";
import DeleteButton from "./DeleteButton";
import Comments from "@/components/Comments"; // ← CHANGED THIS LINE

const SinglePost = async ({ params }: { params: { slug: string } }) => {
  const { slug } = await params;
  console.log("Fetching post for slug:", slug);
  const { data, error } = await getSinglePost(slug);

  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();
  const isAuthor = user?.id === data?.user_id ? true : false;

  if (error) {
    console.error("Error fetching post:", error);
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-2">
            Error loading post
          </h2>
          <p className="text-gray-600">Post not found or error occurred</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-2">
            Post not found
          </h2>
          <p className="text-gray-600">The requested post could not be found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      {data && (
        <>
          {/* 🌟 Main Post Card */}
          <article className="bg-white rounded-2xl shadow-xl border border-gray-300 overflow-hidden transition hover:shadow-2xl ">

            {/* 🧾 Header */}
            <div className=" p-8 border-b border-gray-100 bg-gradient-to-r from-gray-150 to-gray-200">
              <h1 className="text-4xl font-bold text-gray-900 mb-3 capitalize text-center">
                {data.title}
              </h1>
            </div>

            {/* 🖼️ Image Section */}
            {data.image && (
              <div className="w-full max-h-[450px] overflow-hidden bg-gray-50">
                <img
                  src={data.image}
                  alt={data.title}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            )}

            {/* 📝 Content Section */}
            {data.content && (
              <div className="p-8">
                <div className="prose prose-lg max-w-none text-gray-800 leading-relaxed">
                  <div className="whitespace-pre-wrap">{data.content}</div>
                </div>
              </div>
            )}

            {/* ✏️ Author Actions */}
            <div className="p-6 border-t border-gray-200 bg-gray-50">
              <div className="flex justify-between items-center">
                {isAuthor ? (
                  <div className="flex gap-4">
                    <DeleteButton postId={data.id} />
                    <EditButton slug={data.slug} />
                  </div>
                ) : (
                  <div></div>
                )}

                <div className="flex items-center gap-2 text-gray-600 text-sm">
                  <div className="w-9 h-9 bg-gradient-to-br from-gray-600 to-green-400 rounded-full flex items-center justify-center text-white font-semibold shadow-sm">
                    {data.users?.username?.charAt(0).toUpperCase()}
                  </div>
                  <span className="font-medium">
                    By{" "}
                    <span className="text-gray-800 font-semibold">
                      {data.users?.username}
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </article>

          {/* 💬 Comments Section */}
          <Comments
            postId={data.id}
            postAuthorId={data.user_id}
            currentUserId={user?.id || null}
            isAuthenticated={!!user}
          />
        </>
      )}
    </div>
  );
};

export default SinglePost;