"use client";

import Link from "next/link";
import { Button } from "../pures/button/Button";
import { useState } from "react";

const SearchHome = () => {
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
          <Button primary extraClass="w-full rounded-2xl">
            Buscar cancha
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default SearchHome;
