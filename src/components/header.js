import Link from 'next/link';
export default function Header() {
    return (
        <header className="bg-albo text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-xl font-bold">
                    <Link href="/" className="hover:underline">
                        Appbo
                    </Link>
                </h1>
                <nav className="space-x-4">
                    <Link href="/" className="hover:underline">
                        Home
                    </Link>
                </nav>
            </div>
        </header>
    );
}