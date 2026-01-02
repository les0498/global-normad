"use client";

import React from "react";
import Image from "next/image";
import Button from "@/components/Button";
import Card from "@/components/Card";

interface ExperienceCardProps {
  title: string;
  rating: number;
  reviewCount: number;
  price: number;
  imageUrl: string;
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function ExperienceCard({
  title,
  rating,
  reviewCount,
  price,
  imageUrl,
  onEdit,
  onDelete,
}: ExperienceCardProps) {
  return (
    <div className="flex rounded-3xl bg-white shadow-[0_4px_24px_rgba(156,180,202,0.2)] p-6 max-w-2xl mb-6">
      {/* 왼쪽 콘텐츠 영역 */}
      <div className="flex-1 min-w-0">
        <Card.Title className="typo-16-b md:typo-18-b leading-snug break-keep line-clamp-2">
          {title}
        </Card.Title>

        <Card.Meta rating={rating} count={reviewCount} className="mt-2" />

        <Card.Price
          price={`₩${price.toLocaleString()}`}
          unit="/ 인"
          className="mt-2"
        />

        {/* 액션 버튼 */}
        <div className="mt-4 flex gap-2 flex-shrink-0">
          <Button
            label="수정하기"
            variant="ghost"
            onClick={onEdit}
            className="typo-14-m px-5 py-2 rounded-xl border border-gray-200 whitespace-nowrap"
          />
          <Button
            label="삭제하기"
            variant="secondary"
            onClick={onDelete}
            className="typo-14-m px-5 py-2 rounded-xl whitespace-nowrap"
          />
        </div>
      </div>

      {/* 오른쪽 썸네일 이미지 */}
      <div className="relative ml-6 w-20 h-20 md:w-36 md:h-36 flex-shrink-0">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="rounded-3xl md:rounded-[32px] object-cover"
        />
      </div>
    </div>
  );
}
