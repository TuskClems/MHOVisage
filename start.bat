@echo off
echo ========================================================
echo   Monster Hunter Outlanders - Visage Codex & Builder
echo ========================================================
echo.
echo Opening browser at http://localhost:5173/ ...
start http://localhost:5173/
echo Starting Vite server...
call npm.cmd run dev
pause

