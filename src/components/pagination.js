import PropTypes from 'prop-types';

export default function Pagination({ currentPage, totalPages, onPageChange }) {
    return (
        <div className="flex justify-center space-x-2 mt-4">
            <button
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1 || totalPages === 0}
            >
                Anterior
            </button>
            <span className="px-4 py-2">
                Página {totalPages === 0 ? 0 : currentPage} de {totalPages}
            </span>
            <button
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages || totalPages === 0}
            >
                Siguiente
            </button>
        </div>
    );
}

Pagination.propTypes = {
    currentPage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
};
