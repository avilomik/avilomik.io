import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BOOT_LOGS = [
    "[ OK ] INITIALIZING V-OS KERNEL 1.0.4...",
    "[ OK ] ESTABLISHING ENCRYPTED UPLINK...",
    "[ OK ] BYPASSING SECURITY NODES...",
    "[ OK ] AUTHENTICATING OPERATOR: AVILOMIK",
    "[ OK ] MOUNTING DIGITAL ARMORY...",
    "[ OK ] MISSION CONTROL READY."
];

export default function TerminalBoot() {
    const [logs, setLogs] = useState<string[]>([]);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (index < BOOT_LOGS.length) {
            const timer = setTimeout(() => {
                setLogs(prev => [...prev, BOOT_LOGS[index]]);
                setIndex(prev => prev + 1);
            }, Math.random() * 400 + 100);
            return () => clearTimeout(timer);
        } else {
            const timer = setTimeout(() => {
                window.dispatchEvent(new CustomEvent('boot-complete'));
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [index]);

    return (
        <div className="fixed inset-0 bg-void z-[100] flex flex-col items-center justify-center p-4 font-mono">
            <div className="w-full max-w-2xl border border-terminal-green/30 bg-black p-6 shadow-[0_0_20px_rgba(0,255,65,0.1)]">
                <div className="mb-4 flex items-center gap-2 border-b border-terminal-green/20 pb-2">
                    <div className="w-3 h-3 rounded-full bg-terminal-red"></div>
                    <div className="w-3 h-3 rounded-full bg-terminal-amber"></div>
                    <div className="w-3 h-3 rounded-full bg-terminal-green"></div>
                    <span className="ml-4 text-[10px] text-terminal-green/50">SYSTEM_BOOT.EXE</span>
                </div>

                <div className="space-y-1 h-32 overflow-hidden bg-black">
                    <AnimatePresence>
                        {logs.map((log, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="text-xs md:text-sm text-terminal-green"
                            >
                                {log}
                            </motion.div>
                        ))}
                    </AnimatePresence>
                    <motion.div
                        animate={{ opacity: [1, 0] }}
                        transition={{ duration: 0.5, repeat: Infinity }}
                        className="w-2 h-4 bg-terminal-green inline-block align-middle"
                    />
                </div>
            </div>
        </div>
    );
}
