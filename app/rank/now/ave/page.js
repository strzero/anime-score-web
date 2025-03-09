import ScoreTable from "@/components/ScoreTable";
import { Tooltip } from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

export default async function now() {
    const res = await fetch("http://localhost:5100/now");
    const data = await res.json();

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

        const scores = [bangumiScore, myanimelistScore, anilistScore, filmarksScore, anikoreScore].filter(score => score !== null)

        const totalScore = (scores.reduce((acc, val) => acc + val, 0) / scores.length).toFixed(2);

        ave_data.push({
            id: key,
            name: name,
            bangumi: bangumiData.score,
            myanimelist: myanimelistScore,
            anilist: anilistScore,
            filmarks: filmarksScore,
            anikore: anikoreScore,
            total: totalScore
        });
    });

    return (
        <>
            <ScoreTable
                rows={ave_data}
                title={
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span>平均值</span>
                        <Tooltip title="将全部平台分数取平均值 排除评分总数小于200的条目">
                            <InfoOutlinedIcon style={{ fontSize: 18, marginLeft: 8, cursor: 'pointer' }} />
                        </Tooltip>
                    </div>
                }
            />
        </>
    );
}