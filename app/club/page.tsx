"use client";

import "./club.css";
import { bringClubById, bringUserByEmail } from "@/services/bringData";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Club, Court, User } from "@/utils/models";

const ClubPage = () => {
	const [user, setUser] = useState({} as User);
	const [club, setClub] = useState({} as Club);

	const { data: session } = useSession();

	useEffect(() => {
		if (session?.user) {
			bringUserByEmail(session?.user?.email as string).then((res) => {
				setUser(res);
				bringClubById(res.clubAdmin.toString()).then((res) => setClub(res));
			});
		}
	}, [club]);

	return (
		<div className="flex flex-col pt-4">
			<div className="flex justify-end">Logo</div>
			{user.admin && (
				<>
					<span className="text-xl mx-auto mt-4 mb-4">Gestión del club</span>
					<span className="font-semibold w-5/6 mx-auto">{club.name}</span>
					<div className="flex flex-col justify-center items-center gap-2">
						{club.courts &&
							club.courts.map((court: Court) => {
								return (
									<div
										key={court.id}
										className="court flex flex-col w-5/6 mx-auto p-4 rounded-md"
									>
										<Link href={`/club/court/${court.id}`}>
											<span className="text-lg">{court.name}</span>
											<div>
												<span className="text-sm">{court.surface}</span>
												<span> - </span>
												<span className="text-sm">{court.sport}</span>
												<span> - </span>
												<span className="text-sm">
													{court.illuminated
														? "Con iluminación"
														: "Sin iluminación"}
												</span>
											</div>
										</Link>
									</div>
								);
							})}
						<button className="btn-primary w-2/3 py-2 mt-2 rounded-lg">
							Agregar más canchas
						</button>
					</div>
				</>
			)}
		</div>
	);
};

export default ClubPage;
