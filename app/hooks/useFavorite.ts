import axios from "axios";

import { User } from "@prisma/client";

import { useRouter } from "next/navigation";
import { useMemo, useCallback } from "react";
import { toast } from "react-hot-toast";

import useLoginModal from "./useLoginModal";
interface IUseFavorite {
  listingId: string;
  currentUser?: User | null;
}

export default function useFavorite({ listingId, currentUser }: IUseFavorite) {
  const router = useRouter();
  const loginModal = useLoginModal();

  const hasFavorited = useMemo(() => {
    const list = currentUser?.favoriteIds || [];

    return list.includes(listingId);
  }, [currentUser, listingId]);

  const toggleFavorite = useCallback(
    async (event: React.MouseEvent<HTMLDivElement>) => {
      event.stopPropagation();

      if (!currentUser) {
        return loginModal.onOpen();
      }

      try {
        let request;

        if (hasFavorited) {
          request = () => axios.delete(`/api/favorites/${listingId}`);
        } else {
          request = () => axios.post(`/api/favorites/${listingId}`);
        }

        await request();
        router.refresh();
        toast.success("success");
      } catch (error) {
        toast.error("Something went wrong with favoriting this listing");
      }
    },
    [currentUser, hasFavorited, listingId, loginModal, router]
  );

  return {
    hasFavorited,
    toggleFavorite,
  };
}
