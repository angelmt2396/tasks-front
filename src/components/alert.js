export default function AlertMessage({ message }) {
    return (
        <div className="bg-red-500 text-white px-4 py-2 rounded mb-4 inline-block justify-center">
            {message}
        </div>
    );
}
