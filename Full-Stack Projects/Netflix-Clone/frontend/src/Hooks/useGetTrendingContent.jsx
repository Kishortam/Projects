import { useEffect, useState } from 'react'
import { useContentStore } from '../Store/content';
import axios from 'axios';

const useGetTrendingContent = () => {
  const [trendingContent, setTrendingContent] = useState(null);
  const {contentType} = useContentStore();

  useEffect(()=>{
    const getTrendingContent = async() => {
        const res = await axios.get(`/api/v1/${contentType}/trending/`);  // we have set proxy in viteConfig=> /api : "http://localhost:5000"
        setTrendingContent(res.data.content);
    }
    getTrendingContent();
  }, [contentType]);

  return {trendingContent};
}


export default useGetTrendingContent