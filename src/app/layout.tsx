import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://creditc-select.com'),
  title: {
    default: 'クレジットカードナビ｜おすすめカード比較・ポイント活用ガイド',
    template: '%s｜クレジットカードナビ',
  },
  description: 'クレジットカードの比較・おすすめランキング。ポイント還元率・年会費・キャッシュバックを徹底比較。あなたに最適なカードが見つかります。',
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    siteName: 'クレジットカードナビ',
  },
  verification: {
    google: 'jlk7upt4Paq4-rSDm4wF-6Tjdw1wfewLKEN6uEQ0fw8',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className="bg-gray-50 text-gray-900 antialiased min-h-screen flex flex-col">
        <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9320888355424356" crossOrigin="anonymous" strategy="afterInteractive" />
        <header className="border-b border-gray-200 sticky top-0 bg-white z-50 shadow-sm">
          <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
            <a href="/" className="flex items-center gap-2">
              <span className="bg-emerald-600 text-white text-sm font-bold px-2.5 py-1 rounded">💳</span>
              <span className="text-xl font-bold text-gray-900">クレジットカードナビ</span>
            </a>
            <nav className="hidden md:flex gap-1 text-sm">
              <a href="/category/compare" className="px-3 py-2 rounded-lg text-gray-600 hover:bg-emerald-50 hover:text-emerald-700 transition-colors">カード比較</a>
              <a href="/category/points" className="px-3 py-2 rounded-lg text-gray-600 hover:bg-emerald-50 hover:text-emerald-700 transition-colors">ポイント活用</a>
              <a href="/category/cashback" className="px-3 py-2 rounded-lg text-gray-600 hover:bg-emerald-50 hover:text-emerald-700 transition-colors">キャッシュバック</a>
              <a href="/category/beginner" className="px-3 py-2 rounded-lg text-gray-600 hover:bg-emerald-50 hover:text-emerald-700 transition-colors">初心者向け</a>
            </nav>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="bg-white border-t border-gray-200 mt-16">
          <div className="max-w-5xl mx-auto px-4 py-10">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="bg-emerald-600 text-white text-xs font-bold px-2 py-0.5 rounded">💳</span>
                <span className="text-sm font-bold text-gray-900">クレジットカードナビ</span>
              </div>
              <nav className="flex gap-6 text-xs text-gray-400">
                <a href="/category/compare" className="hover:text-gray-600">カード比較</a>
                <a href="/category/points" className="hover:text-gray-600">ポイント活用</a>
                <a href="/category/cashback" className="hover:text-gray-600">キャッシュバック</a>
              </nav>
            </div>
            <nav className="flex justify-center gap-6 text-xs text-gray-400 mt-4">
              <a href="/privacy" className="hover:text-gray-600">プライバシーポリシー</a>
              <a href="/contact" className="hover:text-gray-600">お問い合わせ</a>
            </nav>
            <p className="text-center text-xs text-gray-300 mt-4">© 2026 クレジットカードナビ All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  )
}
