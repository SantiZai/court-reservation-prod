"use client";

import Timeline from "../components/Timeline";
import { bringClub, bringCourts } from "../services/bringData";
import { checkReservations } from "../services/checking";
import { Court } from "../utils/models";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const ReservationsPage = () => {
	const [clubId, setClubId] = useState(0);
	const [courts, setCourts] = useState([] as Court[]);
	const [reservations, setReservations] = useState({} as {});

	const params = useSearchParams();

	useEffect(() => {
		if (params.get("club")) {
			bringCourts(params.get("club") as string).then((res) => setCourts(res));
			bringClub(params.get("club") as string).then((res) => setClubId(res.id));
		}
	}, []);

	useEffect(() => {
		if (courts && courts.length > 0) {
			setReservations(checkReservations(courts));
		}
	}, [courts]);

	return (
		<div>
			<h2>Reservations</h2>
			<div>
				<Timeline clubId={clubId} courts={courts} reservations={reservations} />
			</div>
		</div>
	);
};

export default ReservationsPage;
