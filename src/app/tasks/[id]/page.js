'use client';
import Link from "next/link";
import { findByUUID } from "@/services/tasks";
import { formatDateToInput } from '@/utils/date';
import { useEffect, useState } from "react";
import { updateTask } from "@/services/tasks";
import ConfirmModal from "@/components/confirm-modal";
import DateTimeInput from "@/components/datetime-input";
import { findAllEmail } from "@/services/teams";
import AlertMessage from '@/components/alert';
import {ErrorModal} from "@/components/error-modal";

export default function TaskUpdate({ params }) {
    const { id } = params;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [team, setTeam] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        assignedPersonEmail: '',
        startDate: '',
        endDate: '',
        teamName: '',
        isCompleted: false
    });
    const [emails, setEmails] = useState([]);
    const [alertMessage, setAlertMessage] = useState('');
    const [teamChanged, setTeamChanged] = useState(false);
    const [hasAssignedPersonEmail, setHasAssignedPersonEmail] = useState(false);
    const [initialEmail, setInitialEmail] = useState('');
    const [initialTeam, setInitialTeam] = useState('');
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchTask = async () => {
            try{
                const taskData = await findByUUID(id);
                setFormData({
                    name: taskData.name || '',
                    description: taskData.description || '',
                    assignedPersonEmail: taskData.assignedPersonEmail || '',
                    startDate: formatDateToInput(taskData.startDate) || '',
                    endDate: formatDateToInput(taskData.endDate) || '',
                    teamName: taskData.team?.name || '',
                });
                setInitialTeam(taskData.team?.name);
                setTeam(taskData.team?.name || '');
                setHasAssignedPersonEmail(taskData.assignedPersonEmail);
                setInitialEmail(taskData.assignedPersonEmail);
                setEmails([taskData.assignedPersonEmail]);
            } catch (e) {
                setError('Something went wrong')
            }

        };
        fetchTask();
    }, [id]);

    useEffect(() => {
        const fetchEmails = async () => {
            if (team) {
                const teamEmails = await findAllEmail(team);
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
        try {
        if (formData.startDate === formData.endDate) {
            closeModal();
            setError('End date must be greater than start date.')
            return;
        }
        await updateTask(id, formData);
        closeModal();
        window.location.href = '/tasks';
        } catch (e) {
            setError('Something went wrong')
        }
    };

    const openModal = () => {
        if (teamChanged && initialTeam !== team
            && initialEmail === formData.assignedPersonEmail) {
            setAlertMessage('Please assign a new value for Assigned to.');
            setTimeout(() => {
                setAlertMessage('');
            }, 2000);
            return;
        }
        setIsModalOpen(true);
    }
    const closeModal = () => setIsModalOpen(false);

    const handleTeamChange = (e) => {
        const newTeam = e.target.value;
        setTeam(newTeam);
        setTeamChanged(true);
        if(!hasAssignedPersonEmail) {
            setFormData((prevFormData) => ({
                ...prevFormData,
                teamName: newTeam,
                assignedPersonEmail: ''
            }));
        } else{
            setFormData((prevFormData) => ({
                ...prevFormData,
                teamName: newTeam,
            }));
        }
    };

    const handleSelectEmail = (e) => {
        const newEmail = e.target.value;
        setTeamChanged(false);
        setInitialTeam(team)
        setInitialEmail(newEmail);
        setFormData((prevFormData) => ({
            ...prevFormData,
            assignedPersonEmail: newEmail
        }));
    }

    const closeErrorModal = () => setError(null);

    return (
        <div className="w-full max-w-7xl bg-white p-4 md:p-6 rounded-lg shadow-md mx-auto my-4 md:my-8">
            {error && <ErrorModal error={error} onClose={closeErrorModal} />}
            {alertMessage && <AlertMessage message={alertMessage}/>}
            <h1 className="text-2xl font-bold mb-6">Task details</h1>
            <form>
                <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
                    <div className="mb-4 md:mb-0">
                        <label className="block text-gray-700 mb-2">Task name</label>
                        <input
                            type="text"
                            name="name"
                            maxLength="50"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div className="mb-4 md:mb-0">
                        <label className="block text-gray-700 mb-2">Assigned to</label>
                        <select
                            name="assignedPersonEmail"
                            value={formData.assignedPersonEmail}
                            onChange={handleSelectEmail}
                            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option
                                value="">{(!teamChanged && initialEmail) ? initialEmail : 'Select an email...'}</option>

                            {emails.map((email, index) => (
                                <option key={index} value={email}>
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
                            onChange={handleTeamChange}
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
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                    <DateTimeInput
                        label="Start date"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleChange}
                    />
                    <DateTimeInput
                        label="End date"
                        name="endDate"
                        value={formData.endDate}
                        onChange={handleChange}
                        disabled={!formData.startDate}
                        min={formData.startDate}
                    />
                </div>
                <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                    <div className="flex space-x-6 mt-6 pt-2 pl-2">
                        <input
                            type="checkbox"
                            name="isCompleted"
                            checked={formData.isCompleted}
                            onChange={handleChange}
                            className="form-checkbox h-5 w-5 text-blue-600"
                        />
                        <label className="text-gray-700">Mark as completed</label>
                    </div>
                    <div className="flex justify-end mt-6 space-x-4">
                        <button type="button"
                                onClick={openModal}
                                className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600">Save
                        </button>
                        <Link href={'/tasks'}>
                            <button type="button"
                                    className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 disabled:bg-gray-300">Back
                            </button>
                        </Link>
                    </div>
                </div>
            </form>
            <ConfirmModal
                message={'Are you sure you want to apply this changes?'}
                isOpen={isModalOpen}
                onClose={closeModal}
                onConfirm={handleSubmit}
                confirmText={'Confirm'}
            />
        </div>
    );
}
