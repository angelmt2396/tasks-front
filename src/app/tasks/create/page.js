'use client';
import Link from "next/link";
import { useEffect, useState } from 'react';
import ConfirmModal from '@/components/confirm-modal';
import { createTask } from "@/services/tasks";
import DateTimeInput from "@/components/datetime-input";
import { findAllEmail } from "@/services/teams";
import AlertMessage from "@/components/alert";
import {ErrorModal} from "@/components/error-modal";

export default function TaskCreate() {
    const [task, setTask] = useState({
        name: '',
        description: '',
        assignedPersonEmail: '',
        startDate: '',
        endDate: '',
        teamName: '',
    });
    const [team, setTeam] = useState('');
    const [emails, setEmails] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [error, setError] = useState(null);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setTask((prevTask) => ({
            ...prevTask,
            [name]: value
        }));
    };

    useEffect(() => {
        const fetchEmails = async () => {
            try {
                if (team) {
                    const teamEmails = await findAllEmail(team);
                    setEmails(teamEmails);
                }
            } catch (e) {
                setError('Something went wrong')
            }
        };

        fetchEmails();
    }, [team]);

    const openModal = () => {
        if(!task.name) {
            setAlertMessage('Name is required.');
            setTimeout(() => {
                setAlertMessage('');
            }, 2000);
            return;
        }
        if (!task.teamName) {
            setAlertMessage('Please select a team.');
            setTimeout(() => {
                setAlertMessage('');
            }, 2000);
            return;
        }
        setIsModalOpen(true);
    }
    const closeModal = () => setIsModalOpen(false);

    const handleCreate = async () => {
        try {
            await createTask(task);
            closeModal();
            window.location.href = '/tasks';
        } catch (e) {
            closeModal()
            setError('Something went wrong')
        }
    };

    const closeErrorModal = () => setError(null);

    return (
        <div className="w-full max-w-7xl bg-white p-4 md:p-6 rounded-lg shadow-md mx-auto my-4 md:my-8">
            {error && <ErrorModal error={error} onClose={closeErrorModal} />}
            {alertMessage && <AlertMessage message={alertMessage}/>} {}
            <h1 className="text-2xl font-bold mb-6">Create a task</h1>
            <form>
                <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
                    <div className="mb-4 md:mb-0">
                        <label className="block text-gray-700 mb-2">Task name</label>
                        <input
                            type="text"
                            name="name"
                            value={task.name}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div className="mb-4 md:mb-0">
                        <label className="block text-gray-700 mb-2">Assigned to</label>
                        <select
                            name="assignedPersonEmail"
                            value={task.assignedPersonEmail}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select an email...</option>
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
                            name="teamName"
                            value={team}
                            onChange={(e) => {
                                setTeam(e.target.value);
                                handleChange(e);
                            }}
                            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        >
                            <option value="">Select a team...</option>
                            <option value="BACKEND">BACKEND</option>
                            <option value="FRONTEND">FRONTEND</option>
                        </select>
                    </div>
                </div>
                <div className="mb-4 md:mb-0">
                    <label className="block text-gray-700 mb-2 pt-2">Description</label>
                    <textarea
                        name="description"
                        value={task.description}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                    <DateTimeInput
                        label="Start date"
                        name="startDate"
                        value={task.startDate}
                        onChange={handleChange}
                    />
                    <DateTimeInput
                        label="End date"
                        name="endDate"
                        value={task.endDate}
                        onChange={handleChange}
                        disabled={!task.startDate}
                        min={task.startDate}
                    />
                </div>
                <div className="flex justify-end mt-6 space-x-4">
                    <button
                        type="button"
                        onClick={openModal}
                        className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
                    >
                        Create
                    </button>
                    <Link href={'/tasks'}>
                        <button
                            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 disabled:bg-gray-300">
                            Back
                        </button>
                    </Link>
                </div>
            </form>
            <ConfirmModal
                message={'Are you sure you want to create a task?'}
                isOpen={isModalOpen}
                onClose={closeModal}
                onConfirm={handleCreate}
                confirmText={'Confirm'}
            />
        </div>
    );
}
