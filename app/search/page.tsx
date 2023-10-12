"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import "./search.css";
import { Club, Sport } from "@/utils/models";
import { findCourts } from "@/services/searchCourts";

const SearchPage = () => {
	const [country, setCountry] = useState("");
	const [province, setProvince] = useState("");
	const [city, setCity] = useState("");
	const [sport, setSport] = useState("");
	const [clubs, setClubs] = useState([] as Club[]);

	const params = useSearchParams();

	useEffect(() => {
		setCountry(params.get("country") as string);
		setProvince(params.get("province") as string);
		setCity(params.get("city") as string);
		setSport(params.get("sport") as string);
	}, [country, province, city, sport]);

	useEffect(() => {
		if (country && province && city && sport) {
			findCourts({ country, province, city, sport }).then((res) =>
				setClubs(res),
			);
		}
	}, [country, province, city, sport]);

	return (
		<div className="pt-10">
			<span className="px-4 text-lg">Clubes disponibles en {city}.</span>
			{clubs && (
				<div className="px-4 mt-4">
					{clubs.map((club: Club) => {
						return (
							<div key={club.id} className="card-club">
								<Link href={`reservations?club=${club.name}`}>
									<div className="bg-image flex items-end font-semibold" style={{ backgroundImage: `url(${club.image})`}}>
										<span className="p-2 text-lg">{club.name}</span>
									</div>
									<div className="flex p-2 font-bold text-sm">
										{club.sports.map((sport: Sport, i: number) => {
											return <span key={i}>{sport}</span>;
										})}
									</div>
								</Link>
							</div>
						);
					})}
				</div>
			)}
		</div>
	);
};

export default SearchPage;
