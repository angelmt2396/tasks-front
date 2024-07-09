'use client';
import Link from "next/link";
import { useState } from 'react';
import ConfirmModal from '@/components/confirm-modal';
import {createTask} from "@/services/tasks";


export default function TaskCreate() {
    const [task, setTask] = useState({
        name: '',
        description: '',
        assignedPersonEmail: '',
        startDate: '',
        endDate: ''
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setTask((prevTask) => ({
            ...prevTask,
            [name]: value
        }));
    };
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleCreate = async () => {
        await createTask(task);
        closeModal();
        window.location.href = '/tasks';
    };
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-10 bg-gray-100">
            <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold mb-6">Detalles de la Tarea</h1>
                <form>
                    <div className="mb-4">
                        <label className="block text-gray-700">Nombre de la Tarea</label>
                        <input
                            type="text"
                            name="name"
                            value={task.name}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Descripción</label>
                        <textarea
                            name="description"
                            value={task.description}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Asignado a</label>
                        <input
                            type="text"
                            name="assignedPersonEmail"
                            value={task.assignedPersonEmail}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Fecha de Inicio</label>
                        <input
                            type="datetime-local"
                            name="startDate"
                            value={task.startDate}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Fecha de Fin</label>
                        <input
                            type="datetime-local"
                            name="endDate"
                            value={task.endDate}
                            disabled={!task.startDate}
                            min={task.startDate}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg"
                        />
                    </div>
                    <div className="flex justify-between">
                        <button
                            type="button"
                            onClick={openModal}
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            Crear
                        </button>
                        <Link href={'/tasks'}>
                            <button
                                type="button"
                                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                            >
                                Regresar a la Lista
                            </button>
                        </Link>
                    </div>
                </form>
            </div>

            <ConfirmModal
                message={'Confirm the creation'}
                isOpen={isModalOpen}
                onClose={closeModal}
                onConfirm={handleCreate}
            />
        </div>
    );
}
