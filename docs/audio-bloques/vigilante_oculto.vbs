' Lanza vigilar_cuota.sh sin ventana (tarea programada "AXIOM-Vigilante-Audio"). Ver regla 16-bis de libro-audio-tts.
Set sh = CreateObject("WScript.Shell")
base = "C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\docs\audio-bloques\"
sh.CurrentDirectory = base
sh.Run """C:\Program Files\Git\bin\bash.exe"" """ & base & "vigilar_cuota.sh""", 0, False
