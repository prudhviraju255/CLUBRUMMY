import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://15.207.181.158:3000";

function Socket() {
    const [response, setResponse] = useState("");

    useEffect(() => {
        const socket = socketIOClient(ENDPOINT);
        socket.on("FromAPI", data => {
            setResponse(data);
        });
    }, []);

    return (
        <p>
            <span>socket info</span>
            <span>{response} </span>
        </p>
    );
}

export default Socket;