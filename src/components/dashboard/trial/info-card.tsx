
import { ExclamationTriangleIcon } from '@heroicons/react/24/solid';

const TrialInfoCard = () => {
    
    const data = {
        title: "Información sobre su instancia de prueba",
        items: [
            "La instancia de prueba tiene una duración limitada.",
            "No se requiere tarjeta de crédito o débito para la prueba.",
            "La instancia puede ser eliminada por abuso según nuestros términos de servicio.",
            "Límite de uso: 10 acciones o solicitudes cada 5 minutos.",
        ]
    }

    return (
    <div className="rounded-lg shadow-md bg-blue-50 text-blue-900 p-6">
        <div className="flex items-center font-bold text-lg mb-3">
            <ExclamationTriangleIcon className="h-5 w-5 text-blue-600 mr-2" />
            {data.title}
        </div>

        <ul className="space-y-2 text-sm">
            {data.items.map((item, index) => (
                <li key={index} className="flex items-start">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 mr-2"></span>
                    <span>{item}</span>
                </li>
            ))}
        </ul>
    </div>
    )
}

export default TrialInfoCard;