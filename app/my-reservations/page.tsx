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
            res[0] !== undefined &&
                bringClubById(res[0].clubId).then((res) => {
                    setClub(res);
                    bringCourts(res.name).then((res) => setCourts(res));
                });
            setReservations(res);
        });
    }, []);

    return (
        <div className="flex flex-col justify-center items-center px-4 py-8">
            <div style={{position:"absolute", top:"15px", right:"15px"}}>
                <span className="text-2xl">Mis reservas</span>
            </div>
            <div className="pt-8">
                {reservations.map((reservation: Reservation, i: number) => {
                    return (
                        <div
                            key={i}
                            className="flex flex-col gap-2 border border-1 border-gray p-4 rounded-md"
                        >
                            <div className="flex flex-col">
                                <span className="font-bold text-lg">{club.name}</span>
                                <span>
                                    {courts[i] !== undefined && courts[i].name}
                                </span>
                            </div>
                            <div className="flex gap-2">
                                <span>
                                    {reservation.reservedDay +
                                        "/" +
                                        reservation.reservedMonth +
                                        " " +
                                        reservation.reservedHour +
                                        ":" +
                                        reservation.reservedMinutes}
                                </span>
                                <span>{reservation.duration} minutos</span>
                            </div>
                            <Button
                                type="danger"
                                extraClass="rounded-2xl"
                                click={() => {
                                    reservation.id &&
                                        deleteReservation(
                                            reservation.id.toString()
                                        );
                                    setReservations(
                                        reservations.filter(
                                            (res) => res.id !== reservation.id
                                        )
                                    );
                                }}
                            >
                                Eliminar reserva
                            </Button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default MyReservationsPage;
