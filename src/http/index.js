import axios from "axios";

const http = axios.create({
  //baseURL: 'https://3.svetacdn.in/api/',
  baseURL: 'https://videocdn.tv/api/',
  params: {
    api_token: process.env.API_TOKEN,
    limit: 100
  }
});

const fetchTranslations = async () => {
  const { data } = await http.get('translations');
  return data;
}

const searchQuery = async (type, searchQuery, searchYear = null) => {
  let data;
  try {
    data = await http.get(type, {
      params:
        {
          query: searchQuery,
          year: searchYear
        }
    });
  }catch(e) {
      console.log('EEE', e);
  }finally{
    console.log('data', data?.data)
    return data?.data || {data: {}};
  }
}

const fetchMediaById = async (mediaType, mediaId) => {
  const { data } = await http.get('short', {params:
      {
        kinopoisk_id: mediaId
      }
  });
  return data;
}

const fetchMediaData = async (src) => {
  const { data } = await axios.get(src);
  return data
}

export {
  fetchTranslations,
  searchQuery,
  fetchMediaById,
  fetchMediaData
}
