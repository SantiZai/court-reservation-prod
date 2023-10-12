"use client";

import "./home.css";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/pures/button/Button";

const HomePage = () => {
  const [data, setData] = useState(
    {} as { country: string; province: string; city: string; sport: string }
  );

  const handleChange =
    (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setData({
        ...data,
        [field]: e.target.value,
      });
    };
  return (
    <main>
      <div className="bg-image">
        <div className="w-full flex justify-end p-4">
          <span>Logo</span>
        </div>

        <div className="flex flex-col p-4">
          <span className="font-semibold text-5xl [text-wrap:balance]">Reserva tu cancha al instante</span>
          <span className="[text-wrap:balance]">
            Selecciná entre las opciones disponibles en tu ciudad en tiempo
            real!
          </span>
        </div>

        <div className="p-4">
          <div className="container-search flex flex-col p-2 rounded-2xl">
            <div>
              <div className="flex px-4 py-2">
                <input
                  type="text"
                  placeholder="País"
                  onChange={handleChange("country")}
                />
                <input
                  type="text"
                  placeholder="Provincia/Estado"
                  onChange={handleChange("province")}
                />
              </div>
              <div className="flex px-4 py-2">
                <input
                  type="text"
                  placeholder="Ciudad"
                  onChange={handleChange("city")}
                />
                <input
                  type="text"
                  placeholder="Deporte"
                  onChange={handleChange("sport")}
                />
              </div>
            </div>
            <Link
              href={`search?country=${data.country}&province=${data.province}&city=${data.city}&sport=${data.sport}`}
              className="btn-primary w-full text-center rounded-2xl py-1"
            >
              <Button primary extraClass="w-full rounded-2xl">Buscar cancha</Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="manage-courts text-center px-4 py-6 font-semibold">
        <span>Gestioná el uso de tus canchas de forma cómoda y práctica</span>
      </div>

      <div className="test-service px-4 py-6">
        <div className="flex flex-col px-2 pb-4">
          <span className="service-question mb-4 text-center">
            ¿Cómo puedo probar el servicio para mi institución deportiva?
          </span>
          <span className="points">
            1. Ver planes y funciones según tus necesidades y las de tus
            clientes
          </span>
          <span className="points">2. Contactarte con nosotros</span>
          <span className="points">
            3. Recibes tu prueba <strong>gratis</strong> de hasta 30 días para
            probar nuestro software
          </span>
        </div>
        <div className="flex w-full justify-between">
          <button className="btn-primary rounded-md px-4 py-2 text-sm">
            Funcionalidades
          </button>
          <button className="btn-secondary rounded-md px-4 py-2 text-sm">
            Planes y precios
          </button>
        </div>
      </div>

      <div className="w-full flex flex-col items-center">
        <div>
          <span>Preguntas frecuentes</span>
        </div>
        <div></div>
      </div>
    </main>
  );
};

export default HomePage;
