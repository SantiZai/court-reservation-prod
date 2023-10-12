"use client";

import { bringUserByEmail } from "@/services/bringData";
import { User } from "@/utils/models";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const JoinPage = () => {
	const [user, setUser] = useState({} as User);

	const { data: session } = useSession();

	useEffect(() => {
		bringUserByEmail(session?.user?.email as string).then((res) =>
			setUser(res),
		);
	}, []);

	return (
		<div>
			{user.admin ? (
				<span>
					Ya tienes un club a cargo, inicia sesión en otra cuenta para adherir
					otro club
				</span>
			) : (
				<span>Join us</span>
			)}
		</div>
	);
};

export default JoinPage;
