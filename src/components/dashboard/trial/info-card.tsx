
import { ExclamationTriangleIcon } from '@heroicons/react/24/solid';

const TrialInfoCard = () => (
    <div className="rounded-lg shadow-md bg-blue-50 text-blue-900 p-6">
        <div className="flex items-center font-bold text-lg mb-3">
            <ExclamationTriangleIcon className="h-5 w-5 text-blue-600 mr-2" />
            Información sobre su instancia de prueba
        </div>

        <ul className="space-y-2 text-sm">
            <li className="flex items-start">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 mr-2"></span>
                <span>La instancia de prueba tiene una duración limitada.</span>
            </li>
            <li className="flex items-start">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 mr-2"></span>
                <span>No se requiere tarjeta de crédito o débito para la prueba.</span>
            </li>
            <li className="flex items-start">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 mr-2"></span>
                <span>La instancia puede ser eliminada por abuso según nuestros términos de servicio.</span>
            </li>
            <li className="flex items-start">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 mr-2"></span>
                <span>Límite de uso: 10 acciones o solicitudes cada 5 minutos.</span>
            </li>
        </ul>
    </div>
);

export default TrialInfoCard;