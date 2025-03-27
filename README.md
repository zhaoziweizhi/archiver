# @zhzwz/archiver

一个简单的压缩工具，可以通过命令行直接使用。

```sh
# 安装
pnpm add -D @zhzwz/archiver

# 使用
# dist => dist.zip
pnpm archiver dist

# dist => FileName.zip
pnpm archiver dist FileName

# dist => FileName-yyyy-MM-dd-HHmmss.zip
pnpm archiver dist FileName --time-suffix
```
