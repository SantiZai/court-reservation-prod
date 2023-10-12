"use client";

import "./court.scss";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Edit } from "@mui/icons-material";
import {
	FormControl,
	FormLabel,
	TextField,
	RadioGroup,
	FormControlLabel,
	Radio,
	InputAdornment,
	Select,
	MenuItem,
} from "@mui/material";
import Link from "next/link";
import { Court, SURFACE } from "@/utils/models";
import { bringCourt } from "@/services/bringData";
import { updateCourt } from "@/services/updateEntries";

const CourtClubPage = () => {
	/* TODO: Puedo juntar todos los estados en uno tipo objeto y ahi ir actualizando */
	const [court, setCourt] = useState({} as Court);
	const [name, setName] = useState("");
	const [disabled, setDisabled] = useState(true);
	const [surface, setSurface] = useState(SURFACE.PolvoDeLadrillo);
	const [illuminated, setIlluminated] = useState(false);

	const params = useParams();

	useEffect(() => {
		bringCourt(params.id[0]).then((res) => {
			setCourt(res);
			setIlluminated(res.illuminated);
			setName(res.name);
			setSurface(res.surface);
		});
	}, []);

	return (
		<div className="w-full h-full flex flex-col justify-center items-center px-4 py-8">
			<FormControl className="px-2 py-4 flex flex-col justify-center items-center gap-4">
				<div className="entry w-full flex flex-col">
					<FormLabel>Nombre de la cancha</FormLabel>
					<TextField
						defaultValue={name}
						disabled={disabled}
						onChange={(e) => setName(e.target.value)}
						variant="standard"
						InputProps={{
							startAdornment: (
								<div onClick={() => setDisabled(!disabled)}>
									<InputAdornment position="start">
										<Edit />
									</InputAdornment>
								</div>
							),
						}}
					>
						{court.name}
					</TextField>
				</div>
				<div className="entry w-full flex flex-col">
					<FormLabel>Superficie</FormLabel>
					<Select
						onChange={(e) => setSurface(e.target.value as SURFACE)}
						value={surface}
						variant="standard"
					>
						<MenuItem value={0}>Seleccioná una opción</MenuItem>
						<MenuItem value={"PolvoDeLadrillo"}>Polvo de ladrillo</MenuItem>
						<MenuItem value={"Cemento"}>Cemento</MenuItem>
						<MenuItem value={"Cesped"}>Césped</MenuItem>
						<MenuItem value={"CespedSintetico"}>Césped sintético</MenuItem>
						<MenuItem value={"Parquet"}>Parquet</MenuItem>
					</Select>
				</div>
				<div className="entry w-full flex flex-col">
					<FormLabel id="controlled-radio-buttons-group">Iluminación</FormLabel>
					<RadioGroup
						aria-labelledby="controlled-radio-buttons-group"
						name="controlled-radio-button-group"
						value={illuminated}
						onChange={() => setIlluminated(!illuminated)}
					>
						<FormControlLabel
							value={false}
							control={<Radio />}
							label="Sin iluminación"
						/>
						<FormControlLabel
							value={true}
							control={<Radio />}
							label="Con iluminación"
						/>
					</RadioGroup>
				</div>
                <div className="w-full flex flex-col justify-center items-center gap-2">
				<button
					className="btn-primary w-3/4 text-center rounded-lg py-1"
					onClick={() =>
						updateCourt(court.id.toString(), { name, surface, illuminated })
					}
				>
					Actualizar cancha
				</button>
                <Link href="/club" className="btn-secondary w-3/4 text-center rounded-lg py-1">Volver atrás</Link>
                </div>
			</FormControl>
		</div>
	);
};

export default CourtClubPage;
