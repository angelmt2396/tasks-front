'use client';
import Link from "next/link";
import {findByUUID} from "@/services/tasks";
import { formatDateToInput } from '@/utils/date';
import {useEffect, useState} from "react";
import { updateTask} from "@/services/tasks";
import ConfirmModal from "@/components/confirm-modal";
import DateTimeInput from "@/components/datetime-input";
import {findAllEmail} from "@/services/teams";

export default function TaskUpdate({ params }) {
    const { id } = params;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [team, setTeam] = useState('');
    const [task, setTask] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        assignedPersonEmail: '',
        startDate: '',
        endDate: ''
    });
    const [emails, setEmails] = useState([]);

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
            setEmails([taskData.assignedPersonEmail]);
        };
        fetchTask();
    }, [id]);

    useEffect(() => {
        const fetchEmails = async () => {
            if(team){
                const teamEmails = await findAllEmail({teamName: team});
                setEmails(teamEmails);
            }
        };

        fetchEmails();
    }, [team]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const handleSubmit = async () => {
        await updateTask(id, formData);
        closeModal();
        window.location.href = '/tasks';
    };

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    return (
        <div className="w-full max-w-7xl bg-white p-4 md:p-6 rounded-lg shadow-md mx-auto my-4 md:my-8">
            <div className="w-full bg-white p-6 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold mb-6">Task details</h1>
                <form>
                    <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
                        <div className="mb-4 md:mb-0">
                            <label className="block text-gray-700 mb-2">Task name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div className="mb-4 md:mb-0">
                            <label className="block text-gray-700 mb-2">Assigned to</label>
                            <select
                                name="assignedPersonEmail"
                                value={formData.assignedPersonEmail}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                {emails.map((email) => (
                                    <option key={email} value={email}>
                                        {email}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-4 md:mb-0">
                            <label className="block text-gray-700 mb-2">Team</label>
                            <select
                                value={team}
                                onChange={(e) => setTeam(e.target.value)}
                                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="BACKEND">BACKEND</option>
                                <option value="FRONTEND">FRONTEND</option>
                            </select>
                        </div>
                    </div>
                    <div className="mb-4 md:mb-0">
                        <label className="block text-gray-700 mb-2 pt-2">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                        <DateTimeInput
                            label="start date"
                            name="startDate"
                            value={formData.startDate}
                            onChange={handleChange}
                        />
                        <DateTimeInput
                            label="end date"
                            name="endDate"
                            value={formData.endDate}
                            onChange={handleChange}
                            disabled={!formData.startDate}
                            min={formData.startDate}
                        />
                    </div>
                    <div className="flex justify-end mt-6 space-x-4">
                        <button type="button"
                                onClick={openModal}
                                className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600">save
                        </button>
                        <Link href={'/tasks'}>
                            <button type="button"
                                    className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 disabled:bg-gray-300">back
                            </button>
                        </Link>
                    </div>
                </form>
            </div>
            <ConfirmModal
                message={'Save Changes'}
                isOpen={isModalOpen}
                onClose={closeModal}
                onConfirm={handleSubmit}
            />
        </div>
    );
}
