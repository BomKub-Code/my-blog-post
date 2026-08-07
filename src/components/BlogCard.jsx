import Link from 'next/link'

// การ์ดแสดงโพสต์จริงจาก API (ใช้ใน ArticleSection) รูปและหัวข้อคลิกได้เพื่อไปหน้ารายละเอียด
function BlogCard({ id, image, category, title, description, author, date }) {
  return (
    <div className="group flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out fill-mode-both">
      <Link href={`/post/${id}`} className="relative h-[212px] sm:h-[360px] overflow-hidden rounded-2xl shadow-sm transition-all duration-500 group-hover:shadow-xl group-hover:-translate-y-1">
        <img
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          src={image}
          alt={title}
        />
        <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/10"></div>
      </Link>
      <div className="flex flex-col px-2">
        <div className="flex">
          <span className="bg-green-200 dark:bg-green-900/40 rounded-full px-3 py-1 text-sm font-semibold text-green-700 dark:text-green-400 mb-3 transition-colors duration-300">
            {category}
          </span>
        </div>
        <Link href={`/post/${id}`} className="group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
          <h2 className="text-start font-bold text-xl mb-3 line-clamp-2 leading-tight">
            {title}
          </h2>
        </Link>
        <p className="text-muted-foreground text-sm mb-4 grow line-clamp-3">
          {description}
        </p>
        <div className="flex items-center text-sm">
          <img
            className="w-8 h-8 rounded-full mr-2"
            src="https://res.cloudinary.com/dcbpjtd1r/image/upload/v1728449784/my-blog-post/xgfy0xnvyemkklcqodkg.jpg"
            alt={author}
          />
          <span>{author}</span>
          <span className="mx-2 text-gray-300">|</span>
          <span>{date}</span>
        </div>
      </div>
    </div>
  );
}

export default BlogCard;
