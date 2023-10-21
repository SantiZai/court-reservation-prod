"use client";

import { bringPlayerReservations } from "@/services/bringData";
import { userStore } from "@/utils/globalStates";
import { Reservation } from "@/utils/models";
import { useEffect, useState } from "react";

const MyReservationsPage = () => {
    const [reservations, setReservations] = useState([] as Reservation[]);

    const user = userStore((state: any) => state.user);

    useEffect(() => {
        bringPlayerReservations(user.id).then((res) => setReservations(res));
    }, []);

    return (
        <div className="flex flex-col justify-center items-center px-4 py-8">
            <div>
                <span>Mis reservas</span>
            </div>
            <div>
                {reservations.map((reservation: Reservation) => {
                    return (
                        <div key={reservation.id}>
                            <div className="flex gap-2">

                            <span>{reservation.club?.name}</span>
                            <span>{reservation.court?.name}</span>
                            </div>
                            <div className="flex gap-2">

                            <span>{reservation.duration} minutos</span>
                            <span>
                                {reservation.reservedDay +
                                    " " +
                                    reservation.reservedHour +
                                    ":" +
                                    reservation.reservedMinutes}
                            </span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default MyReservationsPage;
