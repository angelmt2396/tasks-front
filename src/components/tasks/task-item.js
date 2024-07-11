'use client';
import Link from 'next/link';
import {deleteTask} from "@/services/tasks";
import {useState} from "react";
import ConfirmModal from "@/components/confirm-modal";
import Image from 'next/image';
import { formatLongString } from '@/utils/strings';
import { formatDateToView } from "@/utils/date";

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
        <tr className="bg-white border-b flex flex-col md:table-row">
            <td className="px-4 py-2 md:px-6 md:py-4 font-medium text-gray-900 whitespace-nowrap">
                {formatLongString(task.name, 15)}
            </td>
            <td className="px-4 py-2 md:px-6 md:py-4">{formatLongString(task.assignedPersonEmail)}</td>
            <td className="px-4 py-2 md:px-6 md:py-4">
                {
                    task.isCompleted ?
                        <>
                            <div className="text-albo font-bold text-pretty">Closed
                            </div>
                        </>
                        :
                        ''
                }
            </td>
            <td className="px-4 py-2 md:px-6 md:py-4">{formatDateToView(task.startDate)}</td>
            <td className="px-4 py-2 md:px-6 md:py-4">{formatDateToView(task.endDate)}</td>
            <td className="px-4 py-2 md:px-6 md:py-4 flex justify-between items-center md:justify-start md:space-x-2">
                <Link href={`/tasks/${task.uuid}`}>
                <Image
                        src="/images/edit.png"
                        alt="see more"
                        width={24}
                        height={24}
                        className="cursor-pointer"
                    />
                </Link>
                <button onClick={openModal}>
                    <Image
                        src="/images/delete.png"
                        alt="delete"
                        width={24}
                        height={24}
                        className="cursor-pointer"
                    />
                </button>
                <ConfirmModal
                    message={'Are you sure you want to delete the task?'}
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    onConfirm={handlerDelete}
                    confirmText={'Confirm'}
                />
            </td>
        </tr>
    );
};