"use client";

import { useRouter } from "next/navigation";
import Heading from "./Heading";
import Button from "./Button";

interface EmptyStateProps {
  title?: string;
  subtitle?: string;
  showReset: boolean;
}

export default function EmptyState({
  title = "No results found",
  subtitle = "Try adjusting your search or filter to find what you're looking for.",
  showReset,
}: EmptyStateProps) {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center gap-2 h-[60vh]">
      <Heading title={title} subTitle={subtitle} center />
      <div className="w-48 mt-4">
        {showReset && (
          <Button
            outline
            label="Reset filters"
            onClick={() => router.push("/")}
          />
        )}
      </div>
    </div>
  );
}
