'use client';
import { useState } from "react";
import { createUser } from "@/services/users";
import { registerEmail } from "@/services/teams";
import ConfirmModal from "@/components/confirm-modal";
import {ErrorModal} from "@/components/error-modal";

export default function CreateUser() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [team, setTeam] = useState('BACKEND');
    const [message, setMessage] = useState('');

    const [error, setError] = useState(null);
    const handler = async (e) => {
        e.preventDefault();
        try {
            await createUser({email: email, password: password});
            await registerEmail({ teamName: team, email: email });
            setMessage('Created successfully.');
            closeModal();
            window.location.href = '/';
        } catch (error) {
            closeModal();
            setError('Something went wrong')
        }
    };

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    const closeErrorModal = () => setError(null);
    return (
        <div className="w-full max-w-xl mx-auto bg-white p-12 rounded-lg shadow-md">
            {error && <ErrorModal error={error} onClose={closeErrorModal} />}
            <h1 className="text-3xl font-bold mb-8 text-center">Add user</h1>
            <form onSubmit={(e) => { e.preventDefault(); openModal(); }}>
                <div className="mb-6">
                    <label className="block text-gray-700 mb-2 text-lg">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 mb-2 text-lg">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 mb-2 text-lg">Team</label>
                    <select
                        value={team}
                        onChange={(e) => setTeam(e.target.value)}
                        className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="BACKEND">BACKEND</option>
                        <option value="FRONTEND">FRONTEND</option>
                    </select>
                </div>
                <button
                    type="submit"
                    className="w-full py-2 text-white bg-green-500 rounded hover:bg-green-600"
                >
                    Save
                </button>
            </form>
            {message && <p className="mt-4 text-center text-green-500">{message}</p>}
            <ConfirmModal
                message={'Are you sure you want to save the user?'}
                isOpen={isModalOpen}
                onClose={closeModal}
                onConfirm={handler}
                confirmText={'Confirm'}
            />
        </div>
    );
}
