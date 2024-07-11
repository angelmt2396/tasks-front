export const ErrorModal = ({ error, onClose }) => {
    if (!error) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg max-w-md mx-auto p-8">
                <p className="my-4 text-lg">{error}</p>
                <div className="flex justify-end space-x-6">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};