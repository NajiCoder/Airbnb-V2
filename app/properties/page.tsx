export const dynamic = "force-dynamic";

import { getCurrentUser } from "../actions/getCurrentUser";

import EmptyState from "../components/EmptyState";
import getListings from "../actions/getListings";
import PropertiesCLient from "./PropertiesCLient";

export default async function PropertiesPage() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <EmptyState
        title="Unauthorized"
        subtitle="You must be signed in to view this page"
      />
    );
  }

  const listings = await getListings({ userId: currentUser.id });

  if (listings.length === 0) {
    return (
      <EmptyState
        title="No properties found"
        subtitle="Looks like you haven't added any properties yet"
      />
    );
  }

  return <PropertiesCLient listings={listings} currentUser={currentUser} />;
}
