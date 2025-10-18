import { useEffect, useState } from "react";

export function usePreloadImages(urls = []) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!urls || urls.length === 0) return;

    let loadedCount = 0;
    urls.forEach((url) => {
      const img = new Image();
      img.src = url;
      img.onload = img.onerror = () => {
        loadedCount++;
        if (loadedCount === urls.length) {
          setLoaded(true);
        }
      };
    });
  }, [urls]);

  return loaded;
}