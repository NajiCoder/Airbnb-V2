import getReservations from "../actions/getReservations";
import { getCurrentUser } from "../actions/getCurrentUser";

import TripsClient from "./TripsClient";

import EmptyState from "../components/EmptyState";

export default async function Trips() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <EmptyState
        title="Unauthorized"
        subtitle="You must be signed in to view this page"
        showReset
      />
    );
  }

  const reservations = await getReservations({ userId: currentUser.id });

  if (reservations.length === 0) {
    return (
      <EmptyState
        title="No reservations"
        subtitle="Looks like you haven't made any reservations"
        showReset
      />
    );
  }

  return <TripsClient reservations={reservations} currentUser={currentUser} />;
}
