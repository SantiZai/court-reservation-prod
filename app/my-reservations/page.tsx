"use client";

import { Button } from "@/components/pures/button/Button";
import {
    bringClubById,
    bringCourts,
    bringPlayerReservations,
} from "@/services/bringData";
import { deleteReservation } from "@/services/deleteEntries";
import { userStore } from "@/utils/globalStates";
import { Club, Court, Reservation } from "@/utils/models";
import { useEffect, useState } from "react";

const MyReservationsPage = () => {
    const [reservations, setReservations] = useState([] as Reservation[]);
    const [club, setClub] = useState({} as Club);
    const [courts, setCourts] = useState([] as Court[]);

    const user = userStore((state: any) => state.user);

    useEffect(() => {
        bringPlayerReservations(user.id).then((res) => {
            console.log(res);
            bringClubById(res[0].clubId).then((res) => {
                setClub(res);
                bringCourts(res.name).then((res) => setCourts(res));
            });
            setReservations(res);
        });
    }, []);

    return (
        <div className="flex flex-col justify-center items-center px-4 py-8">
            <div>
                <span>Mis reservas</span>
            </div>
            <div>
                {reservations.map((reservation: Reservation, i: number) => {
                    return (
                        <div
                            key={i}
                            className="flex flex-col gap-2"
                        >
                            <div className="flex flex-col">
                                <span>{club.name}</span>
                                <span>{courts[i] !== undefined && courts[i].name}</span>
                            </div>
                            <div className="flex gap-2">
                                <span>{reservation.duration} minutos</span>
                                <span>
                                    {reservation.reservedDay +
                                        "/" +
                                        reservation.reservedMonth +
                                        " " +
                                        reservation.reservedHour +
                                        ":" +
                                        reservation.reservedMinutes}
                                </span>
                            </div>
                            <Button type="danger" extraClass="rounded-2xl" click={() => {
                                reservation.id && deleteReservation(reservation.id.toString())
                                }}>Eliminar reserva</Button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default MyReservationsPage;
