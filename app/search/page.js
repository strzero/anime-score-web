'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Container, Typography, Grid, Paper, CircularProgress, Box } from '@mui/material';
import Link from 'next/link';  // 修正 Link 导入

const SearchPage = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const query = searchParams.get('query');

  useEffect(() => {
    if (!query) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:5100/search?query=${query}`);
        const data = await response.json();
        setResults(data);
      } catch (error) {
        console.error('API请求失败', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ marginTop: 4 }}>
      <Typography variant="h4" gutterBottom>
        搜索结果
      </Typography>

      {results.length === 0 ? (
        <Typography variant="body1" color="textSecondary">
          没有找到相关结果。
        </Typography>
      ) : (
        <Grid container spacing={2}>
          {results.map((result) => (
            <Grid item xs={12} sm={6} md={4} key={result.id}>
              <Paper elevation={3} sx={{ padding: 2, height: '100%' }}>
                <Link href={`/subject/${result.id}`} passHref>
                  <Typography variant="h6" gutterBottom noWrap sx={{ cursor: 'pointer' }}>
                    {result.name_cn || result.name}
                  </Typography>
                </Link>
                <Typography variant="body2" color="textSecondary" noWrap>
                  日期: {result.date}
                </Typography>
                <Typography variant="body2" color="textSecondary" noWrap>
                  {result.score ? `评分: ${result.score}` : '暂无评分'}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default SearchPage;
