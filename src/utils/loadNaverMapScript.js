// utils/loadNaverMapScript.js
export const loadNaverMapScript = (clientId) => {
  return new Promise((resolve, reject) => {
    if (window.naver) {
      resolve(window.naver); // 이미 로드된 경우 바로 반환
      return;
    }

    const existingScript = document.querySelector(
      `script[src*="openapi.map.naver.com"]`
    );

    if (existingScript) {
      existingScript.onload = () => resolve(window.naver);
      existingScript.onerror = () =>
        reject(new Error("네이버 지도 스크립트 로드 실패"));
      return;
    }

    const script = document.createElement("script");
    script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${clientId}`;
    script.async = true;
    script.onload = () => resolve(window.naver);
    script.onerror = () => reject(new Error("네이버 지도 스크립트 로드 실패"));
    document.head.appendChild(script);
  });
};
