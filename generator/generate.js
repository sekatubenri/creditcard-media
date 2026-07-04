const Anthropic = require('@anthropic-ai/sdk');
const fs = require('fs');
const path = require('path');

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SITE = {
  name: 'クレジットカードナビ',
  url: 'https://creditcard-media.vercel.app',
};

const AFFILIATE_TOP = `
<div style="background:#f0fdf4;border:2px solid #059669;border-radius:8px;padding:16px;margin:24px 0;">
  <p style="font-weight:bold;color:#065f46;margin:0 0 8px;">【PR】あなたに最適なクレジットカードを今すぐ比較</p>
  <ul style="list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:8px;">
    <li><a href="https://px.a8.net/svt/ejp?a8mat=4B7T8W+61BAWA+40JM+1NJK7M" rel="nofollow" style="display:inline-block;background:#059669;color:#fff;padding:10px 20px;border-radius:6px;text-decoration:none;font-weight:bold;">▶ 銀行振込などの支払いをカード決済に変換【ラボル カード払い】</a><img border="0" width="1" height="1" src="https://www12.a8.net/0.gif?a8mat=4B7T8W+61BAWA+40JM+1NJK7M" alt=""></li>
    <li><a href="https://px.a8.net/svt/ejp?a8mat=4B7T8W+6Z90DM+1WW0+5ZMCI" rel="nofollow" style="display:inline-block;background:#1d4ed8;color:#fff;padding:8px 16px;border-radius:6px;text-decoration:none;font-weight:bold;font-size:14px;">▶ 新会社でも作れる法人向けETC専用カード</a><img border="0" width="1" height="1" src="https://www13.a8.net/0.gif?a8mat=4B7T8W+6Z90DM+1WW0+5ZMCI" alt=""></li>
    <li><a href="https://px.a8.net/svt/ejp?a8mat=4B7T8W+6YNKRU+1WW0+NXMIQ" rel="nofollow" style="display:inline-block;background:#1f2937;color:#fbbf24;padding:8px 16px;border-radius:6px;text-decoration:none;font-weight:bold;font-size:14px;">▶ 法人向けのETC専用カード</a><img border="0" width="1" height="1" src="https://www16.a8.net/0.gif?a8mat=4B7T8W+6YNKRU+1WW0+NXMIQ" alt=""></li>
    <li><a href="https://px.a8.net/svt/ejp?a8mat=4B7T8W+6XGPKA+3EV2+I2PXE" rel="nofollow" style="display:inline-block;background:#dc2626;color:#fff;padding:8px 16px;border-radius:6px;text-decoration:none;font-weight:bold;font-size:14px;">▶ 全国で使える！新会社でも作れる法人専用ガソリンカード</a><img border="0" width="1" height="1" src="https://www15.a8.net/0.gif?a8mat=4B7T8W+6XGPKA+3EV2+I2PXE" alt=""></li>
  </ul>
</div>`;

