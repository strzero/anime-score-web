import { CheckBox, PlatformIDBox } from './tools-csr';
import { InfoBox, ScoreCard } from './tools';

export const metadata = {
};

export default async function Page({ params }) {
  const { id } = params;
  const res = await fetch(`http://localhost:8000/query/${id}`, {
    next: { revalidate: 1 },
  });
  const data = await res.json();
  const bangumi_data = data.bangumi_data.data;
  const id_data = data.id_data;
  const score_data = data.score_data;

  if (Math.floor((data.status + data.bangumi_data.status + id_data.status + score_data.status) / 100
) !== 8) {
    return (
      <div className="flex flex-col items-center justify-center h-screen space-y-4">
        <p className="text-gray-500">数据加载错误，请重试或报告管理员</p>
      </div>
    );
  }
  
  metadata.title = bangumi_data.name_cn || bangumi_data.name;

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* 头部信息区块 */}
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {bangumi_data.name_cn || bangumi_data.name}
        </h1>
        {bangumi_data.name_cn && (
          <h2 className="text-xl text-gray-600 mb-6">{bangumi_data.name}</h2>
        )}

        {/* 评分卡片组 */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <ScoreCard platform="bangumi" bangumi={bangumi_data} scores={score_data} />
          <ScoreCard platform="myanimelist" scores={score_data} />
          <ScoreCard platform="anilist" scores={score_data} />
          <ScoreCard platform="filmarks" scores={score_data} />
          <ScoreCard platform="anikore" scores={score_data} />
        </div>

        {/* 元信息 */}
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full">
            类型：{bangumi_data.type === 2 ? '动画' : '其他'}
          </div>
          <div className="px-3 py-1 bg-green-100 text-green-800 rounded-full">
            发行日期：{new Date(bangumi_data.date).toLocaleDateString('zh-CN')}
          </div>
        </div>
      </div>

      {/* 主要内容区域 */}
      <div className="lg:grid lg:grid-cols-3 lg:gap-8">
        {/* 左侧区块 */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4">详细信息</h2>
            <InfoBox content={bangumi_data.infobox} />
          </div>
        </div>

        {/* 右侧区块 */}
        <div className="lg:col-span-1 space-y-6 mt-6 lg:mt-0">
          <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
            <h2 className="text-xl font-bold mb-2">平台关联ID
              {id_data.verification_count >= 2 && (
                <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">已验证</span>
              )}
            </h2>
            <PlatformIDBox platform="MyAnimeList" bangumi_id={id} local_id={id_data.myanimelist_id} name={score_data.myanimelist.title} useradd={id_data.myanimelist_useradd} />
            <PlatformIDBox platform="Anilist" bangumi_id={id} local_id={id_data.anilist_id} name={score_data.anilist.title} useradd={id_data.anilist_useradd} />
            <PlatformIDBox platform="Filmarks" bangumi_id={id} local_id={id_data.filmarks_id} name={score_data.filmarks.title} useradd={id_data.filmarks_useradd} />
            <PlatformIDBox platform="Anikore" bangumi_id={id} local_id={id_data.anikore_id} name={score_data.anikore.title} useradd={id_data.anikore_useradd} />
            <CheckBox id={bangumi_data.id}/>
          </div>

          {/* 作品简介和标签区块保持不变... */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4">作品标签</h2>
            <div className="flex flex-wrap gap-2">
              {data.bangumi_data.tags?.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4">作品简介</h2>
            <p className="text-gray-700 leading-relaxed">
              {bangumi_data.summary || '暂无简介'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
