"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Court } from "../../utils/models";
import { bringCourt } from "../../services/bringData";
import { createReservation } from "../../services/createEntries";
import { userStore } from "../../utils/globalStates";

const NewReservationPage = () => {
	const [clubId, setClubId] = useState("");
	const [court, setCourt] = useState<Court>({} as Court);
	const [hour, setHour] = useState<string>("");
	const [duration, setDuration] = useState<number>(0);

	const params = useSearchParams();

	const user = userStore((state: any) => state.user);

	const newReservation = () => {
		const actualDate = new Date();
		try {
			createReservation({
				duration: duration,
				reservedMonth: (actualDate.getMonth() + 1).toString().padStart(2, "0"),
				reservedDay: actualDate.getDate().toString().padStart(2, "0"),
				reservedHour: hour.split(":")[0],
				reservedMinutes: hour.split(":")[1],
				userId: user.id,
				clubId: parseInt(clubId),
				courtId: court.id,
			});
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
		<div>
			<h2>New reservation</h2>
			<h3>{court.name}</h3>
			<h3>{hour}</h3>
			<h3>{duration}</h3>
			<button onClick={newReservation}>Crear reserva</button>
			<button onClick={() => console.log(duration)}>Get duration</button>
		</div>
	);
};

export default NewReservationPage;
