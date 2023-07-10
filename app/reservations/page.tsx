export const dynamic = "force-dynamic";

import ReservationsClient from "./ReservationsClient";

import getReservations from "../actions/getReservations";
import { getCurrentUser } from "../actions/getCurrentUser";

import EmptyState from "../components/EmptyState";

export default async function ReservationPage() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <EmptyState
        title="Unauthorized"
        subtitle="Please login to view your reservations"
      />
    );
  }

  const reservations = await getReservations({ authorId: currentUser.id });

  if (reservations.length === 0) {
    return (
      <EmptyState
        title="No Reservations"
        subtitle="Looks like you have no reservations on your properties"
      />
    );
  }

  return (
    <ReservationsClient reservations={reservations} currentUser={currentUser} />
  );
}
