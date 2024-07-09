import Link from 'next/link';
export default function Header() {
    return (
        <header className="bg-blue-600 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-xl font-bold">Mi Aplicación</h1>
                <nav className="space-x-4">
                    <Link href="/" className="hover:underline">
                        Inicio
                    </Link>
                    <Link href="/tasks" className="hover:underline">
                        Tareas
                    </Link>
                </nav>
            </div>
        </header>
    );
}