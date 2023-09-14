@echo off
pause
for %%i in (*.png) do (
ffmpeg -i %%i -quality 75 webp/%%i.webp
)

pause