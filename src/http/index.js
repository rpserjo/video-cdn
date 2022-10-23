import axios from "axios";

const http = axios.create({
  baseURL: 'https://3.svetacdn.in/api/',
  params: {
    api_token: 'gZrhCKFj6pA1W4h96i6g5IjhW7aR0CLk'
  }
});

const fetchTranslations = async () => {
  const { data } = await http.get('translations');
  return data;
}

const searchQuery = async (type, searchQuery, searchYear = null) => {
  const { data } = await http.get(type, {params:
      {
        query: searchQuery,
        year: searchYear
      }
  });
  return data;
}

const fetchMediaById = async (mediaType, mediaId) => {
  const { data } = await http.get(mediaType, {params:
      {
        id: mediaId
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
