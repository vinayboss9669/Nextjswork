import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";
import fs from "fs";
import path from "path";

export default function BlogPost({ post }) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <article className="max-w-4xl mx-auto px-4 py-12">
      <Head>
        <title>{post.title} - Hunting Coder</title>
      </Head>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="relative h-[400px]">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover"
          />
        </div>

        <div className="p-8">
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <div className="prose max-w-none">{post.content}</div>
        </div>
      </div>
    </article>
  );
}

export async function getStaticPaths() {
  const blogDir = path.join(process.cwd(), "blogdata");
  const files = fs.readdirSync(blogDir);
  const paths = files.map((filename) => ({
    params: { slug: filename.replace(".json", "") },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const filePath = path.join(
    process.cwd(),
    "blogdata",
    `${params.slug}.json`
  );
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const post = JSON.parse(fileContent);

  return {
    props: {
      post: { ...post, slug: params.slug },
    },
  };
}