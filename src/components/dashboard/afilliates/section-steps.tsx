import Image from "next/image";

const steps = [
    {
        number: 1,
        title: "Invita a tu audiencia",
        image: "/images/affiliates/step-1.png",
        alt: "Invita a un amigo",
        description: "Comparte tu enlace de referencia único y deja que tus amigos o audiencia se unan al mundo y confiabilidad de Wazend | WhatsApp API fácil y rápido.",
    },
    {
        number: 2,
        title: "Tus amigos/audiencia aceptan",
        image: "/images/affiliates/step-2.png",
        alt: "Tus amigos aceptan",
        description: "Ellos se registran, comienzan a usar Wazend | WhatsApp API fácil y rápido y experimentan nuestra magia.",
    },
    {
        number: 3,
        title: "Recibe tu pago",
        image: "/images/affiliates/step-3.png",
        alt: "Recibe tu pago",
        description: "Cuando realizan un pago verificado, ganas 30% fácil y rápido.",
    },
];

export default function SectionsSteps() {
    return (
        <section className="bg-white p-6 mb-6">
            <div className="flex flex-col md:flex-row justify-between gap-6">
                {steps.map(({ number, title, image, alt, description }) => (
                    <div
                        key={number}
                        className="flex-1 min-w-[50px] text-center p-4 transition-transform hover:scale-105 duration-300"
                    >
                        <div className="w-20 h-20 mx-auto mb-5 relative">
                            <Image
                                src={image}
                                alt={alt}
                                width={70}
                                height={70}
                                className="object-contain"
                            />
                        </div>
                        <div className="inline-flex items-center justify-center w-8 h-8 bg-gray-200 rounded-full text-gray-600 mb-4 font-semibold">
                            {number}
                        </div>
                        <h3 className="font-bold text-lg mb-2 text-gray-700">{title}</h3>
                        <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
