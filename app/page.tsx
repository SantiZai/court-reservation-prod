import { Button } from "@/components/pures/button/Button";
import "./home.css";
import SearchHome from "@/components/containers/SearchHome";

const HomePage = () => {
  return (
    <main>
      <div className="bg-image">
        <div className="w-full flex justify-end p-4">
          <span>Logo</span>
        </div>

        <div className="flex flex-col p-4">
          <span className="font-semibold text-5xl [text-wrap:balance]">
            Reserva tu cancha al instante
          </span>
          <span className="[text-wrap:balance]">
            Selecciná entre las opciones disponibles en tu ciudad en tiempo
            real!
          </span>
        </div>

        <SearchHome />
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
          <Button type="primary" extraClass="px-6 py-1 rounded-2xl">
            Funcionalidades
          </Button>
          <Button type="secondary" extraClass="px-6 py-1 rounded-2xl">
            Planes y precios
          </Button>
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
