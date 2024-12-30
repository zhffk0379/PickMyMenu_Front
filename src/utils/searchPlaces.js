export const searchPlaces = (keyword) => {
  return new Promise((resolve, reject) => {
    if (!window.naver || !window.naver.maps) {
      reject(new Error("네이버 지도 서비스가 로드되지 않았습니다."))
      return;
    }
    window.naver.maps.Service.search(
      {query: keyword},
      (response, status) => {
        if (status !== window.naver.maps.Servie.Status.OK) {
          reject(new Error("검색 결과를 가져오지 못했습니다"));
          return;
        }
        resolve(response);
      }
    );
  })
}