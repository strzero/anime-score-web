'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';

export function PlatformIDBox({ platform, name, bangumi_id, local_id, useradd }) {
  const [showDialog, setShowDialog] = useState(false);
  const [newId, setNewId] = useState(local_id || '');

  const handleSubmit = async () => {
    const url = `http://localhost:8000/update/2?bangumi_id=${bangumi_id}&${platform.toLowerCase()}_id=${newId}`;
    await axios.post(url);
    setShowDialog(false);
  };

  return (
    <div className="flex flex-col p-3 bg-gray-50 rounded-lg space-y-2 relative">
      <div className="flex justify-between items-center">
        <div>
          <h4 className="text-sm font-medium text-gray-700">
            {platform}{useradd == 1 && <span className="ml-2">（用户添加）</span>}
          </h4>
          <div className="text-xs text-gray-500 mt-1">ID: {local_id || '未关联'}</div>
          <div className="text-xs text-gray-500 mt-1">平台名称: {name || '未关联'}</div>
        </div>
        <button 
          className="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-100"
          onClick={() => setShowDialog(true)}
        >
          修改
        </button>
      </div>
      {showDialog && (
        <div className="absolute top-full left-0 bg-white p-4 rounded-lg shadow-lg border w-full mt-2 z-10">
          <h3 className="text-lg font-bold mb-2">修改 {platform} ID</h3>
          <input 
            type="text" 
            value={newId} 
            onChange={(e) => setNewId(e.target.value)}
            className="border p-2 w-full rounded-lg"
          />
          <div className="flex justify-end mt-4 space-x-2">
            <button className="px-3 py-1 bg-gray-200 rounded-lg" onClick={() => setShowDialog(false)}>取消</button>
            <button className="px-3 py-1 bg-blue-500 text-white rounded-lg" onClick={handleSubmit}>提交</button>
          </div>
        </div>
      )}
    </div>
  );
}

export function CheckBox({ id }) {
  const [visible, setVisible] = useState(false);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    const storedValue = localStorage.getItem(`confirm-${id}`);
    if (storedValue) {
      setDisabled(true);
    } else {
      setVisible(true);
    }
  }, [id]);

  const handleConfirm = async (isConfirmed) => {
    if (disabled) return;
    const url = isConfirmed 
      ? `http://localhost:8000/confirm/${id}` 
      : `http://localhost:8000/revoke_confirm/${id}`;
    await axios.post(url);
    localStorage.setItem(`confirm-${id}`, isConfirmed ? 'confirmed' : 'revoked');
    setDisabled(true);
    setVisible(false);
  };

  return (
    visible && (
      <div className="flex flex-col p-3 bg-gray-50 rounded-lg space-y-2 mt-4">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-700">链接是否正确</span>
          <div className="flex space-x-2">
            <button 
              className="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-100"
              onClick={() => handleConfirm(true)}
            >
              正确
            </button>
            <button 
              className="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-100"
              onClick={() => handleConfirm(false)}
            >
              错误
            </button>
          </div>
        </div>
      </div>
    )
  );
}