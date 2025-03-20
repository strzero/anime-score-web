"use client";

import { useState } from "react";
import { TextField, Button, CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";

export default function Home() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);  // 管理加载状态
  const router = useRouter();

  const handleSearch = () => {
    setLoading(true);  // 开始加载

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

    setLoading(false);  // 完成加载
  };

  return (
    // <div className="min-h-[calc(100vh-72px)] bg-gray-100 bg-[url('/image/background/image3.png')] bg-no-repeat bg-center bg-cover flex flex-col justify-center items-center">
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
          color={loading ? "default" : "primary"}  // 加载时变为默认颜色
          fullWidth
          onClick={handleSearch}
          disabled={loading}  // 点击后禁用按钮
          style={{
            marginTop: '10px',
            backgroundColor: loading ? '#d3d3d3' : '',  // 加载时按钮变灰色
          }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "搜索"}  {/* 如果加载中显示转圈 */}
        </Button>
      </div>
    </div>
  );
}
