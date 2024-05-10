#!/usr/bin/env node
import inquirer from "inquirer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import util from "util";

const copyFilePromise = util.promisify(fs.copyFile);
const readdirPromise = util.promisify(fs.readdir);
const mkdirPromise = util.promisify(fs.mkdir);
async function copyDir(src, dest) {
  const entries = await readdirPromise(src, { withFileTypes: true });
  // 确保目标目录存在
  await mkdirPromise(dest, { recursive: true });
  for (let entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      // 递归调用以处理子目录
      await copyDir(srcPath, destPath);
    } else {
      // 复制文件
      await copyFilePromise(srcPath, destPath);
    }
  }
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

inquirer
  .prompt([
    {
      type: "input",
      name: "project-name",
      message: "create-project-name",
      default: "dev-template",
    },
  ])
  .then(answers => {
    let dirName = answers["project-name"];
    let dirPath = path.join(dirName);
    let templatePath = path.join(__dirname, "../template");
    try {
      if (!fs.existsSync(dirPath)) {
        fs.mkdir(dirPath, async () => {
          await copyDir(templatePath, dirPath)
            .then(() => {
              console.log(`cd ${dirName}`);
              console.log(`npm i`);
              console.log(`npm run dev`);
            })
            .catch(() => {
              console.log("-----copy dir error-----");
            });
        });
      } else {
        console.log(`${dirName} is exist`);
      }
    } catch (err) {
      console.error(`create ${dirName} error: ${err}`);
    }
  });
