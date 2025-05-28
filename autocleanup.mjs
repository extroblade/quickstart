/**
 * Автоматическая очистка временных блоков кода
 *
 * Скрипт проходит по файлам в папке `./src`, ищет метки `@autocleanup-start` и `@autocleanup-end`,
 * и удаляет блоки кода, срок действия которых истёк.
 * Также может обновлять метки с `UNSET` на текущую дату.
 *
 * @usage
 * node ./autocleanup.mjs [--set-date] [--update-repo] [--log-amount]
 *
 * @flags
 * @param {boolean} --set-date    Устанавливает текущую дату в `@autocleanup-start(UNSET, ...)`
 * @param {boolean} --update-repo  После изменений автоматически коммитит и пушит код в git
 * @param {boolean} --log-amount  Логирует количество удаленных и обновленных блоков
 *
 * @example
 * // Запустить скрипт с установкой даты и логированием количества изменений:
 * node ./autocleanup.mjs --set-date --log-amount
 *
 */

import { execSync } from "child_process";
import fs from "fs";
import path from "path";

const setDate = process.argv.includes("--set-date");
const updateRepo = process.argv.includes("--update-repo");
const logAmount = process.argv.includes("--log-amount");

const NAME = "autocleanup";
const START_TAG = `@${NAME}-start`;
const END_TAG = `@${NAME}-end`;
const UNSET_TAG = "UNSET";
const DATE_PATTERN = "\\d{4}-\\d{2}-\\d{2}";
const DATE_REGEX = new RegExp(
  `${START_TAG}\\((${DATE_PATTERN}|${UNSET_TAG}),\\s*(${DATE_PATTERN}|\\d+[dwmy])`,
);

const parseOrAddDate = (startDate, periodOrDate) => {
  if (periodOrDate.match(new RegExp(DATE_PATTERN)))
    return new Date(periodOrDate);

  const amount = parseInt(periodOrDate.slice(0, -1), 10);
  const unit = periodOrDate.slice(-1);

  switch (unit) {
    case "d":
      startDate.setDate(startDate.getDate() + amount);
      break;
    case "w":
      startDate.setDate(startDate.getDate() + amount * 7);
      break;
    case "m":
      startDate.setMonth(startDate.getMonth() + amount);
      break;
    case "y":
      startDate.setFullYear(startDate.getFullYear() + amount);
      break;
    default:
      break;
  }
  return startDate;
};

const shouldRemoveCode = (line) => {
  const match = line.match(DATE_REGEX);
  if (!match) return false;

  const expiryDate = parseOrAddDate(new Date(match[1]), match[2]);
  return new Date() >= expiryDate;
};

const setAutocleanupDate = (line) => {
  const today = new Date().toISOString().split("T")[0];
  return line.replace(UNSET_TAG, today);
};

const processFile = (filePath, setDate) => {
  const absPath = path.resolve(filePath);
  if (!fs.existsSync(absPath)) return { removed: 0, updated: 0 };

  let modified = false;
  const removalStack = [];
  let removedCount = 0,
    updatedCount = 0;

  let lines = fs
    .readFileSync(absPath, "utf-8")
    .split("\n")
    .map((line) => {
      const isStart = line.includes(START_TAG);
      const isEnd = line.includes(END_TAG);

      if (isStart) {
        const shouldRemove = shouldRemoveCode(line);
        removalStack.push(shouldRemove);
        if (shouldRemove) {
          modified = true;
          removedCount++;
        }
      }

      if (removalStack.length > 0 && removalStack[removalStack.length - 1]) {
        if (isEnd) removalStack.pop();
        return null;
      }

      if (isEnd && removalStack.length > 0) {
        removalStack.pop();
      }

      if (setDate && line.includes(`${START_TAG}(${UNSET_TAG},`)) {
        modified = true;
        updatedCount++;
        return setAutocleanupDate(line);
      }

      return line;
    });

  if (removalStack.length > 0) {
    throw new Error(
      `Найден открытый тег в файле: ${filePath} (file://${absPath})`,
    );
  }

  lines = lines.filter((line) => line !== null);

  if (modified) fs.writeFileSync(absPath, lines.join("\n"), "utf-8");
  return { removed: removedCount, updated: updatedCount };
};

const scanAndClean = (dir, setDate) => {
  let removedTotal = 0,
    updatedTotal = 0;

  fs.readdirSync(dir, { withFileTypes: true }).forEach((file) => {
    const fullPath = path.join(dir, file.name);
    if (file.isDirectory()) {
      const { removed, updated } = scanAndClean(fullPath, setDate);
      removedTotal += removed;
      updatedTotal += updated;
    } else if (file.name.endsWith(".ts") || file.name.endsWith(".tsx")) {
      const { removed, updated } = processFile(fullPath, setDate);
      removedTotal += removed;
      updatedTotal += updated;
    }
  });

  return { removed: removedTotal, updated: updatedTotal };
};

const main = () => {
  console.log(`START ${NAME.toUpperCase()}`);
  const startTime = Date.now();

  try {
    const { removed, updated } = scanAndClean("./src", setDate);

    console.log(`DONE IN ${Date.now() - startTime}ms`);

    const amountString = `${NAME.toUpperCase()}: ${removed} удалено, ${updated} обновлено`;
    const isChanged = removed > 0 || updated > 0;
    if (logAmount) console.log(amountString);

    if (isChanged && updateRepo) {
      execSync("git add .");
      execSync(`git commit -m "${amountString}`);
      execSync("git push");
    }
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

main();
