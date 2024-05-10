# 如何创建一个 npm create 模版命令

npm create 命令通常用于通过模板快速生成新的项目结构，这些模板通常包含一些初始的代码、配置文件、依赖项等。

## 原理：npm create 命令和 npm install 的区别

1. npm create

- npm create 是一个用于通过模板快速创建新项目的命令。
- 它通常与一些特定的 npm 包（如 create-react-app、create-vue 等）一起使用，这些包提供了预定义的模板和初始化脚本，以简化项目的设置和初始化过程。
- 使用 npm create 命令时，你需要指定一个模板名称（通常是 npm 包的名称，但不包括 create- 前缀），以及你想要创建的新项目的名称。
- 该命令会下载模板代码，并根据需要执行一些初始化任务（如安装依赖项、设置配置文件等）。

2. npm install

- npm install 是一个用于安装 Node.js 项目的依赖项的命令。
- 当你运行 npm install 命令时，npm 会查看当前项目目录中的 package.json 文件，并安装其中列出的所有依赖项。
- npm install 还会将已安装的依赖项及其版本信息保存在 package-lock.json 文件中，以确保其他人在克隆或获取你的项目时能够安装相同版本的依赖项。

npm create 命令实际是 npm install create-x@latest 的扩展，npm 包把以 create 开头的包 约定为创建模版，可拆开输入命令；

## 编写 package 包

1. 首先创建 package.json 文件

```json
{
  "name": "create-vite-dev", //包名
  "version": "1.0.12", //版本号
  "description": "create empty vite template vue3", //描述
  "main": "./bin/create.js", //入口文件
  "type": "module", //类型
  "bin": {
    //可执行文件，这个字段用于指定它们的路径
    "create-vite-dev": "./bin/create.js" //npm install -g 注册到全局的命令
  },
  "scripts": {
    //运行npm run 脚本命令
    "test": "create-vite-dev"
  },
  "keywords": ["create", "vite-dev"], //关键词 可被 npm search find 检索
  "author": "author", //作者
  "license": "MIT", //协议
  "dependencies": {
    //依赖 npm create 时会先下载依赖
    "inquirer": "^9.2.20"
  }
}
```

2. 编写具体的包文件

```js
//bin/create.js
#!/usr/bin/env node //重要  系统以node环境执行该文件

`...具体实现`
```

3. 登录|确认包名是否已存在|发布

   - npm login
   - npm find|search
   - npm publish
