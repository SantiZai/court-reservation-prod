"use client";

import "./navigation.css";
import { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { ArrowBack, Menu } from "@mui/icons-material";
import { User } from "@/utils/models";
import { userStore } from "@/utils/globalStates";
import { createUser } from "@/services/createEntries";
import { bringUserByEmail } from "@/services/bringData";

const DropdownMenu = ({ handler }: { handler: (isOpen: boolean) => void }) => {
    const [open, setOpen] = useState(false);

    const { data: session } = useSession();

    const userState = userStore((state: any) => state.user);
    const setUserState = userStore((state: any) => state.setUser);

    const toggleMenu = () => {
        setOpen(!open);
        handler(!open);
    };

    useEffect(() => {
        if (session?.user) {
            createUser({
                email: session.user.email,
                fullname: session.user.name,
                picture: session.user.image,
            } as User);
            bringUserByEmail(session.user.email as string).then((res) => {
                setUserState({
                    id: res.id,
                    email: res.email,
                    name: res.fullname,
                    photo: res.picture,
                    admin: res.admin,
                });
            });
        }
    }, [session]);

    return (
        <div>
            <div className="toggle p-4">
                <div onClick={toggleMenu}>
                    <Menu />
                </div>
            </div>
            <div className={`menu ${open && "opened"} w-full h-full p-6`}>
                <ul className="w-full h-full flex flex-col gap-2">
                    <div className="w-full flex justify-end">
                        <ArrowBack
                            onClick={toggleMenu}
                            className="text-gray-100"
                        />
                    </div>
                    <div className="h-full w-2/3 flex flex-col justify-between">
                        <div className="flex flex-col gap-1">
                            <li>
                                <Link
                                    href="/"
                                    onClick={toggleMenu}
                                >
                                    Inicio
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/contact"
                                    onClick={toggleMenu}
                                >
                                    Contactanos
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/pricing"
                                    onClick={toggleMenu}
                                >
                                    Servicios y precios
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/demo"
                                    onClick={toggleMenu}
                                >
                                    Quiero una demo
                                </Link>
                            </li>
                            <li className="mb-2">
                                {session?.user ? (
                                    <>
                                        <div>
                                            <Link
                                                href="my-reservations"
                                                onClick={toggleMenu}
                                            >
                                                Mis reservas
                                            </Link>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div>
                                                <Image
                                                    src={
                                                        session.user
                                                            .image as string
                                                    }
                                                    alt="Profile image"
                                                    width="40"
                                                    height="40"
                                                    className="rounded-full"
                                                />
                                            </div>
                                            <div className="flex flex-col">
                                                <span>{session.user.name}</span>
                                                <span
                                                    onClick={async () =>
                                                        signOut()
                                                    }
                                                    className="text-sm text-indigo-600 font-semibold"
                                                >
                                                    cerrar sesión
                                                </span>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <button
                                        onClick={async () =>
                                            await signIn("google")
                                        }
                                    >
                                        Login with google
                                    </button>
                                )}
                            </li>
                            {userState.admin && (
                                <li>
                                    <Link
                                        href="/club"
                                        onClick={toggleMenu}
                                    >
                                        Club
                                    </Link>
                                </li>
                            )}
                            <div className="separator w-3/4"></div>
                            <li className="w-3/4 mt-4 text-sm text-center">
                                <Link href="/privacy-policy">
                                    Términos y condiciones
                                </Link>
                            </li>
                        </div>
                        <div>Logo</div>
                    </div>
                </ul>
            </div>
        </div>
    );
};

export default DropdownMenu;
