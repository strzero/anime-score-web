import { useState } from 'react';
import Fuse from 'fuse.js';

const SearchComponent = ({ data }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  // 配置 Fuse.js
  const fuse = new Fuse(data, {
    keys: ['title', 'description'], // 指定要搜索的字段
    includeScore: true, // 包含匹配的分数
  });

  const handleSearch = (e) => {
    const { value } = e.target;
    setQuery(value);

    // 执行搜索
    const result = fuse.search(value);
    setResults(result.map(({ item }) => item)); // 提取匹配的结果
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Search..."
      />
      <ul>
        {results.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchComponent;
