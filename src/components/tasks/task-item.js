'use client';
import Link from 'next/link';
import {deleteTask} from "@/services/tasks";
import {useState} from "react";
import ConfirmModal from "@/components/confirm-modal";

export default function TaskItem({ task }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    const handlerDelete = async () => {
        await deleteTask(task.uuid);
        closeModal();
        window.location.reload();
    }
    return (
        <div className="flex items-center justify-between p-4 mb-4 bg-white rounded-lg shadow-md">
            <h3 className="text-lg font-semibold">{task.name}</h3>
            <div>
                <Link href={`/tasks/${task.uuid}`}
                    className="px-4 py-2 mr-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                >
                    Ver más
                </Link>
                <button
                    className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
                    onClick={openModal}
                >
                    Eliminar
                </button>
            </div>
            <ConfirmModal
                message={'Are you sure you want to delete the task?'}
                isOpen={isModalOpen}
                onClose={closeModal}
                onConfirm={handlerDelete}
            />
        </div>
    );
};