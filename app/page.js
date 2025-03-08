"use client";

import { useState } from "react";
import { TextField, Button } from "@mui/material";
import { useRouter } from "next/navigation"; // 从 next/navigation 导入 useRouter

export default function Home() {
  const [input, setInput] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    // 如果输入的是一个字符串URL
    const urlPattern = /https:\/\/bangumi\.tv\/subject\/(\d+)/;
    const match = input.match(urlPattern);
    if (match) {
      router.push(`/subject/${match[1]}`);
    } else if (!isNaN(input)) {
      // 如果输入的是数字
      router.push(`/subject/${input}`);
    } else {
      // 输入不合法时不做任何操作，或者可以显示错误提示
      alert("请输入有效的Bangumi ID或URL");
    }
  };

  return (
    <div className="min-h-[calc(100vh-72px)] bg-gray-100 flex flex-col justify-center items-center"> 
      {/* pt-18 用于为顶部 72px 顶栏添加相应的填充 */}
      <h1 className="text-4xl font-bold mb-8">全球动画评分</h1>
      <div className="w-full max-w-md px-4">
        <TextField
          label="输入Bangumi ID或URL"
          variant="outlined"
          fullWidth
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="mb-4"
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSearch}
        >
          搜索
        </Button>
      </div>
    </div>
  );
}
