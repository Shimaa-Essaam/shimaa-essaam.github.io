@echo off
cd /d "%~dp0"
echo Shimaa Essam Portfolio
echo Open http://127.0.0.1:3010 in your browser.
echo If the preview is already running, use the link above.
call npm.cmd run dev -- --hostname 127.0.0.1 --port 3010
pause
