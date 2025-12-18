import { useEffect, useState } from "react";

// 파일 -> URL
type UploadFn = (file: File) => Promise<string>;

interface UseImageUploadOptions {
  value?: string[];
  limit?: number;
  uploadFn: UploadFn;
  onChange?: (urls: string[]) => void;
}

export default function useImageUpload({
  value = [],
  limit = 4,
  uploadFn,
  onChange,
}: UseImageUploadOptions) {
  const [images, setImages] = useState<string[]>(value);
  const [isUploading, setIsUploading] = useState(false);

  // value 동기화
  useEffect(() => {
    setImages((prev) => {
      // 배열 길이나 원소가 완전히 동일하면 업데이트 안 함
      const isSame =
        prev.length === value.length && prev.every((v, i) => v === value[i]);
      return isSame ? prev : value;
    });
  }, [value]);

  // 이미지 업로드 함수 추가
  const addFiles = async (files: File[]) => {
    if (!files.length) return;

    setIsUploading(true);
    try {
      const uploadedUrls = await Promise.all(
        files.map((file) => uploadFn(file)),
      );
      setImages((prev) => {
        const updated = [...prev, ...uploadedUrls].slice(0, limit);
        onChange?.(updated);
        return updated;
      });
    } finally {
      setIsUploading(false);
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => {
      const updated = prev.filter((_, i) => i !== index);
      onChange?.(updated);
      return updated;
    });
  };

  return {
    images,
    isUploading,
    addFiles,
    removeImage,
    canUpload: images.length < limit && !isUploading,
  };
}
