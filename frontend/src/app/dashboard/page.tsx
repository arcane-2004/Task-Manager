"use client"
import CreateTaskForm from '@/componenets/CreateTaskForm'
import TaskCard from '@/componenets/TaskCard';
import { getTasks, getUsers, syncUser } from '@/lib/api';
import { supabase } from '@/lib/supabase';
import { Task } from '@/types/task';
import { User } from '@/types/user';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

const DashboardPage = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        const loadUser = async () => {

            // getting current user
            const {
                data: { user },
            } = await supabase.auth.getUser();

            console.log("user", user);

            if (!user) return;

            const dbUser = await syncUser(
                user.user_metadata.full_name,
                user.email ?? "",
            );

            setCurrentUser(dbUser);

            // getting all users
            try {
                const data = await getUsers();
                setUsers(data);
            } catch (error) {
                console.error(error);
            }

            // getting all task
            try {
                const taskData = await getTasks();

                setTasks(taskData);
            } catch (error) {
                console.error(error);
            }

        };

        loadUser();
    }, []);

    // calculate stats
    const createdTasks =
        tasks.filter(
            (task) =>
                task.created_by === currentUser?.id
        );

    const assignedTasks =
        tasks.filter(
            (task) =>
                task.assigned_to === currentUser?.id
        );

    const completedTasks = tasks.filter(
        (task) => task.status === "completed"
    );

    const pendingTasks = tasks.filter(
        (task) => task.status === "pending"
    );

    const stats = [
        {
            title: "Total Tasks",
            value: tasks.length,
        },
        {
            title: "Assigned To Me",
            value: assignedTasks.length,
        },
        {
            title: "Created By Me",
            value: createdTasks.length,
        },
        {
            title: "Completed",
            value: completedTasks.length,
        },
        { title: "Pending", value: pendingTasks.length }
    ];

    // const handleCompleteTask = async (
    //     taskId: string
    // ) => {
    //     const res = await completeTask(taskId);
    //     if (res.status === "ok") {
    //         toast.success(res.message)
    //     }

    //     const updatedTasks = await getTasks();

    //     setTasks(updatedTasks);
    // };

    return (
        <main className="min-h-screen bg-slate-50">
            <div className="mx-auto max-w-7xl px-6 py-8">

                {/* Hero Section */}
                <section className="mb-8">
                    <h1 className="text-3xl font-bold text-slate-900">
                        Welcome back, {currentUser?.name} 👋
                    </h1>

                    <p className="mt-2 text-slate-600">
                        Manage and assign tasks efficiently.
                    </p>
                </section>

                {/* Stats Section */}
                <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5 mb-6">

                    {stats.map((stat) => (
                        <div
                            key={stat.title}
                            className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
                        >
                            <p className="text-sm text-gray-500">
                                {stat.title}
                            </p>

                            <h2 className="mt-2 text-3xl font-bold text-purple-700">
                                {stat.value}
                            </h2>
                        </div>
                    ))}

                </section>

                {/* Create Task Section */}
                <section className='mb-6'>

                    <CreateTaskForm
                        users={users}
                        currentUser={currentUser}
                        setTasks={setTasks}
                    />

                </section>

                {/* Assigned Tasks Section */}
                <div className='grid grid-cols-2 gap-3'>
                    <section className="rounded-lg border border-slate-200 bg-white p-6">
                        <h2 className="mb-4 text-xl font-semibold">
                            Assigned To Me
                        </h2>

                        <div className="h-[60vh] overflow-y-auto rounded-xl bg-white p-2">
                            {assignedTasks.length === 0 ? (
                                <p className="text-sm text-gray-500">No tasks assigned</p>
                            ) : (
                                <div className="space-y-3">
                                    {tasks.map((task) => {
                                        const assignedUser = users.find(
                                            (user) => user.id === task.assigned_to
                                        );

                                        return (
                                            <TaskCard
                                                key={task.id}
                                                task={task}
                                                setTasks={setTasks}
                                                currentUser={currentUser}
                                                assignedToName={assignedUser?.name || "Unassigned"}
                                            />
                                        );
                                    })}
                                    {/* {assignedTasks.map((task) => (
                                        <TaskCard
                                            key={task.id}
                                            task={task}
                                            setTasks={setTasks}
                                            currentUser={currentUser}
                                        />
                                    ))} */}
                                </div>
                            )}
                        </div>

                    </section>

                    {/* Created Tasks Section */}
                    <section className='rounded-lg border border-slate-200 bg-white p-6'>
                        <h2 className="mb-4 text-xl font-semibold">
                            Created By Me
                        </h2>

                        <div className="h-[60vh] overflow-y-auto rounded-xl  bg-white p-2">
                            {createdTasks.length === 0 ? (
                                <p className="text-sm text-gray-500">No tasks created</p>
                            ) : (
                                <div className="space-y-3">
                                    {createdTasks.map((task) => (
                                        <TaskCard
                                            key={task.id}
                                            task={task}
                                            setTasks={setTasks}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    </section>
                </div>
            </div>
        </main>
    )
}

export default DashboardPage
