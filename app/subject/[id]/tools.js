import { parse2 } from '@bgm38/wiki'

export function ScoreCard({ platform, bangumi, scores }) {
  const platformConfig = {
    bangumi: { label: 'Bangumi', color: 'text-pink-600' },
    myanimelist: { label: 'MyAnimeList', color: 'text-purple-600' },
    anilist: { label: 'AniList', color: 'text-blue-600' },
    filmarks: { label: 'Filmarks', color: 'text-green-600' },
    anikore: { label: 'Anikore', color: 'text-orange-600' }
  };

  const isBangumi = platform === 'bangumi';
  const platformData = isBangumi ? {
    score: bangumi?.score,
    count: Object.keys(bangumi || {})
      .filter(k => k.startsWith('score_'))
      .reduce((sum, key) => sum + (bangumi[key] || 0), 0)
  } : scores?.[platform];

  const isValid = isBangumi ? true : scores?.[platform]?.status >= 200 && scores?.[platform]?.status < 300;
  const displayScore = isValid ? (platformData?.score?.toFixed(1) || '-') : '未找到';
  const displayCount = isValid ? (platformData?.count?.toLocaleString() || '-') : '0';

  return (
    <div className="p-4 bg-gray-50 rounded-lg shadow-inner">
      <div className="text-center">
        <h3 className={`text-sm mb-1 ${platformConfig[platform].color}`}>
          {platformConfig[platform].label}
        </h3>
        <div className="text-2xl font-bold text-gray-800">
          {displayScore}
        </div>
        <div className="text-xs text-gray-500 mt-1">
          ({displayCount}人评分)
        </div>
        {isBangumi && bangumi?.rank && (
          <div className="text-xs text-gray-500 mt-1">
            全站排名 #{bangumi.rank}
          </div>
        )}
      </div>
    </div>
  );
}


export function InfoBox({ content }) {
  if (!content) return null;

  try {
    const [error, wiki] = parse2(content);
    if (error) throw error;

    return (
      <div className="space-y-6">
        {wiki.data?.map((item, index) => (
          <div key={index} className="border-b pb-4 last:border-0">
            <dt className="text-gray-500 font-medium mb-2 text-lg">{item.key}</dt>
            <dd className="text-gray-800">
              {item.array ? (
                <ul className="space-y-2 pl-4">
                  {item.values?.map((valueItem, vIndex) => (
                    <li key={vIndex} className="flex gap-2">
                      {valueItem.k && <span className="text-gray-500 after:content-[':']">{valueItem.k}</span>}
                      <span>{valueItem.v}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <div>{item.value || '无信息'}</div>
              )}
            </dd>
          </div>
        ))}
      </div>
    );
  } catch (e) {
    console.error('Infobox解析错误:', e);
    return (
      <div className="text-red-500 p-4 bg-red-50 rounded-lg">
        解析失败
      </div>
    );
  }
}
