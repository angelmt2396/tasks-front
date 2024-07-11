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
                        px-16 py-2 text-sm font-medium focus:ring-4 focus:outline-none focus:ring-green-300
                        dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800
                        text-white bg-green-500 rounded hover:bg-green-600">
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