import React from 'react';
import { TextField } from '@mui/material';
import Link from 'next/link'

const Header = () => {
  return (
    <header className="flex justify-between items-center p-4 bg-white text-black shadow-md">
      {/* 左边部分 */}
      <div className="flex space-x-6">
      <Link href="/" className="hover:text-yellow-400">
        首页
      </Link>

      <Link href="/rank/now/ave" className="hover:text-yellow-400">
        新番平均评分
      </Link>

      <Link href="/rank/now/wam" className="hover:text-yellow-400">
        新番加权评分
      </Link>

      <Link href="/rank/custom" className="hover:text-yellow-400">
        总览评分
      </Link>
      </div>

      {/* 中间搜索框 */}
      <div className="flex justify-center w-1/3">
        <TextField
          label="搜索功能暂不可用"
          variant="outlined"
          fullWidth
          size="small"
        />
      </div>

      {/* 右边更新时间 */}
      <div className="text-sm hidden sm:block">
        上一次刷新数据 2025年3月6日
      </div>
    </header>
  );
};

export default Header;
