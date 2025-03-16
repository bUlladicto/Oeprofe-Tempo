"use client";

interface LessonContentProps {
  content: string;
}

export default function LessonContent({ content }: LessonContentProps) {
  return (
    <div className="prose prose-blue max-w-none">
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
}
