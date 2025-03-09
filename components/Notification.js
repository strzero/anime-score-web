'use client'
import { useEffect, useState } from 'react';
import { Snackbar, IconButton, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const Notification = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const hasSeenNotification = localStorage.getItem('hasSeenNotification');
    if (hasSeenNotification) {
      setIsVisible(false); // 如果用户已经关闭过通知，则不再显示
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem('hasSeenNotification', 'true');
    setIsVisible(false); // 点击关闭后，标记为已关闭
  };

  return (
    <Snackbar
      open={isVisible}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      onClose={(event, reason) => {
        // 只有点击关闭按钮时才会触发关闭
        if (reason === 'clickaway') {
          return;
        }
        handleClose();
      }}
      sx={{ maxWidth: '400px' }} // 限制通知宽度
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: '#2196f3',
          color: 'white',
          padding: 2,
          borderRadius: 2,
          width: 'auto',
        }}
      >
        <Box sx={{ flex: 1 }}>
          <p style={{ margin: 0 }}>站点正在测试状态 数据库会定时清空 数据可能未维持最新</p>
        </Box>
        <IconButton onClick={handleClose} color="inherit">
          <CloseIcon />
        </IconButton>
      </Box>
    </Snackbar>
  );
};

export default Notification;
