import { getSinglePost } from "@/utils/supabase/queries";
import { createClient } from "@/utils/supabase/server-client";
import EditButton from "./EditButton";
import DeleteButton from "./DeleteButton";
import Comments from "@/components/Comments";
import { Calendar, User, ArrowLeft } from "lucide-react";
import Link from "next/link";

const SinglePost = async ({ params }: { params: { slug: string } }) => {
  const { slug } = await params;
  const { data, error } = await getSinglePost(slug);

  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();
  const isAuthor = user?.id === data?.user_id;

  if (error || !data) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-12 text-center">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Calendar className="text-red-600" size={40} />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {error ? "Error loading post" : "Post not found"}
          </h2>
          <p className="text-gray-600 mb-8">
            {error ? "Something went wrong. Please try again later." : "The requested post could not be found."}
          </p>
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
          >
            <ArrowLeft className="mr-2" size={20} />
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center text-gray-600 hover:text-red-600 transition-colors mb-6 font-medium"
        >
          <ArrowLeft className="mr-2" size={20} />
          Back to all posts
        </Link>

        {/* Main Post Card */}
        <article className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden mb-8">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-red-600 to-red-700 p-8 md:p-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              {data.title}
            </h1>
            
            {/* Author Info */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                <span className="text-red-600 font-bold text-lg">
                  {data.users?.username?.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="text-white">
                <p className="font-semibold text-lg">{data.users?.username}</p>
                <p className="text-red-100 text-sm">Author</p>
              </div>
            </div>
          </div>

          {/* Image Section */}
          {data.image && (
            <div className="w-full max-h-[500px] overflow-hidden bg-gray-100">
              <img
                src={data.image}
                alt={data.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Content Section */}
          {data.content && (
            <div className="p-8 md:p-12">
              <div className="prose prose-lg max-w-none">
                <div className="text-gray-800 leading-relaxed whitespace-pre-wrap text-lg">
                  {data.content}
                </div>
              </div>
            </div>
          )}

          {/* Author Actions */}
          {isAuthor && (
            <div className="p-6 md:p-8 border-t border-gray-200 bg-gray-50">
              <div className="flex gap-4">
                <EditButton slug={data.slug} />
                <DeleteButton postId={data.id} />
              </div>
            </div>
          )}
        </article>

        {/* Comments Section */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          <Comments
            postId={data.id}
            postAuthorId={data.user_id}
            currentUserId={user?.id || null}
            isAuthenticated={!!user}
          />
        </div>
      </div>
    </div>
  );
};

export default SinglePost;