const AFFILIATE_BOTTOM = `
<div style="background:#fffbeb;border:2px solid #d97706;border-radius:8px;padding:16px;margin:24px 0;">
  <p style="font-weight:bold;color:#92400e;margin:0 0 12px;">📚 クレジットカード・お金の教養本</p>
  <ul style="list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:8px;">
    <li><a href="https://www.amazon.co.jp/dp/4296115626?linkCode=ll2&tag=mirainikibouw-22&ref_=as_li_ss_tl" rel="nofollow" target="_blank" style="color:#1d4ed8;text-decoration:underline;">▶ 本当の自由を手に入れるお金の大学【Amazon】</a></li>
    <li><a href="https://www.amazon.co.jp/dp/4296106384?linkCode=ll2&tag=mirainikibouw-22&ref_=as_li_ss_tl" rel="nofollow" target="_blank" style="color:#1d4ed8;text-decoration:underline;">▶ 図解・最新 難しいことはわかりませんが、お金の増やし方を教えてください！【Amazon】</a></li>
    <li><a href="https://www.amazon.co.jp/dp/4478107823?linkCode=ll2&tag=mirainikibouw-22&ref_=as_li_ss_tl" rel="nofollow" target="_blank" style="color:#1d4ed8;text-decoration:underline;">▶ ジェイソン流お金の増やし方【Amazon】</a></li>
  </ul>
</div>
<div style="background:#fff0f0;border:2px solid #e00;border-radius:8px;padding:16px;margin:24px 0;">
  <p style="font-weight:bold;color:#c00;margin:0 0 12px;">🛒 楽天ブックスで人気のお金本</p>
  <ul style="list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:8px;">
    <li><a href="https://hb.afl.rakuten.co.jp/ichiba/5570f8cd.82e98484.5570f8ce.5b744630/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Fbook%2F16448854%2F&link_type=text&ut=eyJwYWdlIjoiaXRlbSIsInR5cGUiOiJ0ZXh0In0" target="_blank" rel="nofollow sponsored noopener" style="color:#c00;text-decoration:underline;">▶ 本当の自由を手に入れるお金の大学【楽天ブックス】</a></li>
    <li><a href="https://hb.afl.rakuten.co.jp/ichiba/5570f8cd.82e98484.5570f8ce.5b744630/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Fbook%2F16780101%2F&link_type=text&ut=eyJwYWdlIjoiaXRlbSIsInR5cGUiOiJ0ZXh0In0" target="_blank" rel="nofollow sponsored noopener" style="color:#c00;text-decoration:underline;">▶ お金の名著200冊を読んでわかった！お金の増やし方大全【楽天ブックス】</a></li>
  </ul>
</div>`;

async function generateArticle() {
  const topicsPath = path.join(__dirname, '..', 'unused-topics.json');
  const contentDir = path.join(__dirname, '..', 'content');

  fs.mkdirSync(contentDir, { recursive: true });
  const topics = JSON.parse(fs.readFileSync(topicsPath, 'utf-8'));
  const existingFiles = new Set(fs.readdirSync(contentDir));

  const topic = topics.find(t => !existingFiles.has(t.filename));
  if (!topic) {
    console.log('全トピック生成完了');
    process.exit(0);
  }

  console.log(`生成中: ${topic.title}`);

  const today = new Date().toISOString().split('T')[0];

  const message = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 6000,
    messages: [{
      role: 'user',
      content: `あなたはクレジットカード比較メディア「${SITE.name}」の専門ライターです。
SEOに最適化されたクレジットカード情報記事を生成してください。

トピック: ${topic.title}
カテゴリ: ${topic.category}

以下のJSON形式のみで出力してください（前後に余分なテキスト不要）:
{
  "title": "タイトル（SEO最適化、40〜60文字、年や具体的な数字を含める）",
  "description": "メタディスクリプション（120文字以内、検索意図に合わせる）",
  "category": "${topic.category}",
  "date": "${today}",
  "content": "HTMLコンテンツ"
}

contentの要件:
- 2500文字以上のHTML本文
- h2見出しを5〜8個、必要に応じてh3も使用
- ul/ol/liリスト、tableを積極的に活用
- 具体的なポイント還元率・年会費・特典などを含める
- 読者の疑問に答える実践的な内容
- JSON文字列として正しくエスケープ（"は\\"、改行は\\n）`
    }],
  });

  const text = message.content[0].text.trim();
  console.log('レスポンス先頭200文字:', text.slice(0, 200));

  // マークダウンコードブロックを除去
  const cleaned = text.replace(/```json\s*/g, '').replace(/```\s*/g, '');
  const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    console.error('全レスポンス:', text);
    throw new Error('レスポンスにJSONが見つかりません');
  }

  const article = JSON.parse(jsonMatch[0]);

  if (article.content.includes('<h2')) {
    article.content = article.content.replace('<h2', AFFILIATE_TOP + '<h2');
  } else {
    article.content = AFFILIATE_TOP + article.content;
  }
  article.content = article.content + AFFILIATE_BOTTOM;

  fs.writeFileSync(
    path.join(contentDir, topic.filename),
    JSON.stringify(article, null, 2)
  );

  const remaining = topics.filter(t => t.filename !== topic.filename);
  fs.writeFileSync(topicsPath, JSON.stringify(remaining, null, 2));

  console.log(`完了: ${topic.filename}`);
}

generateArticle().catch(err => {
  console.error('エラー:', err.message);
  process.exit(1);
});
