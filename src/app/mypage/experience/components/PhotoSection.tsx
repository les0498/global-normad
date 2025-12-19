"use client";

import ImageUpload from "./ImageUpload";
import Image from "next/image";
import IconDelete from "@/assets/icon/icon_delete_button.svg";
import useImageUpload from "@/hooks/useImageUpload";
import { uploadActivityImage } from "@/app/mypage/experience/api/activities";

interface PhotoSectionProps {
  limit?: number; // 업로드 가능한 이미지 개수 제한
  value?: string[];
  onChange?: (urls: string[]) => void; // 부모에게 현재 이미지 URL배열 전달
}

export default function PhotoSection({
  limit = 4,
  value = [],
  onChange,
}: PhotoSectionProps) {
  const { images, addFiles, removeImage, canUpload } = useImageUpload({
    value,
    limit,
    uploadFn: uploadActivityImage,
    onChange,
  });

  return (
    <div className="flex flex-wrap justify-center sm:justify-start gap-3">
      <ImageUpload
        onChange={addFiles}
        limit={limit}
        count={images.length}
        disabled={!canUpload}
      />

      {images.map((src, idx) => (
        <div key={idx} className="relative">
          <div className="relative w-32 h-32 rounded-2xl overflow-hidden border border-gray-200">
            <Image
              src={src}
              alt={`uploaded-${idx}`}
              fill
              className="object-cover"
            />
          </div>
          <button
            type="button"
            onClick={() => removeImage(idx)}
            className="absolute top-[-8px] right-[-8px] w-7 h-7 flex items-center justify-center 
              bg-gray-950 rounded-full hover:brightness-110 transition"
          >
            <Image src={IconDelete} alt="삭제" width={20} height={20} />
          </button>
        </div>
      ))}
    </div>
  );
}
