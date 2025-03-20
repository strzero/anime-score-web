'use client';

import React, { useState, useEffect, useRef } from 'react';
import { TextField, MenuItem, CircularProgress, Typography, Box } from '@mui/material';
import { useRouter } from 'next/navigation';

const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);  // 新增：用于控制聚焦状态
  const router = useRouter();
  const inputRef = useRef(null);  // 用于控制搜索框的聚焦

  // 防抖处理
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 200); // 0.2秒延迟

    return () => clearTimeout(timer);
  }, [query]);

  // 发起API请求
  useEffect(() => {
    if (!debouncedQuery) {
      setResults([]);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(process.env.AS_API_URL+`:5100/search?query=${debouncedQuery}`);
        const data = await response.json();
        setResults(data.slice(0, 6)); // 只显示前6条
      } catch (error) {
        console.error('API请求失败', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [debouncedQuery]);

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleResultClick = (id) => {
    router.push(`/subject/${id}`);
  };

  const handleSearch = () => {
    if (query) {
      router.push(`/search?query=${query}`);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  // 聚焦事件处理
  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    // 失去焦点时，若没有输入内容，隐藏结果
    setIsFocused(false);
  };

  return (
    <div className="flex justify-center w-1/3 relative">
      <TextField
        label="搜索"
        variant="outlined"
        fullWidth
        size="small"
        value={query}
        onChange={handleChange}
        onKeyDown={handleKeyPress}
        onFocus={handleFocus}   // 聚焦时显示搜索结果
        onBlur={handleBlur}     // 失去焦点时隐藏搜索结果
        ref={inputRef}
      />

      {/* 显示搜索结果 */}
      {isFocused && query && (
        <div className="absolute top-full mt-1 w-full bg-white shadow-lg max-h-60 overflow-y-auto z-10">
          {loading ? (
            <div className="flex justify-center py-2">
              <CircularProgress size={24} />
            </div>
          ) : (
            results.map((result) => (
              <MenuItem
                key={result.id}
                onClick={() => handleResultClick(result.id)}
                className="flex justify-between items-start"
              >
                <Box className="flex flex-col flex-1">
                  <Typography variant="body2" noWrap>
                    {result.name_cn || result.name}
                  </Typography>
                </Box>
                <Box className="text-right ml-2">
                  <Typography variant="caption">{result.date}</Typography>
                  <Typography variant="caption">{result.score ? `评分: ${result.score}` : '暂无评分'}</Typography>
                </Box>
              </MenuItem>
            ))
          )}
        </div>
      )}

      {/* 搜索按钮 */}
      <button
        onClick={handleSearch}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2"
      >
        搜索
      </button>
    </div>
  );
};

export default Search;
