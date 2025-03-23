import {KAKAO_API_KEY} from '@env';

const baseUrl = 'https://dapi.kakao.com/v2/local';

export const getAddressFromCoords = async (
  latitude: number,
  longitude: number,
): Promise<string | null> => {
  const response = await fetch(
    `${baseUrl}/geo/coord2address.json?x=${longitude}&y=${latitude}`,
    {
      method: 'GET',
      headers: {
        Authorization: `KakaoAK ${KAKAO_API_KEY}`,
      },
    },
  )
    .then(res => res.json())
    .then(data => {
      if (data.meta.total_count === 0 || data.documents.length === 0) {
        return null;
      }
      const addressItem = data.documents[0];
      if (addressItem.road_address) {
        return addressItem.road_address.address_name;
      }
      return null;
    })
    .catch(error => {
      console.error('Error fetching address:', error);
      return null;
    });

  return response;
};
