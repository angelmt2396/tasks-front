import Image from "next/image";

export default function Loading() {
    return (
        <div className="fixed inset-0 bg-gray-80 bg-opacity-75 flex items-center justify-center z-50">
            <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
                <Image
                    src="/images/loading.png"
                    alt="loading"
                    width={40}
                    height={40}
                    className="cursor-pointer"
                />
            </div>
        </div>
    );
}
