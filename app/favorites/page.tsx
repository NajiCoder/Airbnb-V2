export const dynamic = "force-dynamic";

import { getCurrentUser } from "../actions/getCurrentUser";
import getFavoritelistings from "../actions/getFavoritelistings";
import EmptyState from "../components/EmptyState";
import FavoritesClient from "./FavoritesClient";

export default async function FavoritesPage() {
  const listings = await getFavoritelistings();
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    return (
      <EmptyState
        title="You don't have any favorites yet"
        subtitle="Looks like you have no favorite listings yet. Click the heart icon on a listing to add it to your favorites."
      />
    );
  }

  return <FavoritesClient listings={listings} currentUser={currentUser} />;
}
