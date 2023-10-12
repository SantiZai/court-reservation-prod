"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { userStore } from "@/utils/globalStates";
import { createReservation } from "@/services/createEntries";
import { bringCourt } from "@/services/bringData";
import { Court, Reservation } from "@/utils/models";
import { FormControl, FormLabel, TextField } from "@mui/material";
import { Button } from "@/components/pures/button/Button";

const NewReservationPage = () => {
  const [clubId, setClubId] = useState("");
  const [court, setCourt] = useState<Court>({} as Court);
  const [hour, setHour] = useState<string>("");
  const [duration, setDuration] = useState<number>(0);
  const [description, setDescription] = useState("");

  const params = useSearchParams();

  const user = userStore((state: any) => state.user);

  const newReservation = () => {
    const actualDate = new Date();
    try {
      createReservation({
        duration,
        description,
        reservedMonth: (actualDate.getMonth() + 1).toString().padStart(2, "0"),
        reservedDay: actualDate.getDate().toString().padStart(2, "0"),
        reservedHour: hour.split(":")[0],
        reservedMinutes: hour.split(":")[1],
        userId: user.id,
        clubId: parseInt(clubId),
        courtId: court.id,
      } as Reservation);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    bringCourt(params.get("courtId")!).then((res) => setCourt(res));
    setClubId(params.get("clubId")!);
    setHour(params.get("hour")!);
    setDuration(parseInt(params.get("duration")!));
  }, []);

  return (
    <div className="w-full pt-10 flex flex-col items-center gap-4">
      <span>Detalles de la reserva</span>
      <div className="w-3/4 flex flex-col justify-center items-center gap-2">
        <span className="text-xl font-semibold">{court.name}</span>
		<div className="w-full flex justify-center gap-2">
        <span>{hour}hs</span>
        <span>{duration} minutos</span>
		</div>
		<FormControl className="w-full">
        <FormLabel className="font-sm">Descripción de la reserva</FormLabel>
        <TextField
		className="w-full"
          onChange={(e) => setDescription(e.target.value)}
          variant="standard"
		  placeholder="Rivales / otra descripción"
        />
		</FormControl>
      </div>
      <Button click={newReservation} primary extraClass="rounded-md">Crear reserva</Button>
    </div>
  );
};

export default NewReservationPage;
