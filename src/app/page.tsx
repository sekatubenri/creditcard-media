import { getAllArticles } from '@/lib/articles'
import Link from 'next/link'
import ArticleCard from '@/components/ArticleCard'

const CATEGORIES = [
  { key: 'compare', label: 'カード比較', icon: '💳', desc: '人気カードを徹底比較', color: 'from-emerald-500 to-teal-600' },
  { key: 'points', label: 'ポイント活用', icon: '⭐', desc: 'ポイントを最大限に活かす', color: 'from-yellow-500 to-orange-600' },
  { key: 'cashback', label: 'キャッシュバック', icon: '💰', desc: 'お得なキャッシュバック情報', color: 'from-green-500 to-emerald-600' },
  { key: 'beginner', label: '初心者向け', icon: '📚', desc: 'クレカの基本から学ぶ', color: 'from-sky-500 to-blue-600' },
]

export default function Home() {
  const articles = getAllArticles()

  return (
    <div>
      <section className="bg-gradient-to-b from-emerald-700 to-emerald-800 text-white py-20">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
            あなたに最適なカードが、<br className="md:hidden" />見つかる。
          </h1>
          <p className="text-emerald-100 text-lg md:text-xl max-w-2xl mx-auto">
            ポイント還元率・年会費・特典を徹底比較。<br className="hidden md:block" />
            クレジットカード選びで損をしないための情報を完全網羅。
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 -mt-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.key}
              href={`/category/${cat.key}`}
              className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all text-center group"
            >
              <div className={`bg-gradient-to-br ${cat.color} w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3`}>
                <span className="text-xl">{cat.icon}</span>
              </div>
              <h3 className="font-bold text-sm text-gray-900 group-hover:text-emerald-700 transition-colors">{cat.label}</h3>
              <p className="text-xs text-gray-400 mt-1">{cat.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-16">
        <h2 className="text-xl font-bold text-gray-900 mb-8 flex items-center gap-2">
          <span className="w-1 h-6 bg-emerald-700 rounded-full"></span>
          最新記事
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </section>
    </div>
  )
}
