
import { ClockIcon } from '@heroicons/react/24/outline';

const ExpirationBadge = ({ endDate } : { endDate: string }) => {
    const endDateTime = new Date(endDate);
    const today = new Date();
    const diffTime = endDateTime.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    const getStatusColor = () => {
        if (diffDays <= 1) return 'bg-red-100 text-red-800';
        if (diffDays <= 3) return 'bg-yellow-100 text-yellow-800';
        return 'bg-green-100 text-green-800';
    };

    return (
        <div className={`rounded-t-lg ${getStatusColor()} p-4 mb-6`}>
            <div className="flex items-center font-medium text-sm">
                <ClockIcon className="h-5 w-5 mr-2" />
                {diffDays <= 1 ? (
                    <span>¡Tu instancia expira <strong>mañana</strong>!</span>
                ) : (
                    <span>Tu instancia expira en <strong>{diffDays} días</strong> ({endDateTime.toLocaleDateString('es-PE')})</span>
                )}
            </div>
        </div>
    );
};

export default ExpirationBadge;