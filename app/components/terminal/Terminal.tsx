'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Terminal as XTerminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import 'xterm/css/xterm.css';
import { useAppStore } from '../../store';
import {
  skillsContent,
  resumeContent,
  projectsContent,
  helpContent,
  whoamiContent,
  experienceLsContent,
  skitAiContent,
} from './commands';

interface CommandHandler {
  (args: string[]): Promise<string | void> | string | void;
}

const Terminal: React.FC = () => {
  const terminalRef = useRef<HTMLDivElement>(null);
  const xtermRef = useRef<XTerminal | null>(null);
  const fitAddonRef = useRef<FitAddon | null>(null);
  const inputBuffer = useRef<string>('');
  const history = useRef<string[]>([]);
  const historyIndex = useRef<number>(-1);
  const { setMode, selectedNode, setSelectedNode } = useAppStore();

  const PROMPT = 'user@portfolio:~ $ ';

  const writeLine = useCallback((line: string) => {
    xtermRef.current?.writeln(line);
  }, []);

  const clearInput = useCallback(() => {
    xtermRef.current?.write('\x1b[2K\r'); // Clear current line
    xtermRef.current?.write(PROMPT);
    inputBuffer.current = '';
  }, [PROMPT]);

  const commandHandlers: { [key: string]: CommandHandler } = {
    help: () => helpContent,
    whoami: () => whoamiContent,
    ls: (args: string[]) => {
      if (args[0] === '/experience') {
        return experienceLsContent;
      }
      return 'ls: cannot access \'' + args[0] + '\': No such file or directory';
    },
    cat: (args: string[]) => {
      if (args[0] === '/experience/skit.ai') {
        return skitAiContent;
      }
      return 'cat: cannot access \'' + args[0] + '\': No such file or directory';
    },
    projects: () => projectsContent,
    skills: () => skillsContent,
    resume: () => resumeContent,
    contact: () => contactContent(),
    dashboard: () => {
      setMode('dashboard');
      return 'Switching to dashboard...';
    },
    exit: () => {
      setSelectedNode(null); // Clear selected node if any
      setMode('scene');
      return 'Exiting terminal, returning to scene...';
    },
    clear: () => {
      xtermRef.current?.clear();
    }
  };

  const contactContent = () => {
    // Dynamically insert selectedNode if available, otherwise general contact
    if (selectedNode) {
      return `Contact related to ${selectedNode}:\nEmail: abhijeetmohanan@gmail.com\nLinkedIn: [Your LinkedIn Profile URL]\nGitHub: [Your GitHub Profile URL]`;
    }
    return `Email: abhijeetmohanan@gmail.com\nLinkedIn: [Your LinkedIn Profile URL]\nGitHub: [Your GitHub Profile URL]\nPhone: +919405234118`;
  };

  const executeCommand = useCallback(async (command: string) => {
    if (!command.trim()) {
      return;
    }

    history.current.push(command);
    historyIndex.current = history.current.length;

    const [cmd, ...args] = command.split(' ');
    const handler = commandHandlers[cmd.toLowerCase()];

    if (handler) {
      const output = await handler(args);
      if (output) {
        writeLine(output);
      }
    } else {
      writeLine(`Command not found: ${cmd}. Type 'help' for available commands.`);
    }
  }, [commandHandlers, writeLine]);

  useEffect(() => {
    if (terminalRef.current && !xtermRef.current) {
      const term = new XTerminal({
        fontFamily: 'JetBrains Mono, monospace',
        fontSize: 14,
        theme: {
          background: '#0b0f17',
          foreground: '#00f0ff',
          cursor: '#00f0ff',
          selectionBackground: '#00f0ff50',
          black: '#000000',
          red: '#ff0000',
          green: '#00ff00',
          yellow: '#ffff00',
          blue: '#0000ff',
          magenta: '#ff00ff',
          cyan: '#00ffff',
          white: '#ffffff',
          brightBlack: '#808080',
          brightRed: '#ff0000',
          brightGreen: '#00ff00',
          brightYellow: '#ffff00',
          brightBlue: '#0000ff',
          brightMagenta: '#ff00ff',
          brightCyan: '#00ffff',
          brightWhite: '#ffffff',
        },
      });

      const fitAddon = new FitAddon();
      term.loadAddon(fitAddon);

      term.open(terminalRef.current);
      fitAddon.fit();

      xtermRef.current = term;
      fitAddonRef.current = fitAddon;

      writeLine('Welcome to Abhijeet Mohanan\'s Interactive Portfolio Terminal.');
      writeLine('Type \'help\' to see available commands.');
      term.write(PROMPT);

      term.onData((data) => {
        const char = data.charCodeAt(0);
        if (char === 13) { // Enter key
          writeLine(''); // New line after command
          executeCommand(inputBuffer.current.trim()).then(() => {
            term.write(PROMPT);
            inputBuffer.current = '';
          });
        } else if (char === 127) { // Backspace
          if (inputBuffer.current.length > 0) {
            inputBuffer.current = inputBuffer.current.slice(0, -1);
            term.write('\b \b'); // Erase character
          }
        } else if (char === 27) { // Arrow keys (and other control sequences)
          // Handle arrow keys for history
          if (data === '\x1b[A') { // Up arrow
            if (history.current.length > 0 && historyIndex.current > 0) {
              historyIndex.current--;
              clearInput();
              inputBuffer.current = history.current[historyIndex.current];
              term.write(inputBuffer.current);
            }
          } else if (data === '\x1b[B') { // Down arrow
            if (historyIndex.current < history.current.length - 1) {
              historyIndex.current++;
              clearInput();
              inputBuffer.current = history.current[historyIndex.current];
              term.write(inputBuffer.current);
            } else if (historyIndex.current === history.current.length - 1) {
              // Went past last command, clear input
              historyIndex.current++;
              clearInput();
            }
          }
        }
        else {
          inputBuffer.current += data;
          term.write(data);
        }
      });

      const resizeObserver = new ResizeObserver(() => {
        fitAddon.fit();
      });
      resizeObserver.observe(terminalRef.current);

      return () => {
        term.dispose();
        resizeObserver.disconnect();
        xtermRef.current = null;
        fitAddonRef.current = null;
      };
    }
  }, [executeCommand, writeLine, PROMPT, clearInput]);

  useEffect(() => {
    if (selectedNode) {
      writeLine(`\nSelected infrastructure node: ${selectedNode}`);
      writeLine('Type \'contact\' for details or \'exit\' to return to scene.');
      xtermRef.current?.write(PROMPT);
    }
  }, [selectedNode, writeLine, PROMPT]);


  return (
    <div className="flex flex-col items-center justify-center h-screen w-full bg-background p-4">
      <div
        ref={terminalRef}
        className="w-full h-full max-w-5xl rounded-lg border-2 border-accent shadow-lg"
      >
      </div>
    </div>
  );
};

export default Terminal;
