@echo off
pause
for %%i in (*.png) do (
ffmpeg -i %%i -quality 90 %%i.webp
)

pause