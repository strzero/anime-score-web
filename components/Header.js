import React from 'react';
import { TextField } from '@mui/material';
import Link from 'next/link';
import Search from './Search'; // Import Search component

const Header = async () => {
  let res, time;
  try {
    res = await fetch(process.env.NEXT_PUBLIC_AS_API_URL + "/db_time", {
      next: { revalidate: 12 * 60 * 60 },
    });
    time = await res.text();
  } catch (error) {
    time = "无法获取";
  }

  return (
    <header className="flex justify-between items-center p-4 bg-white text-black shadow-md">
      {/* 左边部分 */}
      <div className="flex space-x-6">
        <Link href="/" className="hover:text-yellow-400">
          首页
        </Link>

        <Link href="/rank/now/wam" className="hover:text-yellow-400">
          新番评分
        </Link>

        <Link href="/rank/now/dev" className="hover:text-yellow-400">
          正误检查
        </Link>
      </div>

      {/* 中间搜索框 */}
      <Search /> {/* Use the Search component here */}

      {/* 右边更新时间 */}
      <div className="text-sm hidden sm:block">
        更新时间：{time.replace(/"/g, '')}
      </div>
    </header>
  );
};

export default Header;
