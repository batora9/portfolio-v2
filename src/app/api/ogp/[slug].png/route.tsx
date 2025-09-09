import { ImageResponse } from 'next/og'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export const runtime = 'edge'

export async function GET(
  { params }: { params: { 'slug.png': string } }
) {
  try {
    // .png拡張子を除去してスラッグを取得
    const slug = params['slug.png'].replace('.png', '')

    if (!slug) {
      return new Response('Missing slug parameter', { status: 400 })
    }

    let title = 'ブログ記事'
    let date = null
    let description = ''

    try {
      // 記事ファイルを読み込み
      const filePath = path.join(process.cwd(), "docs/articles", `${slug}.md`)
      const fileContents = fs.readFileSync(filePath, "utf8")
      const { data } = matter(fileContents)
      
      title = data.title || title
      date = data.createdAt
      description = data.description || ''
    } catch (error) {
      console.error(`記事ファイル読み込みエラー (${slug}):`, error)
      // ファイルが見つからない場合はデフォルト値を使用
    }

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
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
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

            {/* 説明文 */}
            {description && (
              <div
                style={{
                  color: 'rgba(255, 255, 255, 0.7)',
                  fontSize: 18,
                  fontWeight: 400,
                  marginTop: '20px',
                  maxWidth: '600px',
                  lineHeight: 1.4,
                }}
              >
                {description.length > 100 ? description.substring(0, 100) + '...' : description}
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

          {/* 右下にスラッグ表示 */}
          <div
            style={{
              position: 'absolute',
              bottom: '40px',
              right: '60px',
              color: 'rgba(255, 255, 255, 0.5)',
              fontSize: 14,
              fontWeight: 400,
            }}
          >
            {slug}
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
