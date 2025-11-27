import { getHomePosts } from "@/utils/supabase/queries";
import { createClient } from "@/utils/supabase/browser-client";
import Link from "next/link";
import Search from "@/components/Search";
import { MessageCircle, Calendar, User, ArrowRight } from "lucide-react";

export const revalidate = 600;

export default async function Home() {
    const data = await getHomePosts();

  if (!data || data.length === 0) {
    // Handle empty state below
  }
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-red-600 via-red-700 to-red-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Welcome to StoryWave
            </h1>
            <p className="text-xl md:text-2xl text-red-100 mb-8">
              Discover stories, thinking, and expertise from writers on any topic.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/create"
                className="px-8 py-3 bg-white text-red-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center"
              >
                Start Writing
                <ArrowRight className="ml-2" size={20} />
              </Link>
              <Link
                href="/signup"
                className="px-8 py-3 bg-red-800 text-white rounded-lg font-semibold hover:bg-red-900 transition-colors border-2 border-white inline-flex items-center justify-center"
              >
                Join Community
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Search and Filter Section */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Latest Posts</h2>
              <p className="text-gray-600">Explore the most recent articles from our community</p>
            </div>
            <div className="w-full md:w-96">
              <Search />
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Posts</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{data?.length || 0}</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <Calendar className="text-red-600" size={24} />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Active Writers</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">
                  {data ? new Set(data.map(p => p.users.username)).size : 0}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <User className="text-blue-600" size={24} />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Comments</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">
                  {data?.reduce((acc, post) => acc + (post.comments?.length || 0), 0) || 0}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <MessageCircle className="text-green-600" size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data &&
            data.map(({ id, title, slug, image, users, comments }) => {
              const commentCount = comments?.length || 0;
              
              return (
                <article
                  key={id}
                  className="group bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300"
                >
                  <Link href={`/${slug}`}>
                    {/* Image Section */}
                    {image ? (
                      <div className="relative w-full h-56 overflow-hidden bg-gray-100">
                        <img 
                          src={image} 
                          alt={title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                    ) : (
                      <div className="w-full h-56 bg-gradient-to-br from-red-100 via-red-200 to-red-300 flex items-center justify-center">
                        <div className="text-center">
                          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-2">
                            <Calendar className="text-red-600" size={32} />
                          </div>
                          <p className="text-red-700 font-medium">No image</p>
                        </div>
                      </div>
                    )}

                    {/* Content Section */}
                    <div className="p-6">
                      <h3 className="font-bold text-xl mb-3 text-gray-900 line-clamp-2 group-hover:text-red-600 transition-colors">
                        {title}
                      </h3>
                      
                      {/* Author Info */}
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-8 h-8 bg-gradient-to-br from-red-600 to-red-800 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                          {users.username?.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {users.username}
                          </p>
                        </div>
                      </div>

                      {/* Footer */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="flex items-center gap-2 text-gray-600">
                          <MessageCircle size={16} />
                          <span className="text-sm font-medium">
                            {commentCount} {commentCount === 1 ? 'comment' : 'comments'}
                          </span>
                        </div>
                        <span className="text-red-600 font-medium text-sm group-hover:underline">
                          Read more →
                        </span>
                      </div>
                    </div>
                  </Link>
                </article>
              );
            })}
        </div>

        {/* Empty State */}
        {data && data.length === 0 && (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="text-gray-400" size={40} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No posts yet</h3>
            <p className="text-gray-600 mb-6">Be the first to share your story!</p>
            <Link
              href="/create"
              className="inline-flex items-center px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
            >
              Create First Post
              <ArrowRight className="ml-2" size={20} />
            </Link>
          </div>
        )}
      </div>
    </>
  );
}