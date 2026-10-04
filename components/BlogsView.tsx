"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, Clock, Calendar } from "lucide-react";
import { BLOG_POSTS, VENDOR_NOTICE } from "@/lib/site";

export default function BlogsView() {
  const [selectedPost, setSelectedPost] = useState<typeof BLOG_POSTS[0] | null>(null);

  return (
    <div className="pt-28 pb-20 bg-[#1e2025]">
      {/* Header */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-16 text-center">
        <span className="text-xs uppercase tracking-[0.4em] text-gold font-sans font-medium">
          Architectural Insights
        </span>
        <h1 className="mt-3 font-serif text-4xl sm:text-6xl font-light text-fg">
          Design Journals &amp; Trends
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-muted font-light">
          Thought pieces on colour psychology, spatial serenity, acoustic engineering, and high-performance modern interiors.
        </p>
      </section>

      {/* Articles Grid */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-8">
        <div className="grid gap-12 lg:grid-cols-3">
          {BLOG_POSTS.map((post) => (
            <article
              key={post.slug}
              className="border border-line/60 bg-[#25282f] flex flex-col justify-between overflow-hidden shadow-xl group"
            >
              <div>
                <div className="relative h-64 w-full overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1d1f24] via-transparent to-transparent opacity-80" />
                </div>

                <div className="p-8 space-y-4">
                  <div className="flex items-center gap-4 text-xs text-gold uppercase tracking-widest">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="h-3 w-3" /> {post.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-3 w-3" /> {post.readTime}
                    </span>
                  </div>

                  <h2 className="font-serif text-2xl font-light text-fg leading-snug group-hover:text-gold-light transition-colors">
                    {post.title}
                  </h2>

                  <p className="text-xs text-muted leading-relaxed font-light line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-8 pt-0">
                <button
                  onClick={() => setSelectedPost(post)}
                  className="w-full border border-gold/40 py-2.5 text-xs uppercase tracking-widest text-gold hover:bg-gold hover:text-[#202328] transition-colors flex items-center justify-center gap-2"
                >
                  <BookOpen className="h-3.5 w-3.5" /> Read Article
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Article Detail Modal */}
      {selectedPost && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 md:p-8 overflow-y-auto"
          onClick={() => setSelectedPost(null)}
        >
          <div
            className="relative max-w-3xl w-full bg-[#22252a] border border-gold/40 p-8 md:p-12 shadow-2xl my-8 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedPost(null)}
              className="absolute top-6 right-6 text-muted hover:text-gold text-sm uppercase tracking-widest"
            >
              ✕ Close
            </button>

            <div className="space-y-4">
              <span className="text-xs uppercase tracking-[0.3em] text-gold font-sans font-medium">
                {selectedPost.date} · {selectedPost.readTime}
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-fg font-light">
                {selectedPost.title}
              </h2>
              <p className="font-serif text-lg italic text-gold-light">
                {selectedPost.subtitle}
              </p>

              <div className="relative h-80 w-full overflow-hidden border border-line my-6">
                <img
                  src={selectedPost.image}
                  alt={selectedPost.title}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="space-y-4 text-sm leading-relaxed text-muted font-light">
                {selectedPost.content.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              <div className="pt-8 border-t border-line/40 flex items-center justify-between">
                <Link
                  href="/contact"
                  className="gold-bg px-6 py-2.5 text-xs uppercase tracking-widest font-semibold text-[#202328]"
                >
                  Discuss With Our Designers
                </Link>
                <button
                  onClick={() => setSelectedPost(null)}
                  className="text-xs uppercase tracking-widest text-muted hover:text-gold"
                >
                  Back to Articles
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Vendor Notice Banner */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 mt-16">
        <div className="border border-gold/30 bg-[#25282f] p-8 text-center space-y-3">
          <span className="text-xs uppercase tracking-[0.3em] text-gold font-semibold">
            {VENDOR_NOTICE.title}
          </span>
          <p className="mx-auto max-w-3xl text-xs text-muted leading-relaxed font-light">
            {VENDOR_NOTICE.text}
          </p>
        </div>
      </section>
    </div>
  );
}
