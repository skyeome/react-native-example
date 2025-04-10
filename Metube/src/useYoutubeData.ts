import {useCallback, useState} from 'react';
import axios from 'axios';
import {YOUTUBE_API_KEY} from '@env';
import ListItemType from './ListItem.types';

type VideoListResponseType = {
  kind: 'youtube#videoListResponse';
  etag: string;
  nextPageToken: string;
  prevPageToken: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
  items: {
    kind: 'youtube#video';
    etag: string;
    id: string;
    snippet: {
      publishedAt: string;
      channelId: string;
      title: string;
      description: string;
      thumbnails: {
        [key: string]: {
          url: string;
          width: number;
          height: number;
        };
      };
      channelTitle: string;
      tags: string[];
      categoryId: string;
    };
    contentDetails: {
      duration: string;
      dimension: string;
      definition: string;
      caption: string;
      licensedContent: boolean;
      regionRestriction: {
        allowed: [string];
        blocked: [string];
      };
      contentRating: {
        mpaaRating: string;
        tvpgRating: string;
        bbfcRating: string;
        chvrsRating: string;
        eirinRating: string;
        cbfcRating: string;
        fmocRating: string;
        icaaRating: string;
        acbRating: string;
        oflcRating: string;
        fskRating: string;
        kmrbRating: string;
        djctqRating: string;
        russiaRating: string;
        rtcRating: string;
        ytRating: string;
      };
    };
    statistics: {
      viewCount: number;
      likeCount: number;
      dislikeCount: number;
      favoriteCount: number;
      commentCount: number;
    };
  }[];
};

const axiosInstance = axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3',
});

const useYoutubeData = () => {
  const [data, setData] = useState<ListItemType[]>([]);
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);
  const [nextPageCursor, setNextPageCursor] = useState<string | null>(null);

  const fetchYoutubeData = useCallback(async () => {
    try {
      const res = await axiosInstance.get<VideoListResponseType>('/videos', {
        params: {
          key: YOUTUBE_API_KEY,
          part: 'contentDetails, snippet, statistics',
          chart: 'mostPopular',
          regionCode: 'KR',
        },
      });
      const videoData = res.data;
      setData(
        videoData.items.map(item => ({
          title: item.snippet.title,
          thumbnail: item.snippet.thumbnails.high.url,
          publishedAt: item.snippet.publishedAt,
          viewCount: item.statistics.viewCount,
          channelTitle: item.snippet.channelTitle,
        })),
      );
      setHasNextPage(videoData.nextPageToken !== undefined);
      setNextPageCursor(
        videoData.nextPageToken !== undefined ? videoData.nextPageToken : null,
      );
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, []);

  const fetchYoutubeDataMore = useCallback(async () => {
    if (!hasNextPage) {
      return;
    }

    try {
      const videoResults = await axiosInstance.get<VideoListResponseType>(
        '/videos',
        {
          params: {
            key: YOUTUBE_API_KEY,
            part: 'snippet, contentDetails, statistics',
            chart: 'mostPopular',
            regionCode: 'KR',
            pageToken: nextPageCursor,
          },
        },
      );

      const videoData = videoResults.data;
      setData(prevData => [
        ...prevData,
        ...videoData.items.map(item => ({
          title: item.snippet.title,
          thumbnail: item.snippet.thumbnails.high.url,
          publishedAt: item.snippet.publishedAt,
          viewCount: item.statistics.viewCount,
          channelTitle: item.snippet.channelTitle,
        })),
      ]);

      setHasNextPage(videoData.nextPageToken !== undefined);
      setNextPageCursor(
        videoData.nextPageToken !== undefined ? videoData.nextPageToken : null,
      );
    } catch (ex) {
      console.error(ex);
    }
  }, [hasNextPage, nextPageCursor]);

  return {
    data,
    fetchYoutubeData,
    fetchYoutubeDataMore,
  };
};

export default useYoutubeData;
