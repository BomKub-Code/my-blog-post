const categoryStyles = {
  Cat: 'bg-[#2f4a3c] text-white',
  General: 'bg-black text-white',
  Inspiration: 'bg-[#e0eafc] text-[#2563eb]',
}

function ArticleCard({ image, category, title, description, author, date }) {
  return (
    <article className="flex flex-col gap-4 text-left">
      <img
        src={image}
        alt={title}
        className="h-64 w-full rounded-2xl object-cover"
      />
      <span
        className={`w-fit rounded-full px-3 py-1 text-xs font-medium ${categoryStyles[category] ?? 'bg-black/5 text-[var(--text-h)]'}`}
      >
        {category}
      </span>
      <h3 className="!m-0 text-lg font-semibold text-[var(--text-h)]">
        {title}
      </h3>
      <p className="text-sm text-[var(--text)]">{description}</p>
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 rounded-full bg-[var(--code-bg)]" />
        <div className="flex flex-col text-xs text-[var(--text)]">
          <span className="font-medium text-[var(--text-h)]">{author}</span>
          <span>{date}</span>
        </div>
      </div>
    </article>
  )
}

export default ArticleCard
