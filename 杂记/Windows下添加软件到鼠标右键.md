# Windows 添加软件到鼠标右键启动

以下以 vscode 为例
新建一个注册表文件 `vs.reg` 保存到桌面

```bash
Windows Registry Editor Version 5.00
[HKEY_CLASSES_ROOT\*\shell\VSCode]
@="Open in VSCode"
"Icon"="C:\\Users\\huihu\\AppData\\Local\\Programs\\Microsoft VS Code\\Code.exe,0"
[HKEY_CLASSES_ROOT\*\shell\VSCode\command]
@="C:\\Users\\huihu\\AppData\\Local\\Programs\\Microsoft VS Code\\Code.exe %1"
[HKEY_CLASSES_ROOT\Directory\shell\VSCode]
@="Open in VSCode"
"Icon"="C:\\Users\\huihu\\AppData\\Local\\Programs\\Microsoft VS Code\\Code.exe,0"
[HKEY_CLASSES_ROOT\Directory\shell\VSCode\command]
@="C:\\Users\\huihu\\AppData\\Local\\Programs\\Microsoft VS Code\\Code.exe %1"
```
