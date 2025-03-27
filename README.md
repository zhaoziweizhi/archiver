# @zhzwz/archiver

一个简单的压缩工具，可以通过命令行直接使用。

## 直接使用

```sh
# [npm]
npx @zhzwz/archiver dist

# [pnpm]
# dist => dist.zip
pnpm dlx @zhzwz/archiver dist

# dist => FileName.zip
pnpm dlx @zhzwz/archiver dist FileName

# dist => FileName-yyyy-MM-dd-HHmmss.zip
pnpm dlx @zhzwz/archiver dist FileName --time-suffix
```

## 安装使用

```sh
# 安装
pnpm add -D @zhzwz/archiver

# 直接使用 archiver 命令即可
pnpm archiver dist FileName --time-suffix
```

## Q&A

### Error: `import: command not found`

使用 node 命令调用指定的 cli 文件

```sh
# install
npm install -D @zhzwz/archiver
# use cli.mjs
node node_modules/@zhzwz/archiver/dist/cli.mjs dist FileName --time-suffix
# or use cli.cjs
node node_modules/@zhzwz/archiver/dist/cli.cjs dist FileName --time-suffix
```
