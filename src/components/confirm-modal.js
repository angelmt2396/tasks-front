import PropTypes from 'prop-types';

export default function  ConfirmModal({ message, isOpen, onClose, onConfirm, confirmText }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg max-w-md mx-auto p-8">
                <p className="my-4 text-lg">{message}</p>
                <div className="flex justify-end space-x-6">
                    <button
                        className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
                        onClick={onConfirm}
                    >
                        {confirmText}
                    </button>
                    <button
                        className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}

ConfirmModal.propTypes = {
    message: PropTypes.string,
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
};
