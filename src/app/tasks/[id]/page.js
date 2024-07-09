'use client';
import Link from "next/link";
import {findByUUID} from "@/services/tasks";
import { formatDateToInput } from '@/utils/date';
import {useEffect, useState} from "react";
import { updateTask} from "@/services/tasks";

export default function TaskUpdate({ params }) {
    const { id } = params;
    const [task, setTask] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        assignedPersonEmail: '',
        startDate: '',
        endDate: ''
    });

    useEffect(() => {
        const fetchTask = async () => {
            const taskData = await findByUUID(id);
            setTask(taskData);
            setFormData({
                name: taskData.name || '',
                description: taskData.description || '',
                assignedPersonEmail: taskData.assignedPersonEmail || '',
                startDate: formatDateToInput(taskData.startDate) || '',
                endDate: formatDateToInput(taskData.endDate) || ''
            });
        };
        fetchTask();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await updateTask(id, formData);
    };
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-10 bg-gray-100">
            <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold mb-6">Detalles de la Tarea</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Nombre de la Tarea</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Descripción</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Asignado a</label>
                        <input
                            type="text"
                            name="assignedPersonEmail"
                            value={formData.assignedPersonEmail}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Fecha de Inicio</label>
                        <input
                            type="datetime-local"
                            name="startDate"
                            value={formData.startDate}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Fecha de Fin</label>
                        <input
                            type="datetime-local"
                            name="endDate"
                            value={formData.endDate}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg"
                        />
                    </div>
                    <div className="flex justify-between">
                        <button type="submit"
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Guardar
                        </button>
                        <Link href={'/tasks'}>
                            <button type="button"
                                    className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">Regresar a la
                                Lista
                            </button>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
