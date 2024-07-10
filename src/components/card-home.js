import Link from "next/link";
import Image from "next/image";

export default function CardHome ({ title, router, routerImage, buttonText }) {
    return (
        <div className=" max-w-sm rounded overflow-hidden shadow-lg bg-white">
            <Image
                src={routerImage}
                alt="imageCard"
                width={300}
                height={300}
                className="cursor-pointer p-3"
            />
            <div className="p-5">
                <div className="font-bold text-xl mb-2 text-center">{title}</div>
            </div>
            <div className="px-6 pt-4 pb-2">
                <Link href={`${router}`}>
                    <button
                        className="w-full inline-flex items-center justify-center
                        px-4 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg
                        hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300
                        dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        {buttonText}
                        <Image
                            src="/images/arrow.png"
                            alt="arrow"
                            width={20}
                            height={20}
                            className="cursor-pointer ml-4"
                        />
                    </button>
                </Link>
            </div>
        </div>
    )
}