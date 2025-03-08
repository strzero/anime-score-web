import React from 'react';
import { TextField } from '@mui/material';

const Header = () => {
  return (
    <header className="flex justify-between items-center p-4 bg-white text-black shadow-md">
      {/* 左边部分 */}
      <div className="flex space-x-6">
        <a href="/" className="hover:text-yellow-400">首页</a>
        <a href="/rank/now" className="hover:text-yellow-400">新番评分</a>
        <a href="/rank/custom" className="hover:text-yellow-400">总览评分</a>
      </div>

      {/* 中间搜索框 */}
      <div className="flex justify-center w-1/3">
        <TextField
          label="搜索"
          variant="outlined"
          fullWidth
          size="small"
          defaultValue="搜索功能暂不可用"
        />
      </div>

      {/* 右边更新时间 */}
      <div className="text-sm">
        当前数据更新时间 2025年3月6日
      </div>
    </header>
  );
};

export default Header;
