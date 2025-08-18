import React, { createContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

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
    const [socket, setSocket] = useState<Socket | null>(null);
    const [isConnected, setIsConnected] = useState<boolean>(false);

    useEffect(() => {
        const socketInstance = io('http://localhost:3000', {
            withCredentials: true
        });

        socketInstance.on("connect", () => {
            setIsConnected(socket?.connected ?? false)
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

        socketInstance.on("connect_error", (error) => {
            console.log('Socket Error:', error?.message)
        });

        // this event is triggered when server is shut down or server restarts or user internet drops
        socketInstance.on("disconnect", (reason) => {
            setIsConnected(false);
            console.log("Socket Disconnected:", reason);
        });

        setSocket(socketInstance);

        return () => {
            socketInstance.off("connect");
            socketInstance.off("disconnect");
            socketInstance.off("connect_error");
            socketInstance.disconnect();
        }

    }, [])

    return (
        <SocketContext value={{
            socket,
            isConnected
        }}>
            {children}
        </SocketContext>
    )
}

export default SocketProvider
