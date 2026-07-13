import ArticleCard from './ArticleCard'

const articles = [
  {
    image: 'https://picsum.photos/seed/cat-behavior/600/450',
    category: 'Cat',
    title: 'Understanding Cat Behavior: Why Your Feline Friend Acts the Way They Do',
    description:
      "Cats are often seen as mysterious creatures, with their unique behaviors and habits that can sometimes leave us puzzled. Understanding why they act the way they do is key to building a stronger bond with your feline friend.",
    author: 'Thompson P.',
    date: '11 September 2024',
  },
  {
    image: 'https://picsum.photos/seed/cat-and-hand/600/450',
    category: 'Cat',
    title: 'The Fascinating World of Cats: Why We Love Our Furry Friends',
    description:
      'Cats have captivated hearts for centuries with their charm and independence, whether lounging in a sunny spot or playfully chasing a string, their curious antics never fail to bring joy.',
    author: 'Thompson P.',
    date: '11 September 2024',
  },
  {
    image: 'https://picsum.photos/seed/neon-sign/600/450',
    category: 'Cat',
    title: "Finding Motivation: How to Stay Inspired Through Life's Challenges",
    description:
      "This article explores techniques to maintain motivation, even amid personal setbacks, offering practical tips for staying focused on your dreams.",
    author: 'Thompson P.',
    date: '11 September 2024',
  },
  {
    image: 'https://picsum.photos/seed/cat-purr/600/450',
    category: 'Cat',
    title: "The Science of the Cat's Purr: How It Benefits Cats and Humans Alike",
    description:
      'Discover the healing science behind the purr, and how listening to your cat can boost relaxation for both cat and human alike.',
    author: 'Thompson P.',
    date: '11 September 2024',
  },
  {
    image: 'https://picsum.photos/seed/notebook-desk/600/450',
    category: 'Cat',
    title: 'Unlocking Creativity: Simple Habits to Spark Inspiration Daily',
    description:
      'Discover practical ways to fuel creativity in your everyday life. Effective it through journaling, taking a walk, and embracing new hobbies, this article explores easy habits.',
    author: 'Thompson P.',
    date: '11 September 2024',
  },
  {
    image: 'https://picsum.photos/seed/cat-and-dog/600/450',
    category: 'Cat',
    title: 'Top 10 Health Tips to Keep Your Cat Happy and Healthy',
    description:
      'This guide offers essential tips on keeping your cat happy and healthy. Covering topics like proper nutrition, regular vet visits, grooming, and mental stimulation.',
    author: 'Thompson P.',
    date: '11 September 2024',
  },
]

function LatestArticles() {
  return (
    <section className="mx-6 my-10 text-left">
      <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2">
        {articles.map((article) => (
          <ArticleCard key={article.title} {...article} />
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <button className="rounded-full border border-[var(--text-h)] px-6 py-2.5 text-sm font-medium text-[var(--text-h)] hover:bg-black/5">
          View more
        </button>
      </div>
    </section>
  )
}

export default LatestArticles
