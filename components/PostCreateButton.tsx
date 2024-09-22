'use client';
import { cn } from '@/lib/utils';
import React, { useState } from 'react';
import { ButtonProps, buttonVariants } from './ui/button';
import { Icon } from './icon';
import { useRouter } from 'next/navigation';
import { toast } from './ui/use-toast';

interface PostCreateButtonProps extends ButtonProps {}

const PostCreateButton = ({
  className,
  variant,
  ...props
}: PostCreateButtonProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const onClick = async () => {
    setLoading(true);

    const response = await fetch('/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: 'Untitled Post',
      }),
    });
    setLoading(false);

    if (!response.ok) {
      return toast({
        title: '問題が発生しました。',
        description: '投稿が作成されませんでした。もう一度お試しください。',
        variant: 'destructive',
      });
    }

    const post = await response.json();
    router.refresh();
    router.push(`/editor/${post.id}`);
  };
  return (
    <button
      className={cn(
        buttonVariants({ variant }),
        { 'cursor-not-allowed opacity-60': loading },
        className
      )}
      onClick={onClick}
      disabled={loading}
      {...props}
    >
      {loading ? (
        <Icon.spinner className="animate-spin mr-2 h-4 w-4" />
      ) : (
        <Icon.add className="mr-2 h-4 w-4" />
      )}
      新しい投稿
    </button>
  );
};

export default PostCreateButton;
