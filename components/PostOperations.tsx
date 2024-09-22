'use client';
import { Post } from '@prisma/client';
import React, { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Icon } from './icon';
import Link from 'next/link';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { toast } from './ui/use-toast';
import { useRouter } from 'next/navigation';

interface PostOperationsProps {
  post: Pick<Post, 'id' | 'title' | 'published' | 'createdAt'>;
}

const deletePost = async (postId: string) => {
  try {
    const response = await fetch(`/api/posts/${postId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed');
    }

    return true;
  } catch (err) {
    toast({
      title: '問題が発生しました。',
      description: '記事の作成ができませんでした。もう一度お試しください。',
      variant: 'destructive',
    });
  }
};

const PostOperations = ({ post }: PostOperationsProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState<boolean>(false);
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Icon.ellipsis className="h-4 w-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            <Link href={`/editor/${post.id}`} className="w-full">
              編集
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="text-destructive cursor-pointer focus:text-destructive"
            onClick={() => setShowDeleteAlert(true)}
          >
            削除
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>本当にこの記事を削除しますか？</AlertDialogTitle>
            <AlertDialogDescription>
              この操作は取り返しができません。
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>キャンセル</AlertDialogCancel>
            <AlertDialogAction
              onClick={async (e) => {
                setIsLoading(true);
                e.preventDefault();
                e.stopPropagation();
                const deleted = await deletePost(post.id);
                setIsLoading(false);
                console.log(deleted);
                if (deleted) {
                  setShowDeleteAlert(false);
                  router.refresh();
                }
              }}
              className="bg-red-600 hover:ring-red-200"
            >
              {isLoading ? (
                <Icon.spinner className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Icon.trash className="h-4 w-4 mr-2" />
              )}
              削除
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default PostOperations;
