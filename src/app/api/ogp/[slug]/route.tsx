import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

// 記事データのマッピング（仮）
function getArticleData(slug: string) {
  const articleMap: Record<string, { title: string; date: string; description: string }> = {
    'start-internship': {
      title: '長期インターンシップを3か月やってみて',
      date: '2025-06-01',
      description: '長期インターンシップを3か月やってみての感想や学びをまとめました。'
    },
    'ogp-fetcher': {
      title: 'OGPを取得してリンクプレビューを表示する',
      date: '2024-08-15',
      description: 'OGP情報を取得してリンクプレビューを表示する機能を実装した話。'
    },
    'maximum-atcoder-leaderboard': {
      title: 'Maximum競プロ部のAtCoderリーダーボードを作った',
      date: '2024-07-20',
      description: 'Maximum競プロ部のメンバー用AtCoderリーダーボードを作成しました。'
    },
    'isucon14': {
      title: 'ISUCON14に参加してベンチが通らなかった話',
      date: '2024-12-01',
      description: 'ISUCON14に参加したがベンチマークが通らず苦戦した体験記。'
    },
    'ap-siken': {
      title: '応用情報技術者試験に合格しました',
      date: '2024-06-21',
      description: '応用情報技術者試験の合格体験記と勉強方法について。'
    },
    'my-first-portfolio': {
      title: '初めてのポートフォリオサイトを作った',
      date: '2024-05-01',
      description: '初めてのポートフォリオサイトをNext.jsで作成した話。'
    },
    'simple-todo-app': {
      title: 'シンプルなTODOアプリを作った',
      date: '2024-04-15',
      description: 'React + TypeScriptでシンプルなTODOアプリを作成しました。'
    },
    'markdown-snippets': {
      title: 'Markdownの便利なスニペット集',
      date: '2024-04-01',
      description: 'Markdownを書くときに便利なスニペットをまとめました。'
    }
  }
  
  return articleMap[slug] || {
    title: 'ブログ記事',
    date: '2024-01-01',
    description: 'ブログ記事'
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    // .png拡張子を除去してスラッグを取得
    let { slug } = params
    
    // .pngが含まれている場合は除去
    if (slug.endsWith('.png')) {
      slug = slug.replace('.png', '')
    }

    if (!slug) {
      return new Response('Missing slug parameter', { status: 400 })
    }

    // 記事データを取得（簡単なマッピング方式）
    const articleData = getArticleData(slug);
    
    const title = articleData.title
    const date = articleData.date
    const description = articleData.description

    // タイトルの長さに基づいてフォントサイズを調整
    const getFontSize = (titleLength: number) => {
      if (titleLength > 50) return 48
      if (titleLength > 30) return 56
      return 64
    }

    const fontSize = getFontSize(title.length)

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f172a 100%)',
            padding: '60px',
            fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif',
          }}
        >
          {/* ブランドロゴ・サイト名 */}
          <div
            style={{
              position: 'absolute',
              top: '40px',
              left: '60px',
              color: 'white',
              fontSize: 24,
              fontWeight: 600,
              opacity: 0.9,
            }}
          >
            batora.dev
          </div>

          {/* メインコンテンツエリア */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              maxWidth: '80%',
            }}
          >
            {/* 記事タイトル */}
            <h1
              style={{
                color: 'white',
                fontSize: fontSize,
                fontWeight: 700,
                lineHeight: 1.2,
                margin: 0,
                textShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
                wordWrap: 'break-word',
              }}
            >
              {title}
            </h1>

            {/* 日付 */}
            {date && (
              <div
                style={{
                  color: 'rgba(255, 255, 255, 0.8)',
                  fontSize: 20,
                  fontWeight: 400,
                  marginTop: '30px',
                  padding: '12px 24px',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '30px',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                }}
              >
                {new Date(date).toLocaleDateString('ja-JP', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
            )}
          </div>

          {/* 装飾要素 */}
          <div
            style={{
              position: 'absolute',
              bottom: '0px',
              right: '0px',
              width: '400px',
              height: '400px',
              background: 'radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%)',
              borderRadius: '50%',
              transform: 'translate(50%, 50%)',
            }}
          />

          <div
            style={{
              position: 'absolute',
              top: '-100px',
              left: '-100px',
              width: '300px',
              height: '300px',
              background: 'radial-gradient(circle, rgba(255, 255, 255, 0.05) 0%, transparent 70%)',
              borderRadius: '50%',
            }}
          />

          {/* カテゴリータグ */}
          <div
            style={{
              position: 'absolute',
              bottom: '40px',
              left: '60px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            <div
              style={{
                color: 'rgba(255, 255, 255, 0.7)',
                fontSize: 16,
                fontWeight: 500,
                padding: '8px 16px',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '20px',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
              }}
            >
              ブログ記事
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    )
  } catch (e) {
    console.error('OGP画像生成エラー:', e)
    return new Response('Failed to generate image', { status: 500 })
  }
}
