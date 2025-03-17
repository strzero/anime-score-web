import ScoreTable from "@/components/ScoreTable";
import { Tooltip } from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ErrorPage from "@/components/ErrorPage";

export default async function now() {
    let res, data;
    try {
        res = await fetch(process.env.AS_API_URL+"/now", {
            next: { revalidate: 60 }
          });
        data = await res.json();
    } catch (error) {
        return <ErrorPage errorMessage="无法连接到数据服务" />;
    }

    const ave_data = [];

    Object.keys(data).forEach(key => {
        const item = data[key];
        if(item.status !== 200) {
            return;
        }
        if(!item.bangumi_data.tags.includes("日本")) {
            return;
        }
        const bangumiData = item.bangumi_data.data;
        const scoreData = item.score_data;
        
        const name = bangumiData.name_cn || bangumiData.name;
        
        const myanimelistCount = scoreData.myanimelist.count || 0;
        const anilistCount = scoreData.anilist.count || 0;
        const filmarksCount = scoreData.filmarks.count || 0;
        const anikoreCount = scoreData.anikore.count || 0;
        
        const totalCount = myanimelistCount + anilistCount + filmarksCount + anikoreCount;

        if(totalCount <= 200) {
            return;
        }
        
        const bangumiScore = bangumiData.score;
        const myanimelistScore = scoreData.myanimelist.score || null;
        const anilistScore = scoreData.anilist.score || null;
        const filmarksScore = scoreData.filmarks.score || null;
        const anikoreScore = scoreData.anikore.score || null;
        
        // 计算 myanimelist 和 anilist 的均值
        const myanimelistAnilistAvg = myanimelistScore && anilistScore ? (myanimelistScore + anilistScore) / 2 : myanimelistScore || anilistScore || null;
        // 计算 filmarks 和 anikore 的均值
        const filmarksAnikoreAvg = filmarksScore && anikoreScore ? (filmarksScore + anikoreScore) / 2 : filmarksScore || anikoreScore || null;
        
        let totalScore = 0;
        let weightSum = 0;
        
        // 加权计算
        if (bangumiScore !== null) {
          totalScore += bangumiScore * 0.5;  // bangumiScore 占 50%
          weightSum += 0.5;
        }
        
        if (myanimelistAnilistAvg !== null) {
          totalScore += myanimelistAnilistAvg * 0.25;  // myanimelist 和 anilist 平均分占 25%
          weightSum += 0.25;
        }
        
        if (filmarksAnikoreAvg !== null) {
          totalScore += filmarksAnikoreAvg * 0.25;  // filmarks 和 anikore 平均分占 25%
          weightSum += 0.25;
        }
        
        // 计算最终加权平均分，确保没有除以零的错误
        const weightedAverageScore = weightSum > 0 ? (totalScore / weightSum).toFixed(2) : null;

        ave_data.push({
            id: key,
            name: name,
            bangumi: bangumiData.score,
            myanimelist: myanimelistScore,
            anilist: anilistScore,
            filmarks: filmarksScore,
            anikore: anikoreScore,
            total: weightedAverageScore
        });
    });

    return (
        <>
            <ScoreTable
                rows={ave_data}
                title={
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span>加权平均分</span>
                        <Tooltip title="中文圈50% 英文圈25% 日文圈25% 排除评分总数小于200的条目">
                            <InfoOutlinedIcon style={{ fontSize: 18, marginLeft: 8, cursor: 'pointer' }} />
                        </Tooltip>
                    </div>
                }
            />
        </>
    );
}