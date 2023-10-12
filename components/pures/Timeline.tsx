"use client";

import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { useState } from "react";
import Link from "next/link";
import { Court } from "@/utils/models";
import { paginationHours } from "@/utils/pagination";
import { between, calculatePostLimit, calculatePriorLimit } from "@/services/checking";

const Timeline = ({
	courts,
	reservations,
	clubId,
}: {
	courts: Court[];
	reservations: any;
	clubId: number;
}) => {
	const [actualPage, setActualPage] = useState(0);
	const [selectedHour, setSelectedHour] = useState<string>("");

	const allHours = [
		"08:00",
		"08:30",
		"09:00",
		"09:30",
		"10:00",
		"10:30",
		"11:00",
		"11:30",
		"12:00",
		"12:30",
		"13:00",
		"13:30",
		"14:00",
		"14:30",
		"15:00",
		"15:30",
		"16:00",
		"16:30",
		"17:00",
		"17:30",
		"18:00",
		"18:30",
		"19:00",
		"19:30",
		"20:00",
		"20:30",
		"21:00",
		"21:30",
		"22:00",
		"22:30",
	];

	const handlePage = (newPage: number) => {
		setActualPage(newPage);
	};

	const pages = paginationHours(allHours, 5);

	return (
		<div className="p-2 mx-auto">
			<div>
				<div className="flex gap-2 justify-center">
					<button
						disabled={actualPage === 0}
						onClick={() => handlePage(actualPage - 1)}
					>
						<ArrowBackIos />
					</button>
					{pages[actualPage].map((hour, i) => {
						const availableCourts = Object.keys(reservations).filter(
							(court) => !reservations[court].includes(hour),
						);
						return (
							<div key={i}>
								{availableCourts.length === 0 ? (
									<button className="text-gray-300">{hour}</button>
								) : (
									<button key={i} onClick={() => setSelectedHour(hour)}>
										{hour}
									</button>
								)}
							</div>
						);
					})}
					<button
						disabled={actualPage === pages.length - 1}
						onClick={() => handlePage(actualPage + 1)}
					>
						<ArrowForwardIos />
					</button>
				</div>
				{Object.keys(reservations).map((court, i) => {
					const actualCourt: Court = courts[i];
					const blockedHours = reservations[court]
						.map((hour: string) => {
							const limit1 = calculatePriorLimit(hour, 0.5);
							const limit2 = calculatePostLimit(hour, 0.5);
							return between(allHours, limit1, limit2);
						})
						.flat();
					if (!blockedHours.includes(selectedHour)) {
						const largeTurn = reservations[court]
							.map((hour: string) => {
								const limit1 = calculatePriorLimit(hour, 1);
								const limit2 = calculatePostLimit(hour, 1);
								return between(allHours, limit1, limit2);
							})
							.flat();
						if (!largeTurn.includes(selectedHour)) {
							return (
								<div key={i}>
									<Link
										href={`/reservations/new-reservation?clubId=${clubId}&courtId=${
											actualCourt.id
										}&hour=${selectedHour}&duration=${60}`}
									>
										<div>{actualCourt.name} disponible - 60 minutos</div>
									</Link>
									<Link
										href={`/reservations/new-reservation?clubId=${clubId}&courtId=${
											actualCourt.id
										}&hour=${selectedHour}&duration=${90}`}
									>
										<div>{actualCourt.name} disponible - 90 minutos</div>
									</Link>
								</div>
							);
						} else {
							return (
								<div key={i}>
									<Link
										href={`/reservations/new-reservation?clubId=${clubId}&courtId=${
											actualCourt.id
										}&hour=${selectedHour}&duration=${60}`}
									>
										<div>{actualCourt.name} disponible - 60 minutos</div>
									</Link>
								</div>
							);
						}
					}
					return null;
				})}
			</div>
		</div>
	);
};

export default Timeline;
