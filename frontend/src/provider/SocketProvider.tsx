import React, { createContext, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAuth } from './AuthProvider';

interface ISocket {
    socket: Socket | null;
    isConnected: boolean
}

const SocketContext = createContext<ISocket>({
    socket: null,
    isConnected: false
});

const SocketProvider = ({
    children
}: {
    children: React.ReactNode
}) => {
    const { user } = useAuth();
    const [socket, setSocket] = useState<Socket | null>(null);
    const [isConnected, setIsConnected] = useState<boolean>(false);

    useEffect(() => {
        if (!user) return;
        const socketInstance = io('http://localhost:3000', {
            withCredentials: true
        });

        socketInstance.on("connect", () => {
            setIsConnected(true)
            console.log('Socket Connected')
        });

        // socketInstance.io.on("reconnect_attempt", (attempt) => {
        //     setConnectionStatus("reconnecting");
        //     console.log("🔄 Reconnect attempt:", attempt);
        // });

        // // ⚠️ Reconnect failed
        // socketInstance.io.on("reconnect_failed", () => {
        //     setConnectionStatus("failed");
        //     console.log("⚠️ Reconnect failed");
        // });

        // this event is triggered when server is shut down or server restarts or user internet drops
        socketInstance.on("disconnect", (reason) => {
            setIsConnected(false);
            console.log("Socket Disconnected:", reason);
        });

        socketInstance.on("connect_error", (error) => {
            console.log('Socket Error:', error?.message)
        });

        setSocket(socketInstance);

        return () => {
            socketInstance.off("connect");
            socketInstance.off("disconnect");
            socketInstance.off("connect_error");
            socketInstance.disconnect();
        }

    }, [user])

    return (
        <SocketContext value={{
            socket,
            isConnected
        }}>
            {children}
        </SocketContext>
    )
}

const useSocket = () => useContext(SocketContext);

export { useSocket, SocketProvider }